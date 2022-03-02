import browserControl from "../modules/browserControl";
import { addToCart } from "../modules/pageActions/cart";

const startApp = async function () {
    const browser = await browserControl.launchBrowser();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await addToCart(page, "https://www.zoro.com/i/G1853293/");
    await browser.close();
};

startApp();
