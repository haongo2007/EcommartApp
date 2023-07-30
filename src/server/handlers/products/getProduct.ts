import { Prisma, PrismaClient, ShopConfig, ShopProductCategories } from "@prisma/client";
import { currentDateTimeToString } from "helpers/date";
import { responseProduct, responseProductList } from "../../../helpers/responseProduct";
import db from "../../../lib/servers/prismadb";
import {merge} from "lodash-es";
import { uniq } from "lodash";

export const getProduct = async (
  store_name: string,
  slug: string,
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
  const product = await (prisma ?? db).shopProduct.findFirst({
    where: {
      store_name,
      slug,
      status: 1,
    },
    include: {
      description: true,
      brand:true,
      attribute:true,
      categories: {
          include:{
              category:{
                  include:{
                      description:true,
                  }
              }
          }
      },
      promotion
    },
  });
  if (!product) return;
  return responseProduct(product);
};

export const getProductMeta = async (
  store_name: string,
  slug: string,
  lang: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const product = await (prisma ?? db).shopProduct.findFirst({
    where: {
      store_name,
      slug,
      status: 1,
    },
    select:{
      description:{
        where:{
          lang
        }
      },
    },
  });
  
  if (!product) return;
  return merge({}, ...product.description);
};

export const getProductRelation = async (
  categories: ShopProductCategories[],
  brand_id: number,
  product_id: number,
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
    // get config show product related
    const configDisplay : ShopConfig | null = await (prisma ?? db).shopConfig.findFirst({
        where:{
          store_id: store_id,
          group:'shop_display',
          code:'detail_display',
          key:'related_product'
        }
    });
    if(!configDisplay || configDisplay.value === 0){
      return
    }
    const cateRelate = categories.map((item) => item.category_id);
    const proIdListRelated = await (prisma ?? db).shopProductCategories.findMany({
        select:{
            product_id:true
        },
        where: {
            category_id:{
                in: cateRelate
            },
        },
    })

    const productRelated = await (prisma ?? db).shopProduct.findMany({
        where:{
            store_id: store_id,
            status: 1,
            NOT: {
                id: product_id
            },
            OR: [
                {
                    id:{
                        in: uniq(proIdListRelated.map((item) => item.product_id))
                    }
                },
                {
                    brand_id: brand_id
                }
            ]
        },
        include:{
            brand:true,
            description: true,
            attribute:true,
            promotion
        },
        take:configDisplay?.value || 0,
    });

    if (!productRelated) return;
    const data = {
        'data': productRelated
    }
    return responseProductList(data);
};
