import { info } from "console";
import inquirer from "inquirer";
import { readCsv, writeCsv } from "../../utils/csv";
import { logger } from "../../utils/logger";
import browserControl from "../browserControl";
import { addBilling } from "../pageActions/billing";
import { addCard } from "../pageActions/card";
import { login } from "../pageActions/login";

async function mainMenu() {
    const answers: number[] = await inquirer.prompt([
        {
            type: "checkbox",
            message: "Welcome to zoro tools, what do you want to do?",
            pageSize: 20,
            name: "mainMenu",
            choices: choices,
            validate,
        },
    ]);

    await handleAnswers(answers);
}

const choices = [
    new inquirer.Separator(" = Main Menu = "),
    {
        name: "Login",
        value: 1,
    },
    {
        name: "Add To Cart",
        value: 2,
    },
    {
        name: "Check Coupons",
        value: 3,
    },
    new inquirer.Separator(" = Credit Cards = "),
    {
        name: "Add Card",
        disabled: "Under Development",
        value: 4,
    },
    {
        name: "Remove Card",
        disabled: "Under Development",
        value: 5,
    },
    new inquirer.Separator(" = Billing Address ="),
    {
        name: "Add Address",
        disabled: "Under Development",
        value: 6,
    },
    {
        name: "Remove Address",
        disabled: "Under Development",
        value: 7,
    },
    new inquirer.Separator(" = Others = "),
    {
        name: "Change Password",
        disabled: "Under Development",
        value: 8,
    },
    new inquirer.Separator(" = Extra = "),
    {
        name: "Add card and billing(temporary)",
        value: 9,
    },
    {
        name: "Exit",
        value: 10,
    },
];

function validate(answers: any): boolean | string {
    //TODO: Write better validation
    if (answers.length < 1) {
        return "You must choose at least one tool.";
    }

    return true;
}

async function handleAnswers(answers: number[]) {
    // logger.info(
    //     "Starting tools: " + console.log(JSON.stringify(answers, null, "  "))
    // );
        const a = await readCsv("accounts.csv");
        
        for(let i in a){
            const browser = await browserControl.launchBrowser();

            try{
            let current = a[i];
            logger.info(i+"/"+a.length+" : Starting now")
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await login(page, current.email, current.password);
            await addCard(page,current.cardNo,current.month,current.year,current.name)
            await addBilling(page,
                {
                    name: current.nameBilling,
                    company:current.company,
                    address:current.address,
                    address2:current.address2,
                    city:current.city,
                    state:current.state,
                    zip:current.zip,
                    phone:current.phone
                })

            await writeCsv("out.csv",[{
                email:current.email
            }])
            
            }catch(error){
                logger.error(error);
            }
            await browser.close();


        }
        // const browser = await browserControl.launchBrowser();
        // const page = await browser.newPage();
        // await page.setDefaultNavigationTimeout(0);
        // await login(page, "Upx.gp0012@gmail.com", "!q6]U>Qct{e@Zr7byn8+");
        // await addCard(page,"4733445784282926","12","2026","GoToKnow")
        // await browser.close();
        //Run Add To Cart
}

export default mainMenu;
