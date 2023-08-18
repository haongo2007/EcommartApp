"use client"
import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Span } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import ProductViewDialog from "components/product/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { useStore } from "stores";
import useCurrency from "hooks/useCurrency";

const StyledBazaarCard = styled(BazaarCard)(() => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const HoverIconWrapper = styled(Box)(() => ({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
})); // ========================================================

// ========================================================
const ProductCard1 = ({product}) => {
  const {id,slug,price,rating_count,hideRating,hoverEffect,brand,showProductSize,promotion} = product;
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const shopName = useStore((state) => state.shopInfo.domain);
  const locale = useStore((state) => state.shopLocale.language);
  const {shopCarts,setCart} = useStore();
  const link = `/${locale}/${shopName}/product/${slug}`;

  const rating_point = product.rate_point / product.rate_count;
  const description = product.description.filter((desc) => desc.lang === locale)[0];
  const imgUrl = product.images[0];

  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const cartItem = shopCarts[shopName]?.find((item) => item.slug === slug);
  const { enqueueSnackbar } = useSnackbar();
  const handleCartAmountChange = (amount, item) => () => {
    const cloneProduct = {...item};
    cloneProduct['qty'] = amount;
    cloneProduct['variant'] = {};
    cloneProduct['finalPrice'] = {};

    setCart(cloneProduct);
    enqueueSnackbar("Update Cart Success", {
      variant: "success",
    });
  };

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {promotion.length > 0 && (
          <StyledChip color="primary" size="small" label={`${promotion[0].discount_percent}% off`} />
        )}

        <HoverIconWrapper className="hover-box">
          <IconButton onClick={toggleDialog}>
            <RemoveRedEye color="disabled" fontSize="small" />
          </IconButton>

          <IconButton onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
          </IconButton>
        </HoverIconWrapper>

        <Link href={link}>
            <LazyImage
              src={imgUrl}
              width={0}
              height={0}
              layout="responsive"
              alt={description.name}
            />
        </Link>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          description,
          price,
          promotion,
          id,
          slug,
          brand,
          rating_point,
          rating_count,
          imgGroup: [imgUrl, imgUrl],
        }}
      />

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={link}>
                <H3
                  mb={1}
                  title={description.name}
                  fontSize="14px"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                >
                  {description.name}
                </H3>
            </Link>

            {!hideRating && (
              <BazaarRating value={rating_point || 0} color="warn" readOnly />
            )}

            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                {showProductSize}
              </Span>
            )}

            <FlexBox alignItems="center" gap={1} mt={0.5}>
              <Box fontWeight="600" color="primary.main">
                {useCurrency(price,promotion)}
              </Box>

              {promotion.length > 0 ? (
                <Box color="grey.600" fontWeight="600">
                  <del>{useCurrency(price)}</del>
                </Box>
              ) : null}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{
                padding: "3px",
              }}
              onClick={handleCartAmountChange((cartItem?.qty || 0) + 1, product)}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={handleCartAmountChange((cartItem?.qty || 0) - 1, product)}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard1;
