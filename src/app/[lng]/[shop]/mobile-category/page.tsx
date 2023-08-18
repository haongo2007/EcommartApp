import CategoryMenuMobile from "components/categories/CategoryMenuMobile";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Category',
}
  
export default function CategoryPage({ params }: PageDefaultProps){
    const {lng,shop} = params;
    return (
        <CategoryMenuMobile locale={lng} domain={shop}/>
    );
};