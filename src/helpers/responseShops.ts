import {ShopListType, ShopTypeClient} from "../types/shop";
import { responseBannerList } from "./responseBanner";

export const responseShop = (shop: ShopTypeClient) => ({
    ...shop,
    createdAt: shop.createdAt.toUTCString() ?? null,
    updatedAt: shop.updatedAt?.toUTCString() ?? null,
    banner: shop.banner ? responseBannerList(shop.banner) : null,
    description: shop.description ? shop.description : null,
});

export const responseShopList = (shopList: ShopListType) =>({
    total: shopList.total,
    data: shopList.data.map((shop) => responseShop(shop))
});
