import { ShopCategories } from "@prisma/client";
import {CategoryGroupType} from "../types/category";

export const responseCategory = (category: ShopCategories) => ({
    ...category,
});

export const responseCategoryGroup = (group: CategoryGroupType) => JSON.parse(JSON.stringify(group));

export const responseCategories = (categories: ShopCategories[]) => categories.map((category) => responseCategory(category));

