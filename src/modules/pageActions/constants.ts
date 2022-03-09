import {
    BrowserConnectOptions,
    BrowserLaunchArgumentOptions,
    LaunchOptions,
} from "puppeteer";

export const BROWSER_OPTIONS:
    | LaunchOptions
    | BrowserLaunchArgumentOptions
    | BrowserConnectOptions = {
    ignoreHTTPSErrors: true,
    headless: false,
};
