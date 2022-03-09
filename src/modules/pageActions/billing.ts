import inquirer from "inquirer";
import { Page } from "puppeteer";
import { BillingPayload } from "../../utils/interfaces";
import { logger } from "../../utils/logger";

export async function addBilling(
    page: Page,
    payload: BillingPayload,
    fileName
) {
    await page.goto("https://www.zoro.com/my-account/address-book");

    logger.info("Opened billings page!");

    // check if add billing button is visible
    await page.waitForXPath(
        "/html/body/main/div[4]/div/div/div/section/div[1]/button"
    );

    // wait a few seconds
    await page.waitForTimeout(1000 * 10);

    // open billing modal
    await page.evaluate(() => {
        const addCreditCardButton = document.evaluate(
            "/html/body/main/div[4]/div/div/div/section/div[1]/button",
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

    // type full name
    const name = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[1]/div/div/div[1]/div/input"
    );
    await name.focus();
    await page.keyboard.type(payload.name);

    // type company
    const company = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[2]/div/div/div[1]/div/input"
    );
    await company.focus();
    await page.keyboard.type(payload.company);

    // type address
    const address = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[3]/div/div/div/div[1]/div/input"
    );
    await address.focus();
    await page.keyboard.type(payload.address);

    // type address2
    const address2 = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[4]/div/div/div[1]/div/input"
    );
    await address2.focus();
    await page.keyboard.type(payload.address2);

    // type city
    const city = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[5]/div/div/div[1]/div/input"
    );
    await city.focus();
    await page.keyboard.type(payload.city);

    // type state
    const state = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[6]/div/div[1]/div/div[2]/div/div[1]/div[1]/div[1]/input"
    );
    await state.focus();
    await page.keyboard.type(payload.state);

    // type zipcode
    const zip = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[6]/div/div[2]/div/div/div[1]/div/input"
    );
    await zip.focus();
    await page.keyboard.type(payload.zip);

    // type phone
    const phone = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[1]/div[7]/div/div/div[1]/div/input"
    );
    await phone.focus();
    await page.keyboard.type(payload.phone);

    // check make default box
    const checkBox = await page.waitForXPath(
        "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[2]/div/div/div/input"
    );
    await checkBox.click();

    logger.info("Entered billing details!");

    await page.waitForTimeout(1000 * 10);

    // click save button
    await page.evaluate(() => {
        const saveButton = document.evaluate(
            "/html/body/main/div[4]/div/div[3]/div/div[2]/form/div[4]/button[2]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;

        saveButton.click();
    });

    await page.waitForTimeout(1000 * 10);

    logger.info("Added Billing!");

    return true;
}
