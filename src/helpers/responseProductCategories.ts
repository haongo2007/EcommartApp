import { ShopProductCategories } from "@prisma/client";

export const responseProductCategory = (categories: ShopProductCategories) => ({
    ...categories,
    assignedAt: categories.assignedAt?.toUTCString() ?? null,
})

export const responseProductCategories = (categories: ShopProductCategories[]) => categories.map((category) => responseProductCategory(category));
