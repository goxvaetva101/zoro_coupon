import { logger } from "./utils/logger";

export default async function () {
    while (true) {
        try {
            //Show Menu
        } catch (error) {
            logger.error("Something Happened While Running the App: " + error);
        }
    }
}
