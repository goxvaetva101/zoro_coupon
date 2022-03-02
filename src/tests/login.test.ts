import browserControl from "../modules/browserControl";
import { addToCart } from "../modules/pageActions/cart";
import { login } from "../modules/pageActions/login";

const startApp = async function () {
    const browser = await browserControl.launchBrowser();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await login(page, "Upxgp0011@gmail.com", "2@2@MerchantPassf");
    await browser.close();
};

startApp();
