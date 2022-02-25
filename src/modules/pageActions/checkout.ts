// async function getOrderSummaryInfo(page) {
//     const orderSummary = await page.$(".order-summary");

//     const orderSummaryElements = await orderSummary.$$(".order-summary__cli");

//     const elements = [];

//     for (let element of orderSummaryElements) {
//       var a = await extractOrderDetail(page, element);
//       // var arr = Object.keys(a).map(function (key) {
//       //   return a[key];
//       // });
//       elements.push(a);
//     }

//     return elements;
//   }

//   async function extractOrderDetail(page, element) {
//     const titleElement = await element.$(".cli__title");
//     const title = await page.evaluate((el) => el.textContent, titleElement);

//     const pictureElement = await element.$(".cli__image img");
//     const picture = await page.evaluate((el) => el.src, pictureElement);

//     let orginalPrice, discount;

//     try {
//       const orginalPriceElement = await element.$(".price--strike-through");
//       orginalPrice = await page.evaluate(
//         (el) => el.textContent,
//         orginalPriceElement
//       );
//       orginalPrice = orginalPrice.trim();

//       const discountElement = await element.$(".promo__price");
//       discount = await page.evaluate((el) => el.textContent, discountElement);
//       discount = discount.trim();
//     } catch (error) {
//       orginalPrice = "NA";
//       discount = "None";
//     }

//     return [
//       title,
//       picture,
//       orginalPrice,
//       discount];
//   }
