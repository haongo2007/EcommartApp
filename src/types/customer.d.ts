import { AccountSession } from "../types/types";

export interface ShopCustomerClient extends Omit<AccountSession , "birthday"> {
    birthday: any | null;
}