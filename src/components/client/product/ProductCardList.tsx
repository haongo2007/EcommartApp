"use client"
import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/client/flex-box";
import ProductCard1 from "components/client/product-cards/ProductCard1";
import { Span } from "components/client/Typography";

// ========================================================
const ProductCardList = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 product={item} />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>
  );
};

export default ProductCardList;
