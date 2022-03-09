import inquirer from "inquirer";
import { logger } from "../../utils/logger";
import { TASKS, TASK_GROUPS } from "./constants";

import path from "path";
import fs from "fs";
import { readCsv, writeCsv } from "../../utils/csv";
import browserControl from "../browserControl";
import { addBilling } from "../pageActions/billing";
import { addCard } from "../pageActions/card";
import { login } from "../pageActions/login";
import config from "../../utils/config";

import {
    Account,
    Coupon,
    Job,
    JobStatus,
    Product,
    Task,
} from "../../utils/interfaces";
import mainMenu from "./mainMenu";
import { uuid } from "uuidv4";
import { tryCoupons } from "../pageActions/coupon";
import { addToCart } from "../pageActions/cart";
import { PageActionFactory } from "../pageActions/factory";

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

Array.prototype.includesAny = function (arr) {
    return arr.some((i) => this.includes(i));
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

export async function handleAnswers(answers: number[]) {
    if (answers.includes(TASKS.Exit)) {
        process.exit(0);
    }

    if (answers.includes(TASKS.Settings)) {
        //TODO: Open Settings
        const settings = await inquirer.prompt({
            type: "editor",
            name: "settings",
            message: "Edit the setting variables save and close",
        });
        console.log(settings.settings);
        await mainMenu();
    }

    logger.info("Starting tools: " + answers);

    const folder = (
        await inquirer.prompt({
            type: "file-tree-selection" as any,
            name: "inputFolder",
            selectionType: "folder",
            onlyShowMatchingExtensions: true,
            message:
                "Choose folder containing the input files (accounts.csv, coupons.csv, products.csv)",
        } as any)
    ).inputFolder;

    // Get jobs to complete
    const jobs = await getJobs(folder, answers);

    var currentDate = new Date();
    var datetime =
        "Result_" +
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate() +
        " @ " +
        currentDate.getHours() +
        "_" +
        currentDate.getMinutes() +
        "_" +
        currentDate.getSeconds();

    const fileName = datetime + ".csv";

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        logger.info("Starting New Job");
        logger.info("Job: ", job);
        const browser = await browserControl.launchBrowser();

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        for (let j = 0; j < job.tasks.length; j++) {
            const task = job.tasks[j];
            try {
                logger.info("Starting New Task");
                logger.info("Task: ", task);

                var response;
                switch (task.task) {
                    case TASKS.CheckCoupons:
                        response = await tryCoupons(
                            page,
                            task.payload,
                            fileName
                        );
                        break;

                    case TASKS.Login:
                        response = await login(page, task.payload);
                        break;
                    case TASKS.AddToCart:
                        for (let k = 0; k < task.payload.urls.length; k++) {
                            try {
                                await addToCart(page, task.payload.urls[k]);
                            } catch {}
                        }
                        break;
                    // case TASKS.RemoveCard:
                    //     return removeCard;
                    case TASKS.AddCard:
                        response = await addCard(page, task.payload, fileName);
                        writeCsv(fileName, [
                            [job.tasks[0].payload.email, "Added Card"],
                        ]);
                        break;

                    case TASKS.RemoveBilling:
                    // return removeAddress;
                    case TASKS.AddBilling:
                        response = await addBilling(
                            page,
                            task.payload,
                            fileName
                        );
                        writeCsv(fileName, [
                            [job.tasks[0].payload.email, "Added Billing"],
                        ]);
                        break;

                    // case TASKS.ChangePassword:
                    //     return changePassword
                }

                logger.info("task completed");
            } catch (error) {
                logger.error("Something went wrong executing task");
            }
        }
        logger.info("Job Complete Closing Browser");
        await browser.close();
    }
}

async function getJobs(folder: string, answers: number[]) {
    //get paths
    const accountsPath = path.join(folder, "accounts.csv");
    const productsPath = path.join(folder, "products.csv");
    const couponsPath = path.join(folder, "coupons.csv");

    var accounts: Account[],
        products: Product[],
        coupons: Coupon[] = [];

    // read files
    if (fs.existsSync(accountsPath)) accounts = await readCsv(accountsPath);
    if (fs.existsSync(productsPath)) products = await readCsv(productsPath);
    if (fs.existsSync(couponsPath)) coupons = await readCsv(couponsPath);

    const jobs: Job[] = [];

    // If it requires logging in
    if (answers.includesAny(TASK_GROUPS.requiresAccount)) {
        for (let i = 0; i < accounts.length; i++) {
            const tasks: Task[] = [];
            const account = accounts[i];

            // Login
            if (answers.includes(TASKS.Login)) {
                tasks.push({
                    task: TASKS.Login,
                    payload: {
                        email: account.email,
                        password: account.password,
                    },
                });

                //CARD
                if (answers.includes(TASKS.RemoveCard)) {
                    tasks.push({
                        task: TASKS.RemoveCard,
                    });
                }

                if (answers.includes(TASKS.AddCard)) {
                    tasks.push({
                        task: TASKS.AddCard,
                        payload: {
                            cardNumber: account.cardNumber,
                            expMonth: account.expMonth,
                            expYear: account.expYear,
                            nameOnCard: account.nameOnCard,
                        },
                    });
                }

                //BILLING ADDRESS
                if (answers.includes(TASKS.RemoveBilling)) {
                    tasks.push({
                        task: TASKS.RemoveBilling,
                    });
                }

                if (answers.includes(TASKS.AddBilling)) {
                    tasks.push({
                        task: TASKS.AddBilling,
                        payload: {
                            name: account.name,
                            company: account.company,
                            address: account.address,
                            address2: account.address2,
                            city: account.city,
                            state: account.state,
                            zip: account.zip,
                            phone: account.phone,
                        },
                    });
                }

                // Add to cart
                if (answers.includes(TASKS.AddToCart)) {
                    const productsToUse = randomIntFromInterval(
                        config.MIN_PRODUCTS_TO_ADD,
                        config.MAX_PRODUCTS_TO_ADD
                    );
                    const productsArray: Product[] = [];

                    let tempProducts: Product[] = JSON.parse(
                        JSON.stringify(products)
                    );
                    for (let i = 0; i < productsToUse; i++) {
                        const product = tempProducts.random();
                        tempProducts = tempProducts.filter(
                            (e) => e !== product
                        );
                        productsArray.push(product);
                    }

                    tasks.push({
                        task: TASKS.AddToCart,
                        payload: {
                            urls: productsArray,
                        },
                    });
                }
            }

            // Change Password
            if (answers.includes(TASKS.ChangePassword)) {
                tasks.push({
                    task: TASKS.ChangePassword,
                    payload: {
                        email: account.email,
                    },
                });
            }

            jobs.push({
                jobId: uuid(),
                tasks,
                status: JobStatus.QUEUED,
            });
        }
    }

    //
    if (answers.includes(TASKS.AddToCartAndCheckCoupons)) {
        var i,
            j,
            chunk = config.CHUNK_OF_PRODUCTS_TO_ADD;

        // divide it into chunks
        for (i = 0, j = products.length; i < j; i += chunk) {
            const tasks: Task[] = [];

            //Add to cart
            tasks.push({
                task: TASKS.AddToCart,
                payload: {
                    urls: products.slice(i, i + chunk),
                },
            });

            // check coupons
            tasks.push({
                task: TASKS.CheckCoupons,
                payload: {
                    coupons: coupons,
                },
            });

            jobs.push({
                jobId: uuid(),
                tasks,
                status: JobStatus.QUEUED,
            });
        }
    }

    if (answers.includes(TASKS.LogInAndCheckCoupons)) {
        for (let i = 0; i < accounts.length; i++) {
            const tasks: Task[] = [];
            const account = accounts[i];

            // LOGIN
            tasks.push({
                task: TASKS.Login,
                payload: {
                    email: account.email,
                    password: account.password,
                },
            });

            tasks.push({
                task: TASKS.CheckCoupons,
                payload: {
                    coupons: coupons,
                },
            });

            jobs.push({
                jobId: uuid(),
                tasks,
                status: JobStatus.QUEUED,
            });
        }
    }

    return jobs;
}
