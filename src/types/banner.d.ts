import {ShopBanner} from "@prisma/client";

export interface ShopBannerTypeClient extends Omit<ShopBanner, "createdAt" | "updatedAt"> {
    createdAt: any;
    updatedAt: any | null
}

export type ShopBannerListType = ShopBannerTypeClient[];