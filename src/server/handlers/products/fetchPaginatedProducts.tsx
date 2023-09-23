import { Prisma, PrismaClient } from "@prisma/client";
import { Sort } from "../../routers/subRouters/admin.router";
import db from "../../../lib/servers/prismadb";
import { responseProductList } from "helpers/responseProduct";
import { currentDateTimeToString } from "helpers/date";

export const fetchPaginatedProducts = async (
  store_id: number,
  take: number,
  sort: Sort,
  cursor?: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
) => {
  const curDate = currentDateTimeToString(new Date());
  const promotion = {
      where:{
          promo_type: 'normal',
          dateStart:{
              lt: new Date(curDate),
          },
          dateEnd:{
              gte: new Date(curDate),
          }
      }
  }
  const products = await (prisma ?? db).shopProduct.findMany({
    where: {
      status: 1,
      store_id
    },
    include:{
      description:true,
      brand: true,
      promotion,
    },
    take: take,
    orderBy: {
      ...(sort === Sort.Asc && { id: "asc" }),
      ...(sort === Sort.Desc && { id: "desc" }),
      ...(sort === Sort.PriceDown && { price: "desc" }),
      ...(sort === Sort.PriceUp && { price: "asc" }),
    },
  });
  if (!products) return;
  return responseProductList({data:products});
}

