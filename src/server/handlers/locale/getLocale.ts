import {Prisma, PrismaClient} from "@prisma/client";
import { responseLocale } from "helpers/responseLocale";
import db from "../../../lib/servers/prismadb";

export const getLocale = async (
  store_id?: number | null,
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
    const where = {
        store_id:null
    };
    if(store_id !== undefined){
        where.store_id = store_id;
    }
    const languages = await (prisma ?? db).shopLanguage.findMany({
        where
    });
    const currencies = await (prisma ?? db).shopCurrency.findMany({
        where
    });
    const data = {
        currencies:JSON.parse(JSON.stringify(currencies)),
        languages:JSON.parse(JSON.stringify(languages)),
    }
    return responseLocale(data);
};