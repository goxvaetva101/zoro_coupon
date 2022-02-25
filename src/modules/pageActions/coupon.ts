// async function tryCoupons(page, coupons, fileName, products) {
//     const returnArray = [];

//     await page.goto("https://www.zoro.com/checkout?guestCheckout=true");
//     console.log("Opened Checkout Page!");

//     for (let i = 0; i < coupons.length; i++) {
//       var errorText = "";
//       var coupon = coupons[i].coupon;

//       try {
//         await page.waitForTimeout(1000 * 10);
//         await addCoupon(page, coupon);
//         // CHECK if coupon is working
//         const cartElement = await page.$(".current-promo");
//         let currentPromo = await page.evaluate(
//           (element) => element.innerText,
//           cartElement
//         );
//         //get which products are working
//         // returnArray.push([coupons[i].coupon, currentPromo.trim()]);
//       } catch (error) {
//         try {
//           await page.waitForTimeout(1000 * 2);
//           const cart = await page.$(".js-error-message span");
//           await page.waitForTimeout(1000 * 2);
//           let cartError = await page.evaluate(
//             (element) => element.innerText,
//             cart
//           );
//           errorText = cartError;
//           // returnArray.push([coupons[i].coupon, cartError.toString().trim()]);
//         } catch (error) {
//           errorText = "Unknown Error";
//           // returnArray.push([coupons[i].coupon, "Unknown Error"]);
//         }
//       }
//       const orderSummary = await getOrderSummaryInfo(page);
//       var toWrite= []

//       for (let element of orderSummary) {
//         element.push(coupon, errorText)
//         toWrite.push(element);
//       }
//       // var toWrite = orderSummary.map(i=> i.push(coupon, error));
//       await appendCsv(fileName,toWrite);
//     }

//     return returnArray;
//   }

// // Add coupon on open page
// async function addCoupon(page, coupon) {
//     await removeCoupon(page);
//     await page.waitForTimeout(1000 * 2);
//     let couponInput = await page.waitForSelector(
//       ".promo-input-container .form-control"
//     );
//     await couponInput.click({ clickCount: 3 });
//     await couponInput.type(coupon);

//     await page.waitForTimeout(1000 * 2);

//     // press apply button
//     await page.evaluate(() => {
//       return document
//         .evaluate(
//           "/html/body/main/main/div/div/div[4]/div/div/form/div/div/span/div/button",
//           document,
//           null,
//           XPathResult.FIRST_ORDERED_NODE_TYPE,
//           null
//         )
//         .singleNodeValue.click();
//     });

//     await page.waitForTimeout(1000 * 5);
//   }

//   // Remove coupon from open page
//   async function removeCoupon(page) {
//     try {
//       // await page.waitForFunction(
//       //   'document.querySelector(".promo-remove-btn").click()'
//       // );
//       await page.evaluate(() => {
//         return document
//           .evaluate(
//             "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
//             document,
//             null,
//             XPathResult.FIRST_ORDERED_NODE_TYPE,
//             null
//           )
//           .singleNodeValue.click();
//       });
//       await page.waitForTimeout(1000 * 5);
//       await page.evaluate(() => {
//         return document
//           .evaluate(
//             "/html/body/main/main/div/div/div[3]/div/section/div/div[3]/div[2]/div[2]/div/button",
//             document,
//             null,
//             XPathResult.FIRST_ORDERED_NODE_TYPE,
//             null
//           )
//           .singleNodeValue.click();
//       });
//       console.log("removed coupon");
//     } catch (error) {
//       console.log(error);
//     }
//   }
