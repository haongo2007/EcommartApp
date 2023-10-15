"use client"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import Box from '@mui/material/Box';
import { ShopCategories } from '@prisma/client';
import appIcons from 'components/client/icons';
import { styled } from '@mui/material';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    "& .MuiBreadcrumbs-ol" : {
        justifyContent: 'end',
        "& a" : {
            display: "flex",
            alignItems: "center",
            "&:hover": {
                textDecoration: 'underline'
            },
        },
    },
}));

export default function BreadCrumbs({data,current,locale,domain}:{data: ShopCategories[]|undefined,current:ShopCategories,locale:string,domain:string}) {
    const getTitle = (description) => {
        return description.filter((item) => item.lang === locale)[0].title;
    }
    let SvgIcon = '';
    let SvgCurrentIcon = '';
    if(current.icon !== '' && current.icon !== null){
        SvgCurrentIcon = appIcons[current.icon];
    }
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <StyledBreadcrumbs maxItems={3} aria-label="breadcrumb">
                <Link color="inherit" href={`/${locale}/${domain}/category`} >
                    <OtherHousesOutlinedIcon fontSize="inherit" sx={{mr: 0.5}} />
                    Category
                </Link>
                {
                    data && data.map((item) => {
                        if(item.icon !== '' && item.icon !== null){
                            SvgIcon = appIcons[item.icon];
                        }
                        return (
                            <Link color="inherit" href={`/${locale}/${domain}/category/${item.alias}`} >
                                {item.icon && (<SvgIcon fontSize="inherit" sx={{mr: 0.5}} />) }
                                {getTitle(item.description)}
                            </Link>
                        )
                    })
                }
                
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    {current.icon && (<SvgCurrentIcon fontSize="inherit" sx={{mr: 0.5}} />) }
                    {getTitle(current.description)}
                </Typography> 

                {/* <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    MUI
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Core
                </Link>
                */}
            </StyledBreadcrumbs>
        </Box>
    );
}
