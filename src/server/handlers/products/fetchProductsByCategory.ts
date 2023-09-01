import { Prisma, PrismaClient } from "@prisma/client";
import { currentDateTimeToString } from "helpers/date";
import { responseProductCategories } from "helpers/responseProductCategories";
import db from "../../../lib/servers/prismadb";

export const fetchProductsByCategory = async (
  categoryId: number[],
  take?: number,
  skip?: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
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
  const products = await (prisma ?? db).shopProductCategories.findMany({
    where: {
      category_id:{
        in : categoryId
      }
    },
    include: {
      product:{
        include:{
          brand:true,
          description: true,
          promotion
        }
      }
    },
    ...(take && { take }),
    ...(skip && { skip }),
  });
  
  return responseProductCategories(products)
};
