import {CategoryGroupType} from "./category";
import {ShopConfig,ShopLanguage,ShopCurrency, ShopBrand, ShopBanner, ShopAttributeGroup} from "@prisma/client";

export interface ShopTypeClient extends Omit<Shops, "createdAt" | "updatedAt"> {
    createdAt: any;
    updatedAt: any | null;
    favicon: string | null;
    id: number;
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
    shopCategory?:CategoryGroupType,
    shopConfig?:ShopConfig[],
    shopInfo?: Shops,
    shopLocale?:ShopLocal,
    shopBrands?:ShopBrand[],
    shopBanner?:ShopBanner[],
    shopAGroupP?:ShopAttributeGroup[]
}
