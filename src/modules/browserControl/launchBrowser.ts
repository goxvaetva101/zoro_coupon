import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {
    AllBrowserOptions,
    BROWSER_OPTIONS as DEFAULT_BROWSER_OPTIONS,
} from "./constants";

import proxyChain from "proxy-chain";

async function launchBrowser(options?: AllBrowserOptions) {
    const oldProxyUrl =
        "http://groups-BUYPROXIES94952,country-US:apify_proxy_56liKoBbW79eG4hwz6xaHjWQtdoX3X4r0Y3T@proxy.apify.com:8000";
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    const browser = await puppeteer.use(StealthPlugin()).launch({
        ...DEFAULT_BROWSER_OPTIONS,
        ...options,
        args: [`--proxy-server=${newProxyUrl}`],
    });
    return browser;
    browser.pages[0];
}

export default launchBrowser;
