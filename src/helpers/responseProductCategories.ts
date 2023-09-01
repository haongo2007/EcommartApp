import { ProductCategoriesClient } from "types/product-category";
import { responseProduct } from "./responseProduct";

export const responseProductCategory = (category: ProductCategoriesClient) => {
    
    return {
        assignedAt: category.assignedAt?.toUTCString() ?? null,
        product: category.product !== null ? responseProduct(category.product) : null,
    }
  };
export const responseProductCategories = (categories: ProductCategoriesClient[]) => categories.map((category) => responseProductCategory(category));
