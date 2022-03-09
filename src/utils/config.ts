import * as dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILE = process.env.PRODUCTS_FILE || "products.csv";
const COUPONS_FILE = process.env.COUPONS_FILE || "coupons.csv";
const ACCOUNTS_FILE = process.env.COUPONS_FILE || "accounts.csv";
const MIN_PRODUCTS_TO_ADD = +process.env.PAUSE_BETWEEN_TRIES || 2;
const MAX_PRODUCTS_TO_ADD = +process.env.PAUSE_BETWEEN_TRIES || 3;
const CHUNK_OF_PRODUCTS_TO_ADD = +process.env.CHUNK_OF_PRODUCTS_TO_ADD || 3;
const PAUSE_BETWEEN_PRODUCTS = +process.env.PAUSE_BETWEEN_TRIES || 2;
const PAUSE_BETWEEN_ACCOUNTS = +process.env.PAUSE_BETWEEN_TRIES || 5;
const PAUSE_BETWEEN_TRIES = +process.env.PAUSE_BETWEEN_TRIES || 2;
const NODE_ENV = process.env.NODE_ENV || "dev";

export default {
    PRODUCTS_FILE,
    COUPONS_FILE,
    PAUSE_BETWEEN_TRIES,
    NODE_ENV,
    ACCOUNTS_FILE,
    MIN_PRODUCTS_TO_ADD,
    MAX_PRODUCTS_TO_ADD,
    CHUNK_OF_PRODUCTS_TO_ADD,
    PAUSE_BETWEEN_PRODUCTS,
    PAUSE_BETWEEN_ACCOUNTS,
};
