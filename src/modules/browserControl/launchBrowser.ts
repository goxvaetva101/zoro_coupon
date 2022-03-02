import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

async function launchBrowser() {
    const browser = await puppeteer.use(StealthPlugin()).launch({
        ignoreHTTPSErrors: true,
        headless: false,
    });
    return browser;
    browser.pages[0];
}

export default launchBrowser;
