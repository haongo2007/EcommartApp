"use client"
import { Favorite } from "@mui/icons-material";
import { Button, Grid, Pagination } from "@mui/material";
import AccountHeader from "components/client/account/AccountHeader";
import { FlexBox } from "components/client/flex-box";
import ProductCard1 from "components/client/product-cards/ProductCard1";
import { useState } from "react";

// ==============================================================
const WishListDashboard = ({locale,domain}:{locale:string,domain:string}) => {
  const [currentPage, setCurrentPage] = useState(1); // HANDLE CHANGE PAGINATION

  const handleChangePage = (page) => {
    // setCurrentPage(page);
    // router.push(`?page=${page}`);
  }; // SECTION HEADER TITLE LINK
  const products = [];
  const totalProducts = 10;
  
  const HEADER_BUTTON = (
    <Button
      color="primary"
      sx={{
        px: 4,
        bgcolor: "primary.light",
      }}
    >
      Add All to Cart
    </Button>
  );
  return (
    <>
      {/* TOP HEADER AREA */}
      <AccountHeader
        icon={Favorite}
        title="My Wish List"
        button={HEADER_BUTTON}
      />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          color="primary"
          variant="outlined"
          page={currentPage}
          count={Math.ceil(totalProducts / 6)}
          onChange={(_, page) => handleChangePage(page)}
        />
      </FlexBox>
    </>
  );
};

export default WishListDashboard;
