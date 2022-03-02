import browserControl from "../modules/browserControl";
import { addBilling } from "../modules/pageActions/billing";
import { addCard } from "../modules/pageActions/card";
import { addToCart } from "../modules/pageActions/cart";
import { login } from "../modules/pageActions/login";

const startApp = async function () {
    const browser = await browserControl.launchBrowser();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await login(page, "Upx.gp0012@gmail.com", "!q6]U>Qct{e@Zr7byn8+");
    await addBilling(page,
        {
            name:"Gotoknow Store",
            company:"",
            address:"5300 MEMORIAL DR",
            address2:"STE - 224-B",
            city:"STONE MOUNTAIN",
            state:"GA",
            zip:"30083",
            phone:"2020121232"
        })
    await browser.close();
};

startApp();
