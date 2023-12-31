import { Add, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { FlexBox } from "components/client/flex-box";
import BazaarImage from "components/client/BazaarImage";
import BazaarRating from "components/client/BazaarRating";
import Carousel from "components/client/carousel/Carousel";
import { H1, H2, H3, H4, H6, Paragraph } from "components/client/Typography";
import useCurrency from "hooks/useCurrency";
import { arrowButtonStyle } from "../../../constants";
import { useStore } from "stores";

const ContentWrapper = styled(Box)(({ theme }) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1,
      left: 10,
    },
    "& .carousel__next-button": {
      opacity: 1,
      right: 10,
    },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": {
      color: theme.palette.grey[500],
    },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": {
    left: 0,
  },
  "& .carousel__next-button": {
    right: 0,
  },
})); // =====================================================

// =====================================================
const ProductViewDialog = (props) => {
  const { product, openDialog, handleCloseDialog } = props;
  const { price,promotion,brand,description,imgGroup } = product;
  const getShopCarts = useStore((state) => state.shopCarts[state.shopInfo.domain]);
  const cartItem = getShopCarts?.find((item) => item.id === product.id);
  const handleCartAmountChange = (amount) => () => {
    // setCartItems({});
  };

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{
        zIndex: 1501,
      }}
    >
      <DialogContent
        sx={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel 
                totalSlides={imgGroup.length} 
                visibleSlides={1}
                infinite={true}
                leftButtonStyle={arrowButtonStyle}
                rightButtonStyle={arrowButtonStyle}
                >
                {imgGroup.map((item, index) => (
                  <BazaarImage
                    key={index}
                    src={item}
                    sx={{
                      mx: "auto",
                      width: "100%",
                      objectFit: "contain",
                      height: {
                        sm: 400,
                        xs: 250,
                      },
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{description.name}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                Brand: {brand.name}
              </Paragraph>


                <H1 color="primary.main">
                  {useCurrency(price,promotion)}
                </H1>

                {promotion.length > 0 ? (
                  <H4 color="grey.600">
                    <del>{useCurrency(price)}</del>
                  </H4>
                ) : null}

              <FlexBox alignItems="center" gap={1}>
                <BazaarRating
                  color="warn"
                  fontSize="1.25rem"
                  value={product.rating_point}
                  readOnly
                />
                <H6 lineHeight="1">({product.rating_count || 0})</H6>
              </FlexBox>

              <Paragraph my={2}>
                {product.description.description}
              </Paragraph>

              <Divider
                sx={{
                  mb: 2,
                }}
              />

              {!cartItem?.qty ? (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCartAmountChange(1)}
                  sx={{
                    height: 45,
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <FlexBox alignItems="center">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      p: ".6rem",
                      height: 45,
                    }}
                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      p: ".6rem",
                      height: 45,
                    }}
                    onClick={handleCartAmountChange(cartItem?.qty + 1)}
                  >
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>
              )}
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
