import {Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseCategories} from "../../../helpers/responseCategory";
import { getShopId } from "../shop/getShopId";

export const fetchBreadCrumbCategories = async (
        shop: string,
        cat_id: number,
        prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {

    const store_id = await getShopId(shop);
    if(store_id == null) return;  
    const data = await (prisma ?? db).$queryRaw`SELECT c.*, JSON_ARRAYAGG(JSON_OBJECT('lang', d.lang,'title',d.title)) as description
    FROM ef_shops_categories c 
    LEFT JOIN ef_shops_categories_description d 
    ON c.id = d.category_id 
    WHERE store_id = ${store_id} 
    AND FIND_IN_SET(${cat_id}, child_list) > 0
    GROUP BY c.id;`

    return responseCategories(data);
}