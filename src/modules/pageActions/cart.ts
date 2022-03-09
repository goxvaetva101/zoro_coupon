import { Page } from "puppeteer";
import { AddToCartPayload } from "../../utils/interfaces";
import { logger } from "../../utils/logger";

export async function addToCart(page: Page, payload: AddToCartPayload) {
    logger.info("Starting to Add To Cart");

    // go to product page
    await page.goto(payload.url);
    logger.info("Opened Product Page!");

    // wait for cart counter
    await page.waitForFunction(
        '!isNaN(document.querySelector("span.header-cart__count").innerText)'
    );

    // get cart quantiy before adding and then add to cart
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

    logger.info("Adding To Cart");

    // wait till adding to cart
    await page.waitForXPath("/html/body/main/div[1]/div[2]/div[2]/div[1]/h2");

    const afterAdding = await page.evaluate(() => {
        const cartElement = document.querySelector("span.header-cart__count");
        const afterAdding = cartElement.textContent;
        return +afterAdding;
    });

    logger.info("After Adding to Cart, Items in Cart: " + afterAdding);

    if (afterAdding - +beforeAdding > 0) {
        logger.info("Added To Cart sucessfully!");
        return;
    }

    logger.error("Adding to cart failed: Before and After Numbers Mismatch!");
    throw Error("Adding to cart failed!");
}
