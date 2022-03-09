import inquirer from "inquirer";
import { Page } from "puppeteer";
import { LoginPayload } from "../../utils/interfaces";
import { logger } from "../../utils/logger";

export async function login(page: Page, payload: LoginPayload) {
    // open zoro homepage
    await page.goto("https://www.zoro.com/");
    logger.info("Opened zoro homepage!");

    // check if sign in button is visible
    await page.waitForXPath(
        '//*[@id="app"]/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/button[1]'
    );

    // click sign in modal button
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

    // wait for sign in modal to be visible
    await page.waitForXPath("/html/body/main/div[1]/div[2]/div/div/div/div");
    logger.info("Opened sign in modal!");

    // type email
    await page.focus('input[type="email"]');
    await page.keyboard.type(payload.email);

    //type password
    await page.focus('input[type="password"]');
    await page.keyboard.type(payload.password);

    logger.info("Entered Email and Password!");

    // click sign in button
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

    logger.info("Logging in!");

    //wait a few seconds
    await page.waitForTimeout(1000 * 5);

    try {
        //check if logged in
        await page.waitForXPath(
            "/html/body/main/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/div/div"
        );
    } catch (error) {
        //if error then wait till user fixes issue and the continue
        try {
            await inquirer.prompt([
                {
                    type: "confirm",
                    message:
                        "continue after fixing login issue (both y/n will continue)",
                    name: "loginIssue",
                    default: false,
                },
            ]);
            await page.waitForXPath(
                "/html/body/main/div[2]/div/div/div/header/div[3]/div/div/div/div[1]/div/div"
            );
        } catch (error) {
            logger.error("Couldn't login: " + error);
            throw error;
        }
    }
}
