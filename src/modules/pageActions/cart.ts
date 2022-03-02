import { Page } from "puppeteer";
import { logger } from "../../utils/logger";

export async function addToCart(page: Page, url: string) {
    await page.goto(url);
    logger.info("Opened Product Page!");

    await page.waitForFunction(
        '!isNaN(document.querySelector("span.header-cart__count").innerText)'
    );

    const beforeAdding = await page.evaluate(() => {
        const cartElement = document.querySelector("span.header-cart__count");
        const beforeAdding = cartElement.textContent;

        const $addToCartButton = document.querySelector(
            ".add-to-cart__button"
        ) as HTMLInputElement;

        $addToCartButton.click();
        return +beforeAdding;
    });

    logger.info("Before Adding to Cart, Items in Cart: " + beforeAdding);

    // // Get cart item quantity
    // const cartElement = await page.$("span.header-cart__icon");
    // let beforeAdding =
    //     (await page.evaluate((element) => element.innerText, cartElement)) - 0;

    // // Press add to cart buttton
    // await page.evaluate(() => {
    //     return document
    //         .evaluate(
    //             '//button[contains(text(), "Add to Cart")]',
    //             document,
    //             null,
    //             XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null
    //         )
    //         .singleNodeValue.click();
    // });

    // wait till adding to cart
    await page.waitForXPath("/html/body/main/div[1]/div[2]/div[2]/div[1]/h2");

    const afterAdding = await page.evaluate(() => {
        const cartElement = document.querySelector("span.header-cart__count");
        const afterAdding = cartElement.textContent;
        return +afterAdding;
    });

    logger.info("After Adding to Cart, Items in Cart: " + afterAdding);

    // let afterAdding =
    // (await page.evaluate((element) => element.innerText, cartElement)) - 0;

    if (afterAdding - +beforeAdding > 0) {
        logger.info("Added To Cart");
        return;
    }

    logger.error("Adding to cart failed!");
    throw Error("Adding to cart failed!");
}
