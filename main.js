const puppeteer = require("puppeteer");
require("dotenv").config();
const csv = require("@fast-csv/parse");
const fastcsv = require("fast-csv");
const fs = require("fs");

const readline = require("readline");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

async function start(coupons, products) {
  // TODO: Set screen size corrrectly
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    verify: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  // await page.setDefaultNavigationTimeout(0);

  await page.waitForTimeout(1000 * 2);

  for (product of products) {
    try {
      const cartReport = await addToCart(page, product);
      // var currentdate = new Date();
      // var datetime =
      //     currentdate.getFullYear() +
      //     "/" +
      //     (currentdate.getMonth() + 1) +
      //     "/" +
      //     currentdate.getDate();
      await page.waitForTimeout(1000 * 5);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("All Added to Cart!");

  const returnArray = await tryCoupons(page, coupons);

  // returnArray.push([email, password, product, cartReport, datetime]); // Add to Cart

  await page.waitForTimeout(1000 * 5);
  await browser.close(); //close browser

  return returnArray;
}

async function addToCart(page, product) {
  try {
    await page.goto(product);
    console.log("Opened Product Page!");

    await page.waitForFunction(
      '!isNaN(document.querySelector("span.header-cart__icon").innerText)'
    );

    // Get cart item quantity
    const cartElement = await page.$("span.header-cart__icon");
    let beforeAdding =
      (await page.evaluate((element) => element.innerText, cartElement)) - 0;

    // Press add to cart buttton
    await page.evaluate(() => {
      return document
        .evaluate(
          '//button[contains(text(), "Add to Cart")]',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        )
        .singleNodeValue.click();
    });

    // wait till adding to cart
    await page.waitForXPath("/html/body/main/div[1]/div[2]/div[2]/div[1]/h2");

    let afterAdding =
      (await page.evaluate((element) => element.innerText, cartElement)) - 0;

    if (afterAdding - beforeAdding > 0) {
      console.log("Added to Cart!");
      return "Added To Cart!";
    }

    console.log("Something Went Wrong");
    return "Something Went Wrong";
  } catch (error) {
    console.log("error");
    return error;
  }
}

async function tryCoupons(page, coupons) {
  const returnArray = [];

  await page.goto("https://www.zoro.com/checkout?guestCheckout=true");
  console.log("Opened Checkout Page!");

  for (let i = 0; i < coupons.length; i++) {
    try {
      await addCoupon(page, coupons[i].coupon);
      // CHECK if coupon is working
      const cartElement = await page.$(".current-promo");
      let currentPromo = await page.evaluate(
        (element) => element.innerText,
        cartElement
      );
      returnArray.push([coupons[i].coupon, currentPromo.trim()]);
    } catch (error) {
      try {
        const cart = await page.$(".current-promo");
        let cartError = await page.evaluate(
          (element) => element.innerText,
          cart
        );
        returnArray.push([coupons[i].coupon, cartError.toString().trim()]);
      } catch (error) {
        returnArray.push([coupons[i].coupon, "Error"]);
      }
    }
  }

  return returnArray;
}

async function addCoupon(page, coupon) {
  await removeCoupon(page);
  let couponInput = await page.waitForSelector(
    ".promo-input-container .form-control"
  );
  await couponInput.click({ clickCount: 3 })
  await couponInput.type(coupon);

  // press apply button
  await page.evaluate(() => {
    return document
      .evaluate(
        "/html/body/main/main/div/div/div[4]/div/div/form/div/div/span/div/button",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      )
      .singleNodeValue.click();
  });

  await page.waitForTimeout(1000 * 5);
}

async function removeCoupon(page) {
  try {
    // await page.waitForFunction(
    //   'document.querySelector(".promo-remove-btn").click()'
    // );
    await page.evaluate(() => {
        return document
          .evaluate(
            "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue.click();
      });
      await page.waitForTimeout(1000 * 5);
      await page.evaluate(() => {
        return document
          .evaluate(
            "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue.click();
      });
    console.log("removed coupon");
  } catch (error) {
      console.log(error);
  }
}

// Read Csv
async function readCsv(path, options) {
  return new Promise((resolve, reject) => {
    const data = [];

    csv
      .parseFile(path, options)
      .on("error", reject)
      .on("data", (row) => data.push(row))
      .on("end", () => {
        resolve(data);
      });
  });
}

(async () => {
  const coupons = await readCsv(process.env.COUPONS_FILE, {
    headers: true,
  });
  const products = await readCsv(process.env.PRODUCTS_FILE, {
    headers: true,
  });

  const productsArray = [];

  for (let i = 0; i < products.length; i++) {
    productsArray.push(products[i].url);
  }

  const returnData = await start(coupons, productsArray);

  var currentdate = new Date();
  var datetime =
    "Result_" +
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " @ " +
    currentdate.getHours() +
    "_" +
    currentdate.getMinutes() +
    "_" +
    currentdate.getSeconds();

  const ws = fs.createWriteStream(datetime + ".csv");
  console.log(returnData);
  fastcsv
    .write(returnData, {
      headers: true,
    })
    .pipe(ws);
})();
