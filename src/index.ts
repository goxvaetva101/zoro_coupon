import app from "./app";
import { logger } from "./utils/logger";

const startApp = async function () {
    try {
        await Promise.all([app]);
        logger.info(`App has started`);
    } catch (error) {
        logger.info(`Could not start app: `, error);
    }
};

startApp();
