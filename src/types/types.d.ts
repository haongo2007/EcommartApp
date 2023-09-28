import { User } from "next-auth";
import { z } from "zod";
import { cartItemSchema } from "../helpers/validations/cartItemSchema";

export type AccountSession = { birthday: any; } | null | User;

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
    children?: React.ReactNode,
    params: {
        lng:string,
        shop:string,
    }
}

export type AccountPageDetailProps = {
    params: {
        lng:string,
        shop:string,
        name:string,
    }
}

export type PageDetailProps = {
    params: {
        lng:string,
        shop:string,
        slug:string
    }
}