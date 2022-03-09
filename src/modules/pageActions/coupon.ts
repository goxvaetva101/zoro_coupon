import { Page } from "puppeteer";
import { writeCsv } from "../../utils/csv";
import { logger } from "../../utils/logger";
import { getOrderSummaryInfo } from "./checkout";

export async function tryCoupons(page: Page, coupons, fileName) {
    await page.goto("https://www.zoro.com/checkout");
    console.log("Opened Checkout Page!");

    for (let i = 0; i < coupons.length; i++) {
        var errorText = "";
        var coupon = coupons[i].coupon;

        try {
            await page.waitForTimeout(1000 * 10);
            await applyCoupon(page, coupon);
            // CHECK if coupon is working
            const cartElement = await page.$(".current-promo");
            let currentPromo = await page.evaluate(
                (element) => element.innerText,
                cartElement
            );
            //get which products are working
            // returnArray.push([coupons[i].coupon, currentPromo.trim()]);
        } catch (error) {
            try {
                await page.waitForTimeout(1000 * 2);
                const cart = await page.$(".js-error-message span");
                await page.waitForTimeout(1000 * 2);
                let cartError = await page.evaluate(
                    (element) => element.innerText,
                    cart
                );
                errorText = cartError;
                // returnArray.push([coupons[i].coupon, cartError.toString().trim()]);
            } catch (error) {
                errorText = "Unknown Error";
                // returnArray.push([coupons[i].coupon, "Unknown Error"]);
            }
        }
        const orderSummary = await getOrderSummaryInfo(page);
        var toWrite = [];

        for (let element of orderSummary) {
            element.push(coupon, errorText);
            toWrite.push(element);
        }
        // var toWrite = orderSummary.map(i=> i.push(coupon, error));

        writeCsv(fileName, toWrite);
        return toWrite;
    }
}

export async function tryCoupon(page: Page, coupon: string) {
    await removeCoupon(page);
    await page.waitForTimeout(1000 * 2);
    await applyCoupon(page, coupon);
}

// Add coupon from checkout
async function applyCoupon(page: Page, coupon: string) {
    // type coupon
    let couponInput = await page.waitForSelector(
        ".promo-input-container .form-control"
    );
    await couponInput.click({ clickCount: 3 });
    await couponInput.type(coupon);

    logger.info("Entered Coupon!");

    //wait a few seconds
    await page.waitForTimeout(1000 * 2);

    // press apply button
    await page.evaluate(() => {
        return (
            document.evaluate(
                "/html/body/main/main/div/div/div[4]/div/div/form/div/div/span/div/button",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue as HTMLInputElement
        ).click();
    });

    //wait a few seconds
    await page.waitForTimeout(1000 * 5);

    logger.info("Applied Coupon!");
}

// Remove coupon from checkout
async function removeCoupon(page: Page) {
    // click on remove button
    await page.evaluate(() => {
        return (
            document.evaluate(
                "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue as HTMLInputElement
        ).click();
    });

    logger.info("Pressed remove coupon button");

    //wait a few seconds
    await page.waitForTimeout(1000 * 5);

    // click on remove button again
    await page.evaluate(() => {
        return (
            document.evaluate(
                "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue as HTMLInputElement
        ).click();
    });

    logger.info("Pressed remove coupon button again");
}
