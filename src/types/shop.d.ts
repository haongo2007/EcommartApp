import {CategoryGroupType} from "./category";
import {ShopConfig,ShopLanguage,ShopCurrency,ShopAttributeGroup, ShopCategories, ShopCustomerCart} from "@prisma/client";

export interface ShopTypeClient extends Omit<Shops, "createdAt" | "updatedAt"> {
    createdAt: any;
    updatedAt: any | null;
    favicon: string | null;
    id: number;
    domain: string;
    email: string;
    phone: string;
    language: string;
    currency: string;
    logo: string;
    configs: ShopConfig[];
    currencies:ShopCurrency[];
    languages:ShopLanguage[];
    brand:ShopBrand;
    attribute_group: ShopAttributeGroup[];
    categories: ShopCategories[];
}

export type ShopListType = {
    total: number;
    data: ShopTypeClient[];
}

export type ShopLocal = {
    currencies?:ShopCurrency[],
    currency?:string,
    language:string,
    languages:ShopLanguage[]
}

export type InitialStore = {
    shopCategory?:CategoryGroupType | ShopCategories[],
    shopConfig?:ShopConfig[],
    shopInfo?: Shops,
    shopLocale?:ShopLocal,
    shopAGroupP?:ShopAttributeGroup[],
    shopBrands?:ShopBrandListType,
    shopBanner?:ShopBannerListType,
    shopCarts?:ShopCustomerCart
}