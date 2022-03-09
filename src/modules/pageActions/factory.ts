import { TASKS } from "../userInteractions/constants";
import { addBilling } from "./billing";
import { addCard } from "./card";
import { addToCart } from "./cart";
import { tryCoupons } from "./coupon";
import { login } from "./login";

export class PageActionFactory {
    static getPageAction(task: TASKS): any {
        switch (task) {
            case TASKS.CheckCoupons:
                return tryCoupons;
            case TASKS.Login:
                return login;
            case TASKS.AddToCart:
                return addToCart;
            // case TASKS.RemoveCard:
            //     return removeCard;
            case TASKS.AddCard:
                return addCard;
            case TASKS.RemoveBilling:
            // return removeAddress;
            case TASKS.AddBilling:
                return addBilling;
            // case TASKS.ChangePassword:
            //     return changePasswird
        }
        return null;
    }
}
