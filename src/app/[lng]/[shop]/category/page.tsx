import { ShopCategories, ShopProductCategories } from "@prisma/client";
import CategoryPageContain from "components/categories/page/CategoryPageContain";
import { Metadata } from "next";
import { use } from "react";
import { fetchAllCategories } from "server/handlers/categories/fetchAllCategories";
import { fetchAllCategorySuggestion } from "server/handlers/categories/fetchAllCategorySuggestion";
import { fetchProductsByCategory } from "server/handlers/products/fetchProductsByCategory";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Category',
}
  
export default function CategoryPage({ params }: PageDefaultProps){
    const {lng,shop} = params;
    const rootCategories : ShopCategories[] | undefined = use(fetchAllCategories(shop,0));
    let products : ShopProductCategories[] = [];
    const categoriesId : number[] | undefined = rootCategories?.map((item) => item.id);
    if(categoriesId !== undefined){
        products = use(fetchProductsByCategory(categoriesId));
    }
    const suggestionCategory : ShopCategories[] | undefined = use(fetchAllCategorySuggestion(shop));
    return (
        <CategoryPageContain locale={lng} domain={shop} suggestionCategory={suggestionCategory} categories={rootCategories} products={products}/>
    );
};