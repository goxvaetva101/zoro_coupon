import { Page } from "puppeteer";
import { writeCsv } from "../../utils/csv";
import { CardPayload } from "../../utils/interfaces";
import { logger } from "../../utils/logger";

export async function addCard(page: Page, payload: CardPayload, fileName) {
    // open payment methods page
    await page.goto("https://www.zoro.com/my-account/payment-methods");
    logger.info("Opened payments method page!");

    // wait a few seconds
    await page.waitForTimeout(1000 * 10);

    // check if add card button is visible
    await page.waitForXPath(
        "/html/body/main/div[4]/div/div/div/div[3]/div[1]/div[1]/button"
    );

    // open card modal
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

    // wait a few seconds
    await page.waitForTimeout(1000 * 5);

    // check if modal is opened
    await page.waitForXPath("/html/body/main/div[4]/div/div[3]/div");

    logger.info("Opened credit card modal!");

    // type card number
    await page.focus(".v-text-field__slot input");
    await page.keyboard.type(payload.cardNumber);

    // type card month
    const month = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[2]/div/div/div[1]/div[1]/div[1]/input"
    );
    await month.focus();
    await page.keyboard.type(payload.expMonth);

    // type card year
    const year = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[3]/div/div/div[1]/div[1]/div[1]/input"
    );
    await year.focus();
    await page.keyboard.type(payload.expYear);

    // type card name
    const name = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[4]/div/div/div[1]/div/input"
    );
    await name.focus();
    await page.keyboard.type(payload.nameOnCard);

    // check make default box
    const checkBox = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/form/div[3]/div[5]/div/div/div[1]/div/input"
    );
    await checkBox.click();

    logger.info("Entered card details!");

    // wait a few seconds
    await page.waitForTimeout(1000 * 5);

    // click save button
    await page.evaluate(() => {
        const saveButton = document.evaluate(
            "/html/body/main/div[4]/div/div[3]/div/form/div[4]/button[1]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        saveButton.click();
    });

    await page.waitForTimeout(1000 * 10);

    logger.info("Added Card!");
    return true;
}
