// var i,
//     j,
//     chunk = 20;
// for (i = 0, j = productsArray.length; i < j; i += chunk) {
//     await start(coupons, productsArray.slice(i, i + chunk), fileName);
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
// })();
