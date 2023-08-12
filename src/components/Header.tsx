"use client"
import Link from "next/link";
import { useState } from "react";
import { Badge, Box, Button, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import clsx from "clsx";
import Image from "./BazaarImage";
import { FlexBox } from "./flex-box";
import ShopCart from "./side-cart/ShopCart";
import HomeCart from "./side-cart/HomeCart";
import MobileMenu from "./navbar/MobileMenu";
import CategoryMenu from "./categories/CategoryMenu";
import GrocerySearchBox from "./search-box/GrocerySearchBox";
import SearchBox from "./search-box/SearchBox";
import Category from "./icons/Category";
import ShoppingBagOutlined from "./icons/ShoppingBagOutlined";
import Login from "./sessions/Login";
import {LAYOUT_CONSTANT} from "../constants";
import {useEffect} from "react";
import {APP_INFOMATION} from "../constants";
import { AppInfomation } from "types/types";
import { useStore } from "../stores";
import { useRouter } from "next/navigation";
import { useAccountContext } from "providers/AccountProvider";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
    zIndex: 3,
    position: "relative",
    height: LAYOUT_CONSTANT.headerHeight,
    transition: "height 250ms ease-in-out",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
        height: LAYOUT_CONSTANT.mobileHeaderHeight,
    },
})); // ==============================================================

// ==============================================================
const Header = ({infomation, isFixed, className, searchBoxType = "type1" }:{infomation?:AppInfomation | undefined, isFixed?:boolean | false, className?:string | undefined,searchBoxType?:string}) => {
    const theme = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidenavOpen, setSidenavOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const downMd = useMediaQuery(theme.breakpoints.down(1150));
    const { account } = useAccountContext();
    const { shopCarts } = useStore();
    let cartLength = 0;
    if(infomation !== undefined){
        cartLength = shopCarts[infomation.domain]?.reduce((total, curr) => (total += curr.qty),0);
    }else{
        for (const key in shopCarts) {
            cartLength += shopCarts[key]?.reduce((total, curr) => (total += curr.qty),0);
        }
    }
    const router = useRouter();
    const logoShop = infomation ? infomation.logo : APP_INFOMATION.logo;
    const curLang = infomation ? infomation.language+'/' : '';
    const curDomain = curLang + (infomation ? infomation.domain : '/');
    const toggleDialog = () => {
        if (!account){
            setDialogOpen(!dialogOpen);
        }else{
            router.push('/'+curDomain+'/account');
        }
    };
    useEffect(() => {
        if (window.location.hash !== '' && window.location.hash.replace(/\?.*/, '') === '#login' && !account){
            setDialogOpen(!dialogOpen);
        }
    }, []);
    const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

    return (
        <HeaderWrapper className={clsx(className)}>
            <Container
                sx={{
                    gap: 2,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <FlexBox
                    mr={2}
                    minWidth="170px"
                    alignItems="center"
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        justifyContent: 'center'
                    }}
                >
                    <Link href={curDomain ? '/'+curDomain : '/'}>
                        <Image height={70} src={logoShop} alt="logo" />
                    </Link>

                    {isFixed && (
                        <CategoryMenu>
                            <FlexBox color="grey.600" alignItems="center" ml={2}>
                                <Button color="inherit">
                                    <Category fontSize="small" color="inherit" />
                                    <KeyboardArrowDown fontSize="small" color="inherit" />
                                </Button>
                            </FlexBox>
                        </CategoryMenu>
                    )}
                </FlexBox>

                <FlexBox justifyContent="center" flex="1 1 0">
                    {searchBoxType === "type1" && <SearchBox />}
                    {searchBoxType === "type2" && <GrocerySearchBox />}
                </FlexBox>

                <FlexBox
                    alignItems="center"
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                    }}
                >
                    <Box
                        component={IconButton}
                        p={1.25}
                        bgcolor="grey.200"
                        onClick={toggleDialog}
                    >
                        <PersonOutline />
                    </Box>

                    <Badge badgeContent={cartLength} color="primary">
                        <Box
                            ml={2.5}
                            p={1.25}
                            bgcolor="grey.200"
                            component={IconButton}
                            onClick={toggleSidenav}
                        >
                            <ShoppingBagOutlined />
                        </Box>
                    </Badge>
                </FlexBox>
                <Dialog
                    scroll="body"
                    open={dialogOpen}
                    fullWidth={isMobile}
                    onClose={toggleDialog}
                >
                    <Login />
                </Dialog>
                <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
                    { infomation !== undefined ? (<ShopCart toggleSidenav={() => {}} />) : (<HomeCart toggleSidenav={() => {}} />) }
                </Drawer>

                {downMd && <MobileMenu />}
            </Container>
        </HeaderWrapper>
    );
};

export default Header;
