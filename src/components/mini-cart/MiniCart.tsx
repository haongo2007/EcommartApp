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
import {useSnackbar} from "notistack"; // =========================================================

// =========================================================
const MiniCart = ({ toggleSidenav}) => {
  const { palette } = useTheme();
  const { cartItems, setCartItems } = useCartContext();
  const cartList = cartItems;
  const shopName = 'bepetshop'
  const curCurrency = 'VNĐ';
  const currencies = [
    {
      id:1,
      code:'$',
      name:'USD'
    },
    {
      id:2,
      code:'đ',
      name:'VNĐ'
    }
  ]
  const defaultCurrency = 'VNĐ';
  // const { locale } = useRouter();
  const locale = 'vi';
  const { enqueueSnackbar } = useSnackbar();

  const handleCartAmountChange = (amount, item) => () => {
    // const cloneProduct = {...item};
    // cloneProduct['qty'] = amount;
    // cartDispatch({
    //   type: "CHANGE_CART_AMOUNT",
    //   payload: cloneProduct,
    // });
    // enqueueSnackbar("Update Cart Success", {
    //   variant: "success",
    // });
  };
  const getProductImage = (cartItems:any) => {
    if (cartItems.hasOwnProperty('variant')){
      for (var key in cartItems.variant) {
        if (cartItems.variant[key].hasOwnProperty('images') && cartItems.variant[key].images !== '') {
          return cartItems.variant[key].images.split(',')[0];
        }
      }
    }
    return cartItems.images.split(',')[0];
  }
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + (Object.keys(item.finalPrice).length > 0 ? item.finalPrice.price : item.price) * item.qty, 0);
  };

  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartList.length ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartList.length} item
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList.length && (
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

        {cartList.map((item,ind) => (
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
                disabled={item.qty === 1}
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

            <Link legacyBehavior href={`/${shopName}/product/${item.slug}`}>
              <a>
                <Avatar
                  alt={item.slug}
                  src={getProductImage(item)}
                  sx={{
                    mx: 2,
                    width: 76,
                    height: 76,
                  }}
                />
              </a>
            </Link>

            <Box
              flex="1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link legacyBehavior href={`/${shopName}/product/${item.slug}`}>
                <a>
                  <H5 ellipsis fontSize="14px" className="title">
                    {item.description.filter((desc) => locale === desc.lang)[0].name}
                  </H5>
                </a>
              </Link>

              <Tiny color="grey.600">
                {Object.keys(item.finalPrice).length > 0 ? item.finalPrice.withSym : currency(currencies,curCurrency,defaultCurrency,item.price)} x {item.qty}
              </Tiny>

              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                {currency(currencies,curCurrency,defaultCurrency,( (Object.keys(item.finalPrice).length > 0 ? item.finalPrice.price : item.price) * item.qty))}
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
        ))}
      </Box>

      {!!cartList.length && (
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
              Checkout Now ({getTotalPrice()})
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
      )}
    </Box>
  );
};

export default MiniCart;
