import {ShopBannerListType, ShopBannerTypeClient} from "../types/banner";

export const responseBanner = (banner: ShopBannerTypeClient) => ({
    ...banner,
    createdAt: banner.createdAt.toUTCString(),
    updatedAt: banner.updatedAt?.toUTCString() ?? null,
});

export const responseBannerList = (bannerList: ShopBannerListType) => bannerList.map((banner) => responseBanner(banner));
