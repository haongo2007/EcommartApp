import { PrismaClient } from "@prisma/client";
import { initShops } from "./seedData/shops";
import { initShopsAddress } from "./seedData/shopsAddress";
import { initShopsAttributeGroup } from "./seedData/shopsAttributeGroup";
import { initShopsBanner } from "./seedData/shopsBanner";
import { initShopsBrand } from "./seedData/shopsBrand";
import { initShopCategories } from "./seedData/shopCategories";
import { initCategoriesDesc } from "./seedData/categoriesDesc";
import { initShopConfig } from "./seedData/shopConfig";
import { initShopCurrency } from "./seedData/shopCurrency";
import { initShopDesc } from "./seedData/shopDesc";
import { initShopLanguage } from "./seedData/shopLanguage";
import { initShopProductAttribute } from "./seedData/shopProductAttribute";
import { initShopProductCategories } from "./seedData/shopProductCategories";
import { initShopProducts } from "./seedData/shopProducts";
import { initShopProductsDesc } from "./seedData/shopProductsDesc";
import { initShopProductsPromo } from "./seedData/shopProductsPromo";
import { initShopSupplier } from "./seedData/shopSupplier";


const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$transaction([
    prisma.shops.createMany({
      data: initShops,
      skipDuplicates: true,
    }),
    prisma.shopCategories.createMany({
      data: initShopCategories,
      skipDuplicates: true,
    }),
    prisma.shopAddress.createMany({
      data: initShopsAddress,
      skipDuplicates: true,
    }),
    prisma.shopAttributeGroup.createMany({
      data: initShopsAttributeGroup,
      skipDuplicates: true,
    }),
    prisma.shopBanner.createMany({
      data: initShopsBanner,
      skipDuplicates: true,
    }),
    prisma.shopBrand.createMany({
      data: initShopsBrand,
      skipDuplicates: true,
    }),
    prisma.shopCategoriesDescription.createMany({
      data: initCategoriesDesc,
      skipDuplicates: true,
    }),
    prisma.shopConfig.createMany({
      data: initShopConfig,
      skipDuplicates: true,
    }),
    prisma.shopCurrency.createMany({
      data: initShopCurrency,
      skipDuplicates: true,
    }),
    prisma.shopDescriptions.createMany({
      data: initShopDesc,
      skipDuplicates: true,
    }),
    prisma.shopLanguage.createMany({
      data: initShopLanguage,
      skipDuplicates: true,
    }),
    prisma.shopSupplier.createMany({
      data: initShopSupplier,
      skipDuplicates: true,
    }),
    prisma.shopProduct.createMany({
      data: initShopProducts,
      skipDuplicates: true,
    }),
    prisma.shopProductCategories.createMany({
      data: initShopProductCategories,
      skipDuplicates: true,
    }),
    prisma.shopProductAttribute.createMany({
      data: initShopProductAttribute,
      skipDuplicates: true,
    }),
    prisma.shopProductDescription.createMany({
      data: initShopProductsDesc,
      skipDuplicates: true,
    }),
    prisma.shopProductPromotion.createMany({
      data: initShopProductsPromo,
      skipDuplicates: true,
    }),
  ]);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
