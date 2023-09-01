import {Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseCategories} from "../../../helpers/responseCategory";
import { getShopId } from "../shop/getShopId";

export const fetchAllCategorySuggestion = async (
        shop: string,
        prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {

    const store_id = await getShopId(shop);
    if(store_id == null) return;  
      
    const where: {
        store_id: number;
        status: number;
        top: number;
    } = {
        store_id,
        top: 1,
        status: 1
    };
    const data = await (prisma ?? db).shopCategories.findMany({
        where,
        include:{
            description: true
        }
    });
    return responseCategories(data);
}