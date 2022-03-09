import browserControl from "../modules/browserControl";
import proxyChain from "proxy-chain";

const startApp = async function () {
    // const oldProxyUrl =
    //     "http://groups-BUYPROXIES94952,country-US:apify_proxy_56liKoBbW79eG4hwz6xaHjWQtdoX3X4r0Y3T@proxy.apify.com:8000";
    const oldProxyUrl =
        "http://groups-RESIDENTIAL,country-US:apify_proxy_56liKoBbW79eG4hwz6xaHjWQtdoX3X4r0Y3T@proxy.apify.com:8000";
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    // Prints something like "http://127.0.0.1:45678"
    console.log(newProxyUrl);
    const browser = await browserControl.launchBrowser({
        args: [`--proxy-server=${newProxyUrl}`],
    });
    const page = await browser.newPage();

    await page.goto("http://proxy.apify.com/");

    await page.waitForTimeout(1000000);

    await browser.close();
};

startApp();
