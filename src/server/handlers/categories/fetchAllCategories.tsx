import {Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseCategories} from "../../../helpers/responseCategory";
import { getShopId } from "../shop/getShopId";

export const fetchAllCategories = async (
        shop: string,
        parent?: number,
        prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {

    const store_id = await getShopId(shop);
    if(store_id == null) return;  
      
    const where: {
        parent?: number;
        store_id: number;
        status: number;
    } = {
        store_id,
        parent,
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