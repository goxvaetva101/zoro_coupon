import puppeteer from "puppeteer";

// async function start(coupons, products, fileName) {
//     // TODO: Set screen size corrrectly
//     const browser = await puppeteer.launch({
//         ignoreHTTPSErrors: true,
//         headless: false,
//         verify: false,
//     });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1366, height: 768 });
//     await page.setDefaultNavigationTimeout(0);

//     await page.waitForTimeout(1000 * 2);

//     for (product of products) {
//         try {
//             const cartReport = await addToCart(page, product);
//             await page.waitForTimeout(1000 * 5);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     console.log("All Added to Cart!");

//     //try each coupons
//     await tryCoupons(page, coupons, fileName, products);

//     // returnArray.push([email, password, product, cartReport, datetime]); // Add to Cart

//     await page.waitForTimeout(1000 * 5);
//     await browser.close(); //close browser

//     // return returnArray;
// }

// (async () => {
//     const coupons = await readCsv(process.env.COUPONS_FILE, {
//         headers: true,
//     });
//     const products = await readCsv(process.env.PRODUCTS_FILE, {
//         headers: true,
//     });

//     const productsArray = products.map((i) => i.url);

//     var currentdate = new Date();
//     var datetime =
//         "Result_" +
//         currentdate.getFullYear() +
//         "-" +
//         (currentdate.getMonth() + 1) +
//         "-" +
//         currentdate.getDate() +
//         " @ " +
//         currentdate.getHours() +
//         "_" +
//         currentdate.getMinutes() +
//         "_" +
//         currentdate.getSeconds();

//     const fileName = datetime + ".csv";

//     // const ws = fs.createWriteStream(fileName);

//     var i,
//         j,
//         chunk = 20;
//     for (i = 0, j = productsArray.length; i < j; i += chunk) {
//         await start(coupons, productsArray.slice(i, i + chunk), fileName);
//     }

//     // console.log(returnData);
//     // fastcsv
//     //   .write(returnData, {
//     //     headers: true,
//     //   })
//     //   .pipe(ws);
// })();

export default async function () {}
