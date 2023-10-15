import {Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import { getShopId } from "../shop/getShopId";
import { responseBannerList } from "helpers/responseBanner";

export const fetchBanners = async (
        shop: string,
        prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {

    const store_id = await getShopId(shop);
    if(store_id == null) return;  
      
    const where: {
        store_id: number;
        status: number;
    } = {
        store_id,
        status: 1
    };
    const data = await (prisma ?? db).shopBanner.findMany({
        where,
    });
    return responseBannerList(data);
}