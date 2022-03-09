export enum TASKS {
    CheckCoupons = 0,
    Login = 1,
    AddToCart = 2,
    RemoveCard = 3,
    AddCard = 4,
    RemoveBilling = 5,
    AddBilling = 6,
    ChangePassword = 7,
    AddToCartAndCheckCoupons = 8,
    LogInAndCheckCoupons = 9,
    Settings = 10,
    Exit = 11,
}

export const TASK_GROUPS = {
    requiresLogin: [
        TASKS.Login,
        TASKS.AddToCart,
        TASKS.AddCard,
        TASKS.RemoveCard,
        TASKS.AddBilling,
        TASKS.RemoveBilling,
    ],
    requiresAccount: [
        TASKS.AddToCart,
        TASKS.AddCard,
        TASKS.RemoveCard,
        TASKS.AddBilling,
        TASKS.RemoveBilling,
    ],
    runsAlone: [
        TASKS.LogInAndCheckCoupons,
        TASKS.AddToCartAndCheckCoupons,
        TASKS.ChangePassword,
    ],
    hidden: [TASKS.CheckCoupons],
    noneTasks: [TASKS.Settings, TASKS.Exit],
};
