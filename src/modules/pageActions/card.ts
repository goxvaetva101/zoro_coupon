import inquirer from "inquirer";
import { Page } from "puppeteer";
import { logger } from "../../utils/logger";

export async function addCard(page: Page, cardNumber:string, expMonth:string, expYear:string, nameOnCard:string) {
    await page.goto("https://www.zoro.com/my-account/payment-methods");

    logger.info("Opened payments method page!");

    //check if sign in button is visible
    await page.waitForXPath(
        '/html/body/main/div[4]/div/div/div/div[3]/div[1]/div[1]/button'
    );

    await page.waitForTimeout(1000 * 10);


    await page.evaluate(() => {
        const addCreditCardButton = document.evaluate(
            '//*[@id="v-app"]/div/div/div[3]/div[1]/div[1]/button',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        addCreditCardButton.click();
    });

    await page.waitForTimeout(1000 * 5);



    await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div");

    logger.info("Opened credit card modal!");


    await page.focus('.v-text-field__slot input')
    await page.keyboard.type(cardNumber)

    const month = await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[2]/div/div/div[1]/div[1]/div[1]/input");
    await month.focus()
    await page.keyboard.type(expMonth)

    
    const year = await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[3]/div/div/div[1]/div[1]/div[1]/input");
    await year.focus()
    await page.keyboard.type(expYear)


    const name = await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[4]/div/div/div[1]/div/input")
    await name.focus()
    await page.keyboard.type(nameOnCard)


     
    const checkBox = await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[5]/div/div/div[1]/div/input");
    await checkBox.click()


    

    logger.info("Entered Data!");


    await page.waitForTimeout(1000 * 5);


    //save
    await page.evaluate(() => {
        const saveButton = document.evaluate(
            '/html/body/main/div[4]/div/div[3]/div/form/div[4]/button[1]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        saveButton.click();
    });

    await page.waitForTimeout(1000 * 10);


    logger.info("Added Card!");
}
