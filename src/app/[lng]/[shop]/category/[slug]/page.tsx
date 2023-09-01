import { ShopCategories, ShopProductCategories } from "@prisma/client";
import CategoryPageContain from "components/categories/page/CategoryPageContain";
import { Metadata } from "next";
import { use } from "react";
import { getCategory } from "server/handlers/categories/getCategory";
import { fetchProductsByCategory } from "server/handlers/products/fetchProductsByCategory";
import { PageDetailProps } from "types/types";

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
    return (
        ''
    );
};