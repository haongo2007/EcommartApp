import Link from "next/link";
import { Add, Remove, FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Rating,
  styled,
} from "@mui/material";
import Image from "components/client/BazaarImage";
import { H5, Span } from "components/client/Typography";
import { FlexBetween, FlexBox } from "components/client/flex-box";
import { calculateDiscount, currency } from "lib"; // styled components
import { useCartContext } from "providers/CartProvider";

const Wrapper = styled(Card)(() => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
})); // ===========================================================

// ===========================================================
const ProductCard9 = (props) => {
  const { imgUrl, title, price, off, rating, id, slug } = props;
  const { cartState, cartDispatch } = useCartContext();
  const cartItem = cartState.cart.find((item) => item.slug === slug);

  const handleCartAmountChange = (amount) => () => {
    cartDispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        name: title,
        qty: amount,
        price,
        imgUrl,
        id,
        slug,
      },
    });
  };

  return (
    <Wrapper>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 15,
          right: 15,
        }}
      >
        <FavoriteBorder fontSize="small" />
      </IconButton>

      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Box position="relative">
            {!!off && (
              <Chip
                size="small"
                color="primary"
                label={`${off}% off`}
                sx={{
                  top: 15,
                  left: 15,
                  px: "5px",
                  fontSize: 10,
                  fontWeight: 600,
                  position: "absolute",
                }}
              />
            )}

            <Image src={imgUrl} alt={title} width="100%" />
          </Box>
        </Grid>

        <Grid item sm={9} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p={2}
          >
            <Link href={`/product/${slug}`}>
                <H5 fontWeight="600" my="0.5rem">
                  {title}
                </H5>
            </Link>

            <Rating value={rating || 0} color="warn" readOnly />

            <FlexBox mt={1} mb={2} alignItems="center">
              <H5 fontWeight={600} color="primary.main" mr={1}>
                {currency(price)}
              </H5>

              {off && (
                <Span fontWeight="600" color="grey.600">
                  <del>{calculateDiscount(price, off)}</del>
                </Span>
              )}
            </FlexBox>

            <FlexBox>
              {!cartItem?.qty && (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    height: 32,
                  }}
                  onClick={handleCartAmountChange(1)}
                >
                  Add To Cart
                </Button>
              )}

              {!!cartItem?.qty && (
                <FlexBetween>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      padding: "5px",
                    }}
                    onClick={handleCartAmountChange(cartItem.qty + 1)}
                  >
                    <Add fontSize="small" />
                  </Button>

                  <H5 fontWeight="600" fontSize="15px" mx={1.5}>
                    {cartItem.qty}
                  </H5>

                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      padding: "5px",
                    }}
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>
                </FlexBetween>
              )}
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default ProductCard9;
