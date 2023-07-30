import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClientList } from "../../../helpers/responseProduct";
import db from "../../../lib/servers/prismadb";

export const fetchPopularProducts = async (
  limit: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const products = await (prisma ?? db).shopProduct.findMany({
    where: {
      status: 1,
    },
    take: limit,
    orderBy: {
      price: "desc",
    },
    include: {
      categories: true,
    },
  });

  return massageProductClientList(products);
};
