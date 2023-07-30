import { User } from "next-auth";
import { z } from "zod";
import { cartItemSchema } from "../helpers/validations/cartItemSchema";

export type UserSession = | (User & { id: string; }) | undefined;

export type CartItemProps = z.infer<typeof cartItemSchema>;

export type AppInfomation = {
    logo: string,
    phone: string,
    email: string,
    language?: string,
    languages?: object,
    domain?: string,
}
