import { Prisma, PrismaClient, ShopConfig } from "@prisma/client";
import { currentDateTimeToString } from "helpers/date";
import { groupBy } from "lodash-es";
import db from "../../../lib/servers/prismadb";

export const getProductHome = async (
    store_name: string,
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
) => {
  const where = {
    store_name,
    group:'shop_display',
    code:'home_display'
  };
  let configDisplay = await (prisma ?? db).shopConfig.findMany({
      where,
  });
  configDisplay = groupBy(configDisplay,'key');
  const numNewArrivals = configDisplay.new_arrivals[0].value;
  const numFlashDeals = configDisplay.flash_deals[0].value;
  const numDealOfday = configDisplay.deal_of_day[0].value;
  const numDealOfWeek = configDisplay.deal_of_week[0].value;
  const numMostBuyed = configDisplay.most_buyed[0].value;
  const curDate = currentDateTimeToString(new Date());
  let productNewArrivals = await (prisma ?? db).shopProduct.findMany({
      where:{
          store_name,
          status: 1,
      },
      include:{
          description: true,
          promotion:{
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
      },
      take:numNewArrivals,
      orderBy: {
          id: 'desc',
      },
  })

  let productMostBuyed = await (prisma ?? db).shopProduct.findMany({
      where:{
        store_name,
          status: 1,
          sold: {
              gt: 0,
          },
      },
      include: {
          description: true,
          promotion:{
              where:{
                  promo_type: 'normal',
                  dateStart:{
                      lt: new Date(curDate),
                  },
                  dateEnd:{
                      gte: new Date(curDate),
                  }
              }
          },
      },
      take:numMostBuyed,
      orderBy: {
          sold: 'desc',
      },
  });

  const productPromo = {
      normal:{
          take: numFlashDeals,
          config:{}
      },
      deal_of_day:{
          take: numDealOfday,
          config:{}
      },
      deal_of_week:{
          take: numDealOfWeek,
          config:{}
      }
  }
  for (const productPromoKey in productPromo) {
      productPromo[productPromoKey].config = {
          where:{
              store_name,
              status: 1,
              promo_type: productPromoKey,
              dateStart:{
                  lt: new Date(curDate),
              },
              dateEnd:{
                  gte: new Date(curDate),
              }
          },
          include: {
              product: {
                  include:{
                      description:true
                  }
              },
          },
          take:productPromo[productPromoKey].take,
      }
  }

  let productFlashDeals = await (prisma ?? db).shopProductPromotion.findMany(productPromo.normal.config);

  let productDealOfDay = await (prisma ?? db).shopProductPromotion.findMany(productPromo.deal_of_day.config);

  let productDealOfWeek = await (prisma ?? db).shopProductPromotion.findMany(productPromo.deal_of_week.config);

  const data = {
      product_new_arrivals:JSON.parse(JSON.stringify(productNewArrivals)),
      product_flash_deals:JSON.parse(JSON.stringify(productFlashDeals)),
      product_deals_day:JSON.parse(JSON.stringify(productDealOfDay)),
      product_deals_week:JSON.parse(JSON.stringify(productDealOfWeek)),
      product_most_buyed:JSON.parse(JSON.stringify(productMostBuyed)),
  }
  return data;
};
