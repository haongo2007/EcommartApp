import {  ShopProductCategories } from "@prisma/client";
import {ProductTypeClient} from "./product";

export interface ProductCategoriesClient extends Omit<ShopProductCategories, "assignedAt"> {
    product_id: number;
    category_id: number;
    assignedAt: Date;
    assignedBy: string;
    product: ProductTypeClient | null;
}
