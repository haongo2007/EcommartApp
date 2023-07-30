import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import LazyImage from "../LazyImage";
import { FlexBox } from "../flex-box";
import { H5, Tiny } from "../Typography";
import ShoppingBagOutlined from "../icons/ShoppingBagOutlined";
import {useCartContext} from "../../providers/CartContextProvider";
import {useSnackbar} from "notistack";
import { useStore } from "stores";
import useCurrency from "hooks/useCurrency";
import { CartItemProps } from "types/types";

// =========================================================
const MiniCart = ({ toggleSidenav}) => {
  const { palette } = useTheme();
  const { cartItems, setCartItems } = useCartContext();
  const locale = useStore((state) => state.shopLocale.language);
  const shopName = useStore((state) => state.shopInfo.domain);
  const { enqueueSnackbar } = useSnackbar();

  const handleCartAmountChange = (amount, item) => () => {
    const ProductItem :CartItemProps = {
      id:item.id,
      qty:amount,
      variant:item.variant,
      slug:item.slug,
      price: item.price,
      promotion: item.promotion,
      description: item.description,
      finalPrice: item.finalPrice,
      images: item.images
    };
    setCartItems({
      type: "CHANGE_CART_AMOUNT",
      payload: ProductItem,
    });
    enqueueSnackbar("Update Cart Success", {
      variant: "success",
    });
  };
  const getTotalPrice = () => {
    return cartItems.reduce((accum, item) => accum + item.finalPrice * item.qty, 0);
  };

  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartItems.length ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartItems.length} item
          </Box>
        </FlexBox>

        <Divider />

        {!cartItems.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              width={90}
              height={100}
              alt="banner"
              src="/assets/images/logos/shopping-bag.svg"
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}

        {cartItems.length ? cartItems.map((item,ind) => (
          <FlexBox
            py={2}
            px={2.5}
            key={ind}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <Button
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </Button>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <Button
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </Button>
            </FlexBox>

            <Link href={`${locale}/${shopName}/product/${item.slug}`}>
                <Avatar
                  alt={item.slug}
                  src={item.images[0]}
                  sx={{
                    mx: 2,
                    width: 76,
                    height: 76,
                  }}
                />
            </Link>

            <Box
              flex="1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link href={`${locale}/${shopName}/product/${item.slug}`}>
                  <H5 ellipsis fontSize="14px" className="title">
                    {item.description.filter((desc) => locale === desc.lang)[0].name}
                  </H5>
              </Link>

              <Tiny color="grey.600">
                {useCurrency(item.finalPrice)} x {item.qty}
              </Tiny>

              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                { useCurrency(item.finalPrice * item.qty) }
              </Box>
            </Box>

            <IconButton
              size="small"
              onClick={handleCartAmountChange(0, item)}
              sx={{
                marginLeft: 2.5,
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </FlexBox>
        )) : null }
      </Box>

      {cartItems.length ? (
        <Box p={2.5}>
          <Link href="/checkout-alternative" passHref>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{
                mb: "0.75rem",
                height: "40px",
              }}
              onClick={toggleSidenav}
            >
              Checkout Now ({useCurrency(getTotalPrice())})
            </Button>
          </Link>

          <Link href="/cart" passHref>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              sx={{
                height: 40,
              }}
              onClick={toggleSidenav}
            >
              View Cart
            </Button>
          </Link>
        </Box>
      ) : null}
    </Box>
  );
};

export default MiniCart;
