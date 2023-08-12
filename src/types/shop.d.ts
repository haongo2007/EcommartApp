import {CategoryGroupType} from "./category";
import {ShopConfig,ShopLanguage,ShopCurrency} from "@prisma/client";

export interface ShopTypeClient extends Omit<Shops, "createdAt" | "updatedAt"> {
    createdAt: any;
    updatedAt: any | null
}

export type ShopListType = {
    total: number;
    data: ShopTypeClient[];
}

export type ShopLocal = {
    currencies:ShopCurrency[],
    languages:ShopLanguage[]
}

export type InitialStore = {
    allCategory:CategoryGroupType,
    allShopConfig:ShopConfig[],
    shopInfo: Shops,
    ShopLocal:ShopLocal
}
