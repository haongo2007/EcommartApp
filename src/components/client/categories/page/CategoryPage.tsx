"use client"
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import { MobileNavigationBar } from "components/mobile-navigation";
import CategoryImageBox from "./CategoryImageBox";
import appIcons from "components/icons";
import { ShopCategories } from "@prisma/client";

export default function MobileCategoryNav({domain,locale,allCategories}:{domain:string,locale:string,allCategories:ShopCategories[] | []}){
    const [categorySelected, setCategorySelected] = useState({});
    const rootCategories = allCategories.filter((item) => item.parent === 0);

    const suggestion = [
        {
            title: "Belt",
            href: "/belt",
            imgUrl: "/assets/images/products/categories/belt.png",
        },
        {
            title: "Hat",
            href: "/Hat",
            imgUrl: "/assets/images/products/categories/hat.png",
        },
        {
            title: "Watches",
            href: "/Watches",
            imgUrl: "/assets/images/products/categories/watch.png",
        },
        {
            title: "Sunglasses",
            href: "/Sunglasses",
            imgUrl: "/assets/images/products/categories/sunglass.png",
        },
        {
            title: "Sneakers",
            href: "/Sneakers",
            imgUrl: "/assets/images/products/categories/sneaker.png",
        },
        {
            title: "Sandals",
            href: "/Sandals",
            imgUrl: "/assets/images/products/categories/sandal.png",
        },
        {
            title: "Formal",
            href: "/Formal",
            imgUrl: "/assets/images/products/categories/shirt.png",
        },
        {
            title: "Casual",
            href: "/Casual",
            imgUrl: "/assets/images/products/categories/t-shirt.png",
        },
    ];
    const handleCategoryClick = (item) => () => {
        const childItems = allCategories.filter((cat) => cat.parent === item.id);
        item['children'] = childItems;
        setCategorySelected(item);
    };

    const getTitle = (description) => {
        return description.filter((item) => item.lang === locale)[0].title;
    }

    let SvgIcon = '';
    return (
        <CategoryMobileStyle>
            <Box className="main-category-holder">
                {rootCategories.map((item) => {
                    if(item.icon !== '' && item.icon !== null){
                      SvgIcon = appIcons[item.icon];
                    }
                    return (<Box
                        key={getTitle(item.description)}
                        className="main-category-box"
                        onClick={handleCategoryClick(item)}
                        borderLeft={`${item?.selected === true ? "3" : "0"}px solid`}
                    >
                        {item.icon && <SvgIcon fontSize="small" color="inherit" sx={{fontSize: "28px", mb: "0.5rem",}}/>}
                        <Typography
                        className="ellipsis"
                        textAlign="center"
                        fontSize="11px"
                        lineHeight="1"
                        >
                        {getTitle(item.description)}
                        </Typography>
                    </Box>)
                })}
            </Box>

            <Box className="container">
                {/* <Typography fontWeight="600" fontSize="15px" mb={2}>
                Recommended Categories
                </Typography> */}

                {/* <Box mb={4}>
                    <Grid container spacing={3}>
                        {suggestedList.map((item, ind) => (
                        <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                            <Link href="/product/search/423423">
                                <CategoryMenuImageBox {...item} />
                            </Link>
                        </Grid>
                        ))}
                    </Grid>
                </Box> */}

                {categorySelected.hasOwnProperty('children') ? (
                    categorySelected.children.map((item, ind) => {
                        return (
                            <Fragment key={ind}>
                                <Divider />
                                <Accordion>
                                    <AccordionHeader px={0} py={1.25}>
                                        <Typography fontWeight="600" fontSize="15px">
                                            {getTitle(item.description)}
                                        </Typography>
                                    </AccordionHeader>

                                    <Box mb={4} mt={1}>
                                        <Grid container spacing={3}>
                                            {/* {item.children?.map((item, ind) => (
                                            <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                                                <Link href="/product/search/423423" >
                                                    <CategoryImageBox {...item} />
                                                </Link>
                                            </Grid>
                                            ))} */}
                                        </Grid>
                                    </Box>
                                </Accordion>
                            </Fragment>
                        )
                    })
                ) : (<></>)}
            </Box>

            <MobileNavigationBar locale={locale} domain={domain}/>
        </CategoryMobileStyle>
    );
};
