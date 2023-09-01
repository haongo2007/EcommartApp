import CategoryPageSideBar from "components/categories/page/CategoryPageSideBar";
import MobileNavigationBar from "components/categories/mobile/MobileNavigationBar";
import { use } from "react";
import { fetchAllCategories } from "server/handlers/categories/fetchAllCategories";
import Box from "@mui/material/Box";

type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}
export default function CategoryPageLayout({ children, params : { lng,shop }}: LayoutProps) {
    const rootCategories = use(fetchAllCategories(shop,0));
    return (
        <Box display="flex">
            <CategoryPageSideBar locale={lng} domain={shop} rootCategories={rootCategories}/>
            {children}
            <MobileNavigationBar locale={lng} domain={shop}/>
        </Box>
    )
};