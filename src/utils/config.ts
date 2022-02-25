import * as dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILE = process.env.PRODUCTS_FILE || "products.csv";
const COUPONS_FILE = process.env.COUPONS_FILE || "coupons.csv";
const PAUSE_BETWEEN_TRIES = process.env.PAUSE_BETWEEN_TRIES || 2;
const NODE_ENV = process.env.NODE_ENV || "dev";

export default {
    PRODUCTS_FILE,
    COUPONS_FILE,
    PAUSE_BETWEEN_TRIES,
    NODE_ENV,
};
