import { User } from "next-auth";
import { z } from "zod";
import { cartItemSchema } from "../helpers/validations/cartItemSchema";

export type AccountSession = | (User & { id: string, avatar: string, first_name: string, last_name: string, email: string, store_id: number, phone: string, birthday: Date }) | undefined;

export type CartItemProps = z.infer<typeof cartItemSchema>;

export type AppInfomation = {
    logo: string,
    phone: string,
    email: string,
    language?: string,
    languages?: object,
    domain?: string,
}
export type PageDefaultProps = {
    params: {
        lng:string,
        shop:string,
    }
}

export type AccountPageEditProps = {
    params: {
        lng:string,
        shop:string,
        name:string,
    }
}

export type ProductPageEditProps = {
    params: {
        lng:string,
        shop:string,
        slug:string
    }
}