"use client"
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import { MobileNavigationBar } from "components/mobile-navigation";
import CategoryMenuImageBox from "./CategoryMenuImageBox";
import CategoryMenuNavStyle from "./CategoryMenuNavStyle";
import { useStore } from "stores";
import appIcons from "components/icons";

export default function MobileCategoryNav({domain,locale}:{domain:string,locale:string}){
    const [category, setCategory] = useState(null);
    const [suggestedList, setSuggestedList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    
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
    const handleCategoryClick = (cat) => () => {
        let menuData = cat.menuData;
        if (menuData) setSubCategoryList(menuData.categories || menuData);
        else setSubCategoryList([]);
        setCategory(cat);
    };

     useEffect(() => setSuggestedList(suggestion), []);
  
    const shopCategory = useStore((state) => state.shopCategory[domain]);
    let SvgIcon = '';
    return (
        <CategoryMenuNavStyle>

            <Box className="main-category-holder">
                {shopCategory.map((item) => {
                    if(item.icon !== '' && item.icon !== null){
                      SvgIcon = appIcons[item.icon];
                    }
                    const title = item.description.filter((item) => item.lang === locale)[0].title;
                    return (<Box
                        key={title}
                        className="main-category-box"
                        onClick={handleCategoryClick(item)}
                        borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
                    >
                        {item.icon && <SvgIcon fontSize="small" color="inherit" sx={{fontSize: "28px", mb: "0.5rem",}}/>}
                        <Typography
                        className="ellipsis"
                        textAlign="center"
                        fontSize="11px"
                        lineHeight="1"
                        >
                        {title}
                        </Typography>
                    </Box>)
                })}
            </Box>

            <Box className="container">
                <Typography fontWeight="600" fontSize="15px" mb={2}>
                Recommended Categories
                </Typography>

                <Box mb={4}>
                <Grid container spacing={3}>
                    {suggestedList.map((item, ind) => (
                    <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                        <Link href="/product/search/423423" legacyBehavior>
                        <a>
                            <CategoryMenuImageBox {...item} />
                        </a>
                        </Link>
                    </Grid>
                    ))}
                </Grid>
                </Box>

                {category?.menuComponent === "MegaMenu1" ? (
                subCategoryList.map((item, ind) => (
                    <Fragment key={ind}>
                    <Divider />
                    <Accordion>
                        <AccordionHeader px={0} py={1.25}>
                        <Typography fontWeight="600" fontSize="15px">
                            {item.title}
                        </Typography>
                        </AccordionHeader>

                        <Box mb={4} mt={1}>
                        <Grid container spacing={3}>
                            {item.subCategories?.map((item, ind) => (
                            <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                                <Link href="/product/search/423423" legacyBehavior>
                                <a>
                                    <CategoryMenuImageBox {...item} />
                                </a>
                                </Link>
                            </Grid>
                            ))}
                        </Grid>
                        </Box>
                    </Accordion>
                    </Fragment>
                ))
                ) : (
                <Box mb={4}>
                    <Grid container spacing={3}>
                    {subCategoryList.map((item, ind) => (
                        <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                        <Link href="/product/search/423423" legacyBehavior>
                            <a>
                            <CategoryMenuImageBox {...item} />
                            </a>
                        </Link>
                        </Grid>
                    ))}
                    </Grid>
                </Box>
                )}
            </Box>

            <MobileNavigationBar locale={locale} domain={domain}/>
        </CategoryMenuNavStyle>
    );
};
