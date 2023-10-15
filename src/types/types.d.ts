import { User } from "next-auth";
import { z } from "zod";
import { cartItemSchema } from "../helpers/validations/cartItemSchema";
import { ShopCurrency, ShopLanguage } from "@prisma/client";

export type AccountSession = { birthday: any; } | null | User;

export type CartItemProps = z.infer<typeof cartItemSchema>;

export type AppInfomation = {
    logo: string,
    phone: string,
    email: string,
    domain?: string,
}
export type PageDefaultProps = {
    children?: React.ReactNode,
    params: {
        locale:string,
        shop:string,
    }
}

export type AccountPageDetailProps = {
    params: {
        locale:string,
        shop:string,
        name:string,
    }
}

export type PageDetailProps = {
    params: {
        locale:string,
        shop:string,
        slug:string
    }
}