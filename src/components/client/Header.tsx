"use client"
import Link from "next/link";
import { useCallback, useState } from "react";
import { Badge, Box, Button, Dialog, Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
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
import MobileSearch from "./navbar/MobileSearch";
import CategoryMenu from "./categories/menu/CategoryMenu";
import GrocerySearchBox from "./search-box/GrocerySearchBox";
import SearchBox from "./search-box/SearchBox";
import Category from "./icons/Category";
import ShoppingBagOutlined from "./icons/ShoppingBagOutlined";
import Login from "./sessions/Login";
import {LAYOUT_CONSTANT} from "../../constants";
import {useEffect} from "react";
import { AppInfomation } from "types/types";
import { useStore } from "../../stores";
import { useRouter } from "next/navigation";
import { useAccountContext } from "providers/AccountProvider";
import useCheckCatePage from "hooks/useCheckCatePage";
import { publish } from "helpers/event";
import Sticky from "./sticky";

type HeaderProps = {
    infomation: AppInfomation,
    dynamic: boolean,
    locale: string,
    className?:string | undefined,
    searchBoxType?:string
}

export const HeaderWrapper = styled(Box)(({ theme }) => ({
    zIndex: 3,
    position: "relative",
    height: LAYOUT_CONSTANT.headerHeight,
    transition: "height 250ms ease-in-out",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
        height: LAYOUT_CONSTANT.mobileHeaderHeight,
    },
}));

// ==============================================================
const Header = ({infomation,locale,dynamic = true,className,searchBoxType = "type1"}:HeaderProps) => {
    const theme = useTheme();
    const [isFixed, setIsFixed] = useState(false);
    const toggleIsFixed = useCallback((fixed:boolean) => {
        setIsFixed(fixed);
        publish('eventStickyHeader',fixed);
    }, []);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidenavOpen, setSidenavOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const downMd = useMediaQuery(theme.breakpoints.down(1150));
    const { account } = useAccountContext();
    const { shopCarts,shopCategory } = useStore();
    let cartLength = 0;
    if(dynamic){
        cartLength = shopCarts[infomation.domain]?.reduce((total, curr) => (total += curr.qty),0);
    }else{
        for (const key in shopCarts) {
            cartLength += shopCarts[key]?.reduce((total, curr) => (total += curr.qty),0);
        }
    }
    const router = useRouter();
    const curDomain = '/'+locale +'/'+ infomation.domain;
    const toggleDialog = () => {
        if (!account){
            setDialogOpen(!dialogOpen);
        }else{
            router.push(curDomain+'/account');
        }
    };
    useEffect(() => {
        if (window.location.hash !== '' && window.location.hash.replace(/\?.*/, '') === '#login' && !account){
            setDialogOpen(!dialogOpen);
        }
    }, []);
    const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

    return (
        <Sticky fixedOn={0} scrollDistance={0} onSticky={toggleIsFixed}>
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
                                md: "flex",
                                sm: "flex",
                                xs: "flex",
                            },
                            justifyContent: 'center'
                        }}
                    >
                        <Link href={curDomain}>
                            <Image height={70} src={infomation.logo} alt="logo" loading="lazy"/>
                        </Link>
                        
                        { !useCheckCatePage() && isFixed && !downMd && (
                            <CategoryMenu categories={shopCategory} locale={locale}>
                                <FlexBox color="grey.600" alignItems="center" ml={2}>
                                    <Button color="inherit">
                                        <Category fontSize="small" color="inherit" />
                                        <KeyboardArrowDown fontSize="small" color="inherit" />
                                    </Button>
                                </FlexBox>
                            </CategoryMenu>
                        )}
                        { downMd && <MobileSearch/>}
                    </FlexBox>

                    { !downMd && 
                        <FlexBox 
                            justifyContent="center" 
                            flex="1 1 0">
                            {searchBoxType === "type1" && <SearchBox />}
                            {searchBoxType === "type2" && <GrocerySearchBox />}
                        </FlexBox>
                    }

                    <FlexBox
                        alignItems="center"
                        sx={{
                            display: {
                                md: "flex",
                            },
                        }}
                    >
                        {downMd && <MobileMenu />}
                        { dynamic &&
                            <Box
                                bgcolor="grey.200"
                                component={IconButton}
                                ml={2.5}
                                p={1}
                                onClick={toggleDialog}
                            >
                                <PersonOutline />
                            </Box>
                        }
                        <Badge badgeContent={cartLength} color="primary">
                            <Box
                                bgcolor="grey.200"
                                ml={2.5}
                                p={1}
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
                        { dynamic && <Login locale={locale} domain={infomation.domain}/> }
                    </Dialog>
                    <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{zIndex:1201}}>
                        { dynamic ? (<ShopCart toggleSidenav={() => {}} />) : (<HomeCart toggleSidenav={() => {}} />) }
                    </Drawer>
                </Container>
            </HeaderWrapper>
        </Sticky>
    );
};

export default Header;
