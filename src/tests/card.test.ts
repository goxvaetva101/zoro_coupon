import browserControl from "../modules/browserControl";
import { addCard } from "../modules/pageActions/card";
import { login } from "../modules/pageActions/login";

const startApp = async function () {
    const browser = await browserControl.launchBrowser();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await login(page, {
        email: "Upx.gp0012@gmail.com",
        password: "!q6]U>Qct{e@Zr7byn8+",
    });
    await addCard(page, {
        cardNumber: "4733445784282926",
        expMonth: "12",
        expYear: "2026",
        nameOnCard: "GoToKnow",
    });
    await browser.close();
};

startApp();
