import { create } from "zustand";
import { createBannerStore } from "./shopBanner";
import { createBrandsStore } from "./shopBrands";
import { createCategoryStore } from "./shopCategory";
import { createConfigStore } from "./shopCofig";
import { createShopInfoStore } from "./shopInfo";
import { createShopLocaleStore } from "./shopLocale";
import { CategoryGroupType } from "../types/category";
import { createAttributeGroupProductStore } from "./shopAGroupP";
import { createShopCartStore } from "./shopCart";
import { ShopConfig, Shops, ShopBrand, ShopBanner, ShopAttributeGroup } from "@prisma/client";
import { ShopLocal } from "../types/shop";
import { persist } from "zustand/middleware";

type initProps = {
    shopCategory: CategoryGroupType,
    shopConfig: ShopConfig,
    shopInfo: Shops,
    shopLocale: ShopLocal,
    shopBrands: ShopBrand,
    shopBanner: ShopBanner,
    shopAGroupP: ShopAttributeGroup
}

// export const useStore = create((...args) => ({
//     ...createCategoryStore(...args),
//     ...createConfigStore(...args),
//     ...createShopInfoStore(...args),
//     ...createShopLocaleStore(...args),
//     ...createShopCartStore(...args),
//     ...createBrandsStore(...args),
//     ...createBannerStore(...args),
//     ...createAttributeGroupProductStore(...args),
//     hydrateStore: (data : initProps) => {
//         const [set] = args;
//         set({ ...data });
//     },
// }));

// persist store
export const useStore = create(
    persist(
        (...args) => ({
            ...createCategoryStore(...args),
            ...createConfigStore(...args),
            ...createShopInfoStore(...args),
            ...createBrandsStore(...args),
            ...createShopCartStore(...args),
            ...createShopLocaleStore(...args),
            ...createBannerStore(...args),
            ...createAttributeGroupProductStore(...args),
            hydrateStore: (data : initProps) => {
                const [set] = args;
                set({ ...data });
            },
        }),
        {
            name: 'carts' , 
            partialize: (state) => ({ shopCarts: state.shopCarts }) ,
        }
    )
);