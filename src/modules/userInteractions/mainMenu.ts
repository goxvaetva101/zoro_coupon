import inquirer from "inquirer";

import { TASKS, TASK_GROUPS } from "./constants";
import { handleAnswers } from "./handleMainMenuAnswers";

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: "checkbox",
            message: "Welcome to zoro tools, what do you want to do?",
            pageSize: 20,
            name: "mainMenu",
            choices: choices,
            validate,
        },
    ]);

    await handleAnswers(answers.mainMenu);
}

const choices = [
    new inquirer.Separator(" = Main Menu = "),
    {
        name: "Login",
        value: TASKS.Login,
    },
    new inquirer.Separator(" = Requires Login = "),
    {
        name: "Add To Cart",
        value: TASKS.AddToCart,
    },
    {
        name: "Add Card",
        value: TASKS.AddCard,
    },
    {
        name: "Remove Card",
        disabled: "Under Development",
        value: TASKS.RemoveCard,
    },
    {
        name: "Add Address",
        value: TASKS.AddBilling,
    },
    {
        name: "Remove Address",
        disabled: "Under Development",
        value: TASKS.RemoveBilling,
    },
    new inquirer.Separator(" = Can only be run alone = "),
    {
        name: "Add to Cart and Check Coupons",
        value: TASKS.AddToCartAndCheckCoupons,
    },
    {
        name: "Login and Check Coupons",
        value: TASKS.LogInAndCheckCoupons,
    },
    {
        name: "Change Password",
        disabled: "Under Development",
        value: TASKS.ChangePassword,
    },
    new inquirer.Separator(" = Extra = "),
    {
        name: "Settings",
        value: TASKS.Settings,
    },
    {
        name: "Exit",
        value: TASKS.Exit,
    },
];

declare global {
    interface Array<T> {
        random(): T;
        includesAny(arr: any[]): boolean;
    }
}

function validate(answers: number[]): boolean | string {
    if (answers.length < 1) {
        return "You must choose at least one tool.";
    }

    if (
        answers.includesAny(TASK_GROUPS.requiresLogin) &&
        !answers.includes(TASKS.Login)
    ) {
        return "Some tasks chosen require login to also be selected!";
    }

    const a = answers.includesAny(TASK_GROUPS.runsAlone);
    if (answers.includesAny(TASK_GROUPS.runsAlone) && answers.length > 1) {
        return "Some tasks chosen can only be run alone!";
    }

    if (answers) return true;
}

export default mainMenu;
