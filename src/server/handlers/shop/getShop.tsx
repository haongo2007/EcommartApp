import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {responseShop} from "../../../helpers/responseShops";
import {merge} from "lodash-es";

export const getShop = async (
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
};

export const getShopMeta = async (
  params: {lng:string,shop:string},
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
  const data = await (prisma ?? db).shops.findFirst({
    select:{
      description:{
        where:{
          lang: params.lng
        }
      },
      favicon:true
    },
    where: {
      domain: params.shop,
    },
  });
  const meta = merge({}, ...data.description);
  meta['favicon'] = data?.favicon;
  return meta;
};
