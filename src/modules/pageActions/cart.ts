// async function addToCart(page, product) {
//     try {
//       await page.goto(product);
//       console.log("Opened Product Page!");

//       await page.waitForFunction(
//         '!isNaN(document.querySelector("span.header-cart__icon").innerText)'
//       );

//       // Get cart item quantity
//       const cartElement = await page.$("span.header-cart__icon");
//       let beforeAdding =
//         (await page.evaluate((element) => element.innerText, cartElement)) - 0;

//       // Press add to cart buttton
//       await page.evaluate(() => {
//         return document
//           .evaluate(
//             '//button[contains(text(), "Add to Cart")]',
//             document,
//             null,
//             XPathResult.FIRST_ORDERED_NODE_TYPE,
//             null
//           )
//           .singleNodeValue.click();
//       });

//       // wait till adding to cart
//       await page.waitForXPath("/html/body/main/div[1]/div[2]/div[2]/div[1]/h2");

//       let afterAdding =
//         (await page.evaluate((element) => element.innerText, cartElement)) - 0;

//       if (afterAdding - beforeAdding > 0) {
//         console.log("Added to Cart!");
//         return "Added To Cart!";
//       }

//       console.log("Something Went Wrong");
//       return "Something Went Wrong";
//     } catch (error) {
//       console.log("error");
//       return error;
//     }
//   }
