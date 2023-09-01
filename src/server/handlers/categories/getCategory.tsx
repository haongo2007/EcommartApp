import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseCategory} from "../../../helpers/responseCategory";
import { cache } from "react";
import { getShopId } from "../shop/getShopId";

export const getCategory = cache(async (
  shop: string,
  slug: string,
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
    const store_id = await getShopId(shop);
    if(store_id == null) return;  

    const data = await (prisma ?? db).shopCategories.findFirst({
        include: {
            description:true
        },
        where: {
            store_id,
            alias:slug
        },
    });
  return responseCategory(data);
});