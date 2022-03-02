import browserControl from "../modules/browserControl";
import { addCard } from "../modules/pageActions/card";
import { addToCart } from "../modules/pageActions/cart";
import { login } from "../modules/pageActions/login";

const startApp = async function () {
    const browser = await browserControl.launchBrowser();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await login(page, "Upx.gp0012@gmail.com", "!q6]U>Qct{e@Zr7byn8+");
    await addCard(page,"4733445784282926","12","2026","GoToKnow")
    await browser.close();
};

startApp();
