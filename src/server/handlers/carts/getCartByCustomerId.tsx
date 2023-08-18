import { Prisma, PrismaClient } from "@prisma/client";
import { currentDateTimeToString } from "helpers/date";
import { responseCartsList } from "../../../helpers/responseCarts";
import db from "../../../lib/servers/prismadb";

export const getCartByCustomerId = async (
  customer_id: string,
  store_id: number,
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
    const carts = await (prisma ?? db).shopCustomerCart.findMany({
        where: {
            customer_id,
            store_id
        },
        include: {
            product:{
                include:{
                    description: true,
                    promotion
                },
            },
        },
    });
    if (!carts) return;
    return responseCartsList(carts);
};
