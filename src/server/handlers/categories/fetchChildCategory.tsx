import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";

// using fetch all categories with one step to client recur
export const fetchChildCategory = async (
  input : string,
  prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
) => {
  const arr_numChild: number[]  = input.split(",").map( Number );
  const data = await (prisma ?? db).shopCategories.findMany({
    where: {
      id: { in: arr_numChild },
    },
    include: {
      description: true,
      shop: true
    },
  });
  return data;
}
