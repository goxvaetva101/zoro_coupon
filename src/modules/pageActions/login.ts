import inquirer from "inquirer";
import { Page } from "puppeteer";
import { logger } from "../../utils/logger";

export async function login(page: Page, email: string, password: string) {
    await page.goto("https://www.zoro.com/");

    logger.info("Opened zoro homepage!");

    //check if sign in button is visible
    await page.waitForXPath(
        '//*[@id="app"]/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/button[1]'
    );

    await page.evaluate(() => {
        const signInButton = document.evaluate(
            '//*[@id="app"]/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/button[1]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        signInButton.click();
    });

    await page.waitForXPath("/html/body/main/div[1]/div[2]/div/div/div/div");

    logger.info("Opened sign in modal!");

    await page.evaluate(
        (email, password) => {
            //set email
            (
                document.querySelector(
                    'input[type="email"]'
                ) as HTMLInputElement
            ).value = email;

            //set pass
            (
                document.querySelector(
                    'input[type="password"]'
                ) as HTMLInputElement
            ).value = password;
        },
        email,
        password
    );

    logger.info("Entered Email and Password!");

    //sign in
    await page.evaluate(() => {
        const signInButton = document.evaluate(
            '//*[@id="app"]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/form/button',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        signInButton.click();
    });

    await page.waitForTimeout(1000 * 5);

    try {
        await page.waitForXPath(
            "/html/body/main/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/div/div"
        );
    } catch (error) {
        try {
            const answer = await inquirer.prompt([
                {
                    type: "confirm",
                    message: "continue after fixing login issue",
                    pageSize: 20,
                    name: "loginIssue",
                },
            ]);
            await page.waitForXPath(
                "/html/body/main/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/div/div"
            );
        } catch (error) {
            logger.error("Couldn't login: " + error);
            return;
        }
    }

    logger.info("Logged in to Account!");
}
