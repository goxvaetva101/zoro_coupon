import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import mainMenu from "./modules/userInteractions/mainMenu";
import { logger } from "./utils/logger";

export default async function () {
    inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

    try {
        mainMenu();
    } catch (error) {
        logger.error("Something Happened While Running the App: " + error);
    }
}
