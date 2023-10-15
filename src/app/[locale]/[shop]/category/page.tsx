import Box from "@mui/material/Box";
import { ShopCategories, ShopProductCategories } from "@prisma/client";
import CategoryPageContain from "components/client/categories/page/CategoryPageContain";
import CategoryPageSideBar from "components/client/categories/page/CategoryPageSideBar";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { use } from "react";
import { fetchAllCategories } from "server/handlers/categories/fetchAllCategories";
import { fetchAllCategorySuggestion } from "server/handlers/categories/fetchAllCategorySuggestion";
import { fetchProductsByCategory } from "server/handlers/products/fetchProductsByCategory";
import { PageDefaultProps } from "types/types";

export async function generateMetadata({params: {locale}}: PageDefaultProps) {
    const messages = await getMessages(locale);
    const t = createTranslator({locale, messages});
    return {
        title: t('Meta.title.category'),
        description: t('Ecommflex.description'),
    };
}

export default function CategoryPage({ params }: PageDefaultProps){
    const {locale,shop} = params;
    const rootCategories : ShopCategories[] | undefined = use(fetchAllCategories(shop,0));
    let products : ShopProductCategories[] = [];
    const categoriesId : number[] | undefined = rootCategories?.map((item) => item.id);
    if(categoriesId !== undefined){
        products = use(fetchProductsByCategory(categoriesId));
    }
    const suggestionCategory : ShopCategories[] | undefined = use(fetchAllCategorySuggestion(shop));
    return (
        <>
            <CategoryPageSideBar locale={locale} domain={shop} categories={rootCategories}/>
            <Box width={"100%"} mt={8}>
                <CategoryPageContain locale={locale} domain={shop} suggestionCategory={suggestionCategory} products={products}/>
            </Box>
        </>
    );
};