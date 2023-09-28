import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  useTheme,  
  ListItemButton, 
  List,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Add, Close, Remove } from "@mui/icons-material";
import LazyImage from "../LazyImage";
import { FlexBox } from "../flex-box";
import { H3, H5, Tiny } from "../Typography";
import ShoppingBagOutlined from "../icons/ShoppingBagOutlined";
import {useSnackbar} from "notistack";
import { useStore } from "stores";
import useCurrency from "hooks/useCurrency";
import { CartItemProps } from "types/types";
import { Fragment } from "react";
import { useRouter } from 'next/navigation'
  // =========================================================

  const HomeCart = ({ toggleSidenav}) => {
  const { palette } = useTheme();
  const { shopLocale } = useStore((state) => state);
  const { shopInfo } = useStore((state) => state);
  const { setCart,shopCarts } = useStore();
  const locale = shopLocale.language;
  const { enqueueSnackbar } = useSnackbar();
  const cartLength = Object.keys(shopCarts).map((shop,ind) => {
    return shopCarts[shop]?.reduce((total, curr) => (total += curr.qty), 0) || 0;
  }).reduce((total, num) => total + num, 0);
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
      images: item.images,
      shopName: item.shopName
    };
    setCart(ProductItem);
    enqueueSnackbar("Update Cart Success", {
      variant: "success",
    });
  };
  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartLength ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            { cartLength } item
          </Box>
        </FlexBox>

        <Divider />

        { cartLength == 0 && (
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
        {
          shopCarts && Object.keys(shopCarts).length > 0 && Object.keys(shopCarts).map((nameShop,keys) => 
            (<Box key={keys}>
            <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}>
              <Link href={`/${locale}/${nameShop}`}>
                <ListItemButton sx={{ padding: "8px 20px" }}>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <Fragment>
                        <H3>
                          {nameShop}
                        </H3>
                      </Fragment>
                    }/>
                </ListItemButton>
              </Link>
            </List>
            
            <List component="div" disablePadding>
              {shopCarts[nameShop].length ? shopCarts[nameShop].map((item,ind) => (
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
      
                  <Link href={`${locale}/${nameShop}/product/${item.slug}`}>
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
                    <Link href={`${locale}/${nameShop}/product/${item.slug}`}>
                        <H5 ellipsis fontSize="14px" className="title">
                          {item.description.filter((desc) => locale === desc.lang)[0].name}
                        </H5>
                    </Link>
      
                    <Tiny color="grey.600">
                      { useCurrency(item.finalPrice,null,shopLocale,shopInfo)} x {item.qty}
                    </Tiny>
      
                    <Box
                      fontWeight={600}
                      fontSize="14px"
                      color="primary.main"
                      mt={0.5}
                    >
                      { useCurrency(item.finalPrice * item.qty,null,shopLocale,shopInfo) }
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
              )) : null}
            </List>
            </Box>)
          )
        }
      </Box>
    </Box>
  );
};
  
  export default HomeCart;
  