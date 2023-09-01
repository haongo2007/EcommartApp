import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseShop} from "../../../helpers/responseShops";
import { cache } from "react";

export const getShop = cache(async (
  include: object,
  shop: string,
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
  const data = await (prisma ?? db).shops.findUnique({
    include: include,
    where: {
      domain: shop,
    },
  });
  return responseShop(data);
});