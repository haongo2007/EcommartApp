import { create } from "zustand";
import { createBannerStore } from "./shopBanner";
import { createBrandsStore } from "./shopBrands";
import { createCategoryStore } from "./shopCategory";
import { createConfigStore } from "./shopCofig";
import { createShopInfoStore } from "./shopInfo";
import { createShopLocaleStore } from "./shopLocale";
import {CategoryGroupType} from "../types/category";
import { createAttributeGroupProductStore } from "./shopAGroupP";
import {ShopConfig, Shops, ShopBrand, ShopBanner, ShopAttributeGroup} from "@prisma/client";
import {ShopLocal} from "../types/shop";

type initProps = {
    shopCategory: CategoryGroupType,
    shopConfig: ShopConfig,
    shopInfo: Shops,
    shopLocale: ShopLocal,
    shopBrands: ShopBrand,
    shopBanner: ShopBanner,
    shopAGroupP: ShopAttributeGroup
}

export const useStore = create((...args) => ({
    ...createCategoryStore(...args),
    ...createConfigStore(...args),
    ...createShopInfoStore(...args),
    ...createShopLocaleStore(...args),
    ...createBrandsStore(...args),
    ...createBannerStore(...args),
    ...createAttributeGroupProductStore(...args),
    hydrateStore: (data : initProps) => {
        const [set] = args;
        set({ ...data });
    },
}));

// persist store
// export const useStore = create(
//     persist(
//         (...args) => ({
//             ...createCategoryStore(...args),
//             ...createConfigStore(...args),
//             ...createShopInfoStore(...args),
//             ...createBrandsStore(...args),
//             ...createShopLocaleStore(...args),
//             ...createBannerStore(...args),
//             ...createAttributeGroupProductStore(...args),
//             hydrateStore: (data : initProps) => {
//                 const [set] = args;
//                 set({ ...data });
//             },
//         }),
//         {
//             name: 'shopState' , 
//             partialize: (state) => ({ shopLocale: state.shopLocale , shopInfo: state.shopInfo }) ,
//         }
//     )
// );