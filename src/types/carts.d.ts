import { ShopCustomerCart } from "@prisma/client";
import {ProductTypeClient} from "./product";

export interface CartTypeClient extends Omit<ShopCustomerCart> {
    product: ProductTypeClient;
    qty: string;
    variant?: any;
    images: string;
    store_id: number;
}

export type CartListType = CartTypeClient[];