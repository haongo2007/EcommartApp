import { useEffect, useState } from "react";
import { Badge, Box } from "@mui/material";
import Home from "components/icons/Home";
import User2 from "components/icons/User2";
import CategoryOutlined from "components/icons/CategoryOutline";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import useWindowSize from "hooks/useWindowSize";
import { LAYOUT_CONSTANT } from "../../constants"; // styled components
import {
  iconStyle,
  StyledBox,
  StyledDrawer,
  StyledNavLink,
  Wrapper,
} from "./styles"; // ===================================================
import { useStore } from "stores";

// ===================================================

/**
 * Difference between MobileNaviagationBar and MobileNaviagationBar2
 * 1. In the MobileNaviagationBar we doesn't use conditinally render
 * 2. In the list array if doesn't exists href property then open category menus sidebar drawer in MobileNaviagationBar2
 */
const MobileNavigationBar2 = ({ children }) => {
  const width = useWindowSize();
  const {domain} = useStore((state) => state.shopInfo);
  const cartState = useStore((state) => state.shopCarts[domain]);
  const [open, setOpen] = useState(false);
  const { mobileNavHeight, topbarHeight } = LAYOUT_CONSTANT;
  const total = mobileNavHeight + topbarHeight;
  const [totalHeight, setTotalHeight] = useState(total);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const listner = () => {
      if (window.scrollY > 30) setTotalHeight(mobileNavHeight);
      else setTotalHeight(total);
    };

    window.addEventListener("scroll", listner);
    return () => window.removeEventListener("scroll", listner);
  }, [mobileNavHeight, total]);
  return width <= 900 ? (
    <Box position="relative" display="flex" flexDirection="column">
      <StyledDrawer
        open={open}
        anchor="left"
        totalheight={totalHeight}
        onClose={handleDrawerClose}
      >
        {children}
      </StyledDrawer>

      <Wrapper>
        {list.map((item) => {
          if (item.href) {
            return (
              <StyledNavLink href={item.href} key={item.title}>
                {item.title === "Cart" && (
                  <Badge badgeContent={cartState.cart.length} color="primary">
                    <item.icon fontSize="small" sx={iconStyle} />
                  </Badge>
                )}

                {item.title !== "Cart" && (
                  <item.icon sx={iconStyle} fontSize="small" />
                )}
                {item.title}
              </StyledNavLink>
            );
          } else {
            return (
              <StyledBox
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                key={item.title}
              >
                {item.title === "Cart" && (
                  <Badge badgeContent={cartState.cart.length} color="primary">
                    <item.icon fontSize="small" sx={iconStyle} />
                  </Badge>
                )}

                {item.title !== "Cart" && (
                  <item.icon sx={iconStyle} fontSize="small" />
                )}
                {item.title}
              </StyledBox>
            );
          }
        })}
      </Wrapper>
    </Box>
  ) : null;
};

const list = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Category",
    icon: CategoryOutlined,
  },
  {
    title: "Cart",
    icon: ShoppingBagOutlined,
    href: "/cart",
  },
  {
    title: "Account",
    icon: User2,
    href: "/profile",
  },
];
export default MobileNavigationBar2;
