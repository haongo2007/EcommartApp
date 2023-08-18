import { ShopProduct, ShopProductAttribute, ShopProductCategories, ShopProductPromotion } from "@prisma/client";

export interface ProductTypeClient extends Omit<ShopProduct, "createdAt" | "updatedAt"> {
    createdAt: any;
    updatedAt: any | null;
    promotion?: ShopProductPromotion[];
    attribute?: ShopProductAttribute;
    categories?: ShopProductCategories[];
}

export type ProductListType = {
    total?: number;
    data: ProductTypeClient[];
}