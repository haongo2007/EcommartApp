"use client"
import appIcons from "components/icons";
import { ShopCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LAYOUT_CONSTANT } from "../../../constants";
import { subscribe } from "helpers/event";
import SaleNavbar from "components/navbar/SaleNavbar";
import { usePathname } from 'next/navigation'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
type CategoriesPageProps = {
    domain:string,
    locale:string,
    categories?:ShopCategories[] | undefined,
    childCategories?:ShopCategories[] | undefined,
}

const drawerWidth = 240;

export default function CategoryPageSideBar({domain,locale,categories,childCategories}:CategoriesPageProps){
    const router = useRouter();
    const theme = useTheme();
    const path = usePathname()?.split('/');
    const currentCat = path[path.length - 1];

    const [open, setOpen] = React.useState(false);
    const [topBar, setTopbar] = React.useState(LAYOUT_CONSTANT.headerHeight + LAYOUT_CONSTANT.topbarHeight);
    subscribe('eventStickyHeader',(e) => {
        if(e.detail){
            setTopbar(LAYOUT_CONSTANT.headerHeight)
        }else{
            setTopbar(LAYOUT_CONSTANT.headerHeight + LAYOUT_CONSTANT.topbarHeight)
        }
    })
    const handleCategoryClick = (item) => () => {
        if(item.alias === currentCat) return;
        router.push(`/${locale}/${domain}/category/${item.alias}`);
    };

    const getTitle = (description) => {
        return description.filter((item) => item.lang === locale)[0].title;
    }
    
    const IconTitle = (props) => {
        const hashing = props.text.split(' ');
        let result = '';
        for (let i = 0; i < hashing.length; i++) {
            result += hashing[i].charAt(0);
        }
        return (<>{result.toUpperCase()}</>);
    }
    let SvgIcon = '';
    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        top: `${topBar}px`,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });
    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        top: `${topBar}px`,
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        top: `${topBar}px`,
        background: theme.palette.background.paper,
        borderBottom:"1px solid #F6F9FC",
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
    }));
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{paddingLeft:"0px !important",paddingRight:"0px !important"}}>
                    <IconButton
                        color="default"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            margin:"auto 12px",
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    { childCategories && <SaleNavbar categories={childCategories} locale={locale} domain={domain}/> }
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {categories && categories.map((item, index) => {
                        if(item.icon !== '' && item.icon !== null){
                            SvgIcon = appIcons[item.icon];
                        }
                        const title :string = getTitle(item.description);
                        return (
                            <ListItem key={getTitle(item.description)} disablePadding sx={{ display: 'block',borderRight:`${currentCat === item.alias ? "3" : "0"}px solid`}}>
                                <ListItemButton
                                    onClick={handleCategoryClick(item)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon && (<SvgIcon fontSize="small" color="inherit" sx={{fontSize: "28px"}} />) }
                                        { !item.icon && !open && <IconTitle text={title} />}
                                    </ListItemIcon>
                                    <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                    )}
                </List>
            </Drawer>
        </>
    );
};
