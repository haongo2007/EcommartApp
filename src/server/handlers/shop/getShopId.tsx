import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import { cache } from "react";

export const getShopId = cache(async (
  shop: string,
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
  const shopData = await (prisma ?? db).shops.findUnique({
    where: {
      domain: shop,
    },
    select:{
        id:true
    }
  });
  return shopData ? shopData.id : null;
});