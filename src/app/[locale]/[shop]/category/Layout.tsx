import MobileNavigationBar from "components/client/categories/mobile/MobileNavigationBar";
import Box from "@mui/material/Box";

type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}
export default function CategoryPageLayout({ children, params : { lng,shop }}: LayoutProps) {
    return (
        <Box display="flex">
            {children}
            <MobileNavigationBar locale={lng} domain={shop}/>
        </Box>
    )
};