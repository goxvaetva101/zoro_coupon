import mainMenu from "./modules/userInteractions/mainMenu";
import { logger } from "./utils/logger";

export default async function () {
    // while (true) {
    try {
        mainMenu();
    } catch (error) {
        logger.error("Something Happened While Running the App: " + error);
    }
    // }
}
