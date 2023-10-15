import { Badge } from "@mui/material";
import Home from "components/client/icons/Home";
import User2 from "components/client/icons/User2";
import CategoryOutlined from "components/client/icons/CategoryOutline";
import ShoppingBagOutlined from "components/client/icons/ShoppingBagOutlined";
import useWindowSize from "hooks/useWindowSize";
import { iconStyle, StyledNavLink, Wrapper } from "./styles";
import { useAccountContext } from "providers/AccountProvider";
import { useStore } from "stores";

const MobileNavigationBar = ({domain,locale}:{domain:string,locale:string}) => {
    const { account } = useAccountContext();
    const width = useWindowSize();
    const shopCarts = useStore((state) => state.shopCarts[domain]);
    const cartLength = shopCarts?.reduce((total, curr) => (total += curr.qty),0);
    const list = [
        {
            title: "Home",
            icon: Home,
            href: `/${locale}/${domain}/`,
        },
        {
            title: "Category",
            icon: CategoryOutlined,
            href: `/${locale}/${domain}/mobile-category`,
        },
        {
            title: "Cart",
            icon: ShoppingBagOutlined,
            href: `/${locale}/${domain}/cart`,
        },
    ];
    if(account){
        list.push({
                title: "Account",
                icon: User2,
                href: `/${locale}/${domain}/account`,
            })
    }else{
        list.push({
            title: "Login",
            icon: User2,
            href: `/${locale}/${domain}/login`,
        })
    }
    return width <= 900 ? (
        <Wrapper>
            {list.map((item) => (
                <StyledNavLink href={item.href} key={item.title}>
                {item.title === "Cart" ? (
                    <Badge badgeContent={cartLength} color="primary">
                        <item.icon fontSize="small" sx={iconStyle} />
                    </Badge>
                ) : (
                    <item.icon sx={iconStyle} fontSize="small" />
                )}

                {item.title}
                </StyledNavLink>
            ))}
        </Wrapper>
    ) : null;
};
export default MobileNavigationBar;
