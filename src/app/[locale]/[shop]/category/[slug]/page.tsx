import BreadCrumbs from "components/categories/page/BreadCrumbs";
import { Metadata } from "next";
import { getCategory } from "server/handlers/categories/getCategory";
import { PageDetailProps } from "types/types";
import CategoryPageContain from "components/categories/page/CategoryPageContain";
import Box from "@mui/material/Box";
import CategoryPageSideBar from "components/categories/page/CategoryPageSideBar";
import { ShopCategories } from "@prisma/client";
import { use } from "react";
import { fetchAllCategories } from "server/handlers/categories/fetchAllCategories";
import { fetchBreadCrumbCategories } from "server/handlers/categories/fetchBreadCrumbCategories";

export async function generateMetadata( { params }: PageDetailProps): Promise<Metadata> {
    // fetch data
    const { lng,shop,slug } = params;
    const category = await getCategory(shop,slug);
    const categoryDesc = category?.description.filter((item) => item.lang === lng);
    const {title} = categoryDesc[0];
    const {description} = categoryDesc[0];
    return {
      title,
      description,
      alternates:{
          canonical:`${shop}/category/${slug}`,
          languages: {
              'en-CA': `en/${shop}/category/${slug}`,
          }
      }
    }
  }
  
export default function CategoryPage({ params }: PageDetailProps){
    const {lng,shop,slug} = params;
    const category = use(getCategory(shop,slug));
    const childCategories : ShopCategories[] | undefined = use(fetchAllCategories(shop,category.id));
    const breadCrumbCategories : ShopCategories[] | undefined = use(fetchBreadCrumbCategories(shop,category.id));
    return (
        <>
            <CategoryPageSideBar locale={lng} domain={shop} childCategories={childCategories} categories={[category]}/>
            <Box width={"100%"} mt={8}>
                <BreadCrumbs current={category} data={breadCrumbCategories} locale={lng} domain={shop}/>
            </Box>
        </>
    );
};