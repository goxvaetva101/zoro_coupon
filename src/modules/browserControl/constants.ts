import {
    BrowserConnectOptions,
    BrowserLaunchArgumentOptions,
    LaunchOptions,
} from "puppeteer";

export const BROWSER_OPTIONS: AllBrowserOptions = {
    ignoreHTTPSErrors: true,
    headless: false,
};

export type AllBrowserOptions =
    | LaunchOptions
    | BrowserLaunchArgumentOptions
    | BrowserConnectOptions;
