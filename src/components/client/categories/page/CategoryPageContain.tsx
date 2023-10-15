"use client"
import { ShopCategories, ShopProductCategories } from "@prisma/client";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import Link from "next/link";
import CategoryImageBox from "./CategoryImageBox";
import FlexBetween from "components/client/flex-box/FlexBetween";
import { Span } from "components/client/Typography";
import ProductCard1 from "components/client/product-cards/ProductCard1";
import { useState } from "react";
import { useStore } from "stores";
import { find } from "lodash-es";
import { renderProductCount } from "helpers/paginate";
import { publish } from "helpers/event";

type CategoryPageProps = {
    domain:string,
    locale:string,
    categories?:ShopCategories[] | undefined,
    childCategories?:ShopCategories[] | undefined,
    suggestionCategory?:ShopCategories[] | undefined,
    products: ShopProductCategories[]
}
export default function CategoryPageContain({domain,locale,categories,childCategories,suggestionCategory,products}: CategoryPageProps){
    const [page, setPage] = useState(1);
    const {shopConfig} = useStore();
    const PRODUCT_PER_CATEGORY_PAGE = find(shopConfig, { key: 'product_perpage', code: 'category_display' });
    const handlePageChange = (page) => {

    }
    if(childCategories){
        publish('eventGetCategoriesChild',childCategories);
    }
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            { suggestionCategory && (
                <>
                    <Typography fontWeight="600" fontSize="16px" mb={2}>
                        Recommended Categories
                    </Typography> 
                    <Box mb={4}>
                        <Grid container spacing={2} sx={{alignItems:"end"}}>
                            {suggestionCategory?.map((item, ind) => {
                                const title = item.description.filter((desc) => desc.lang === locale)[0].title;
                                return (
                                    <Grid item key={ind} sx={{minWidth:"150px"}}>
                                        <Link href={`/${locale}/${domain}/category/${item.alias}`}>
                                            <CategoryImageBox image={item.image} icon={item.icon} title={title}/>
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </>
            )}
            <Box mb={4}>
                {/* PRODUCT LIST AREA */}
                <Grid container spacing={2}>
                    {products.map((item,index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2} minWidth={200}>
                            <ProductCard1 product={item.product}/>
                        </Grid>
                    ))}
                </Grid>

                {/* PAGINATION AREA */}
                <FlexBetween flexWrap="wrap" my={8}>
                    <Pagination
                        page={page}
                        color="primary"
                        variant="outlined"
                        onChange={handlePageChange}
                        count={Math.ceil(3 / PRODUCT_PER_CATEGORY_PAGE?.value)}
                    />
                    <Span>
                        {renderProductCount(page, PRODUCT_PER_CATEGORY_PAGE?.value, 3)}
                    </Span>
                </FlexBetween>
            </Box>

        </Box>
    );
};
