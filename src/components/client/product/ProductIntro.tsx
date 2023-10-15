"use client"
import Link from "next/link";
import { useState } from "react";
import {Add, Done, Remove} from "@mui/icons-material";
import {Avatar, Box, Button, ButtonGroup, Chip, Grid} from "@mui/material";
import LazyImage from "components/client/LazyImage";
import BazaarRating from "components/client/BazaarRating";
import { H1, H2, H3, H6 } from "components/client/Typography";
import { FlexBox, FlexRowCenter } from "../flex-box";
import ProductVariant from "./ProductVariant";
import {isEqual} from "lodash";
import {useSnackbar} from "notistack";
import { useStore } from "stores";
import { ShopProduct } from "@prisma/client";
import useCurrency from "hooks/useCurrency";
import { CartItemProps } from "types/types";
import useCartSync from "hooks/useCartSync";
import { trpc } from "providers/trpcProvider";
import { useAccountContext } from "providers/AccountProvider";

// ================================================================
const ProductIntro = ({ product }: {product:ShopProduct}) => {
  const { account } = useAccountContext();
  const { id, stock, description, promotion, slug, price, rate_count, rate_point, images, brand, categories,attribute, store_id } = product;
  const locale = useStore((state) => state.shopLocale.language);
  const shopName = useStore((state) => state.shopInfo.domain);
  const attributeGroup = useStore((state) => state.shopAGroupP);
  const { setCart,shopCarts } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const prefixUrl = `/${locale}/${shopName}`;
  const imagesHash: any = images;
  const [PriceProduct, setPriceProduct] = useState(price);
  const [imageState, setImage] = useState([...imagesHash]);
  const [dsbAddCart, setDsbAddCart] = useState(true);
  const [variant, setVariant] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const cartItem = shopCarts[shopName]?.find((el) => el.id === id && isEqual(el.variant,variant)) || null;
  const title = description.filter((desc) => desc.lang === locale)[0].name;
  const handleImageClick = (ind) => () => setSelectedImage(ind);
  const { mutate: updateCart } = trpc.carts.updateCart.useMutation();
  const [syncCartTimer, setSyncCartTimer] = useState(0);
  const handleCartAmountChange = (amount: number) => () => {
    const ProductItem : CartItemProps =  {
                          id,
                          slug,
                          qty: amount,
                          variant,
                          price,
                          promotion,
                          description,
                          finalPrice: PriceProduct,
                          images: imageState,
                          store_id,
                          shopName
                      };
    setCart(ProductItem,syncCartTimer,setSyncCartTimer);
    enqueueSnackbar("Update Cart Success", {
      variant: "success",
    });
    if(account){
      useCartSync(shopCarts[shopName], account.id, syncCartTimer, setSyncCartTimer, updateCart);
    }
  };
  const handleAttributeCallback = (props) =>{
    setSelectedImage(0);
    let cloneAttr = {};
    let att_images = [];
    const varant_price = props[Object.keys(props)[Object.keys(props).length - 1]];
    if (varant_price !== undefined && parseFloat(varant_price.price) > 0){
      setPriceProduct(varant_price.price);
    }else{
      setPriceProduct(price);
    }
    for (const pKey in props) {
      if(props[pKey].images !== ''){
        att_images.push(props[pKey].images.split(','));
      }
      cloneAttr[pKey] = {...props[pKey]};
      if (cloneAttr[pKey].hasOwnProperty('expand')){
        delete cloneAttr[pKey]['expand'];
      }
    }
    att_images = [].concat.apply([], att_images);
    if (att_images.length > 0){
      setImage(att_images)
    }else{
      setImage(imagesHash)
    }
    if (Object.keys(attributeGroup).length === Object.keys(props).length){
      setDsbAddCart(false);
    }else{
      setDsbAddCart(true);
    }
    setVariant(cloneAttr)
  }
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              alt={title}
              width={300}
              height={300}
              loading="eager"
              objectFit="contain"
              src={imageState[selectedImage]}
            />
          </FlexBox>

          <FlexBox overflow="auto">
            {imageState.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === imageState.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  src={url}
                  variant="square"
                  sx={{
                    height: 40,
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>
          <Chip
            size="small"
            label={stock > 0 ? 'Stock Available' : 'Stock Unavailable' }
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color:  stock > 0 ? "success.900" : "error.900",
              backgroundColor: stock > 0 ? "success.100" :"error.100",
              marginBottom: 2,
            }}
          />
          { !!brand && (
            <FlexBox alignItems="center" mb={2}>
              <Box>Brand:</Box>
              <H6 ml={1}>{brand.name}</H6>
            </FlexBox>
          )}
          { categories.length > 0 ? (
            <FlexBox alignItems="center" mb={2}>
              <Box>Categories:</Box>
              {categories.map((item,i) => (
                <Link href={`/${prefixUrl}/category/${item.category.alias}`} passHref key={i} >
                    <H6 ml={1}>{item.category.description.filter((desc) => desc.lang === locale)[0].title},</H6>
                </Link>
              ))}
            </FlexBox>
          ) : ''}
          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={rate_point/rate_count}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">({rate_count})</H6>
          </FlexBox>

          <Box mb={3}>
            <Box color="grey.600" fontWeight="600">
              <H2 color="primary.main" mb={0.5} lineHeight="1">
                {useCurrency(PriceProduct,promotion)}
              </H2>
              {(promotion.length > 0 ? <del>{useCurrency(price)}</del> : null)}
            </Box>
          </Box>

          <ProductVariant handleCb={handleAttributeCallback} group={attributeGroup} attribute={attribute}/>

          {cartItem === null ? (
            <Button
              disabled={dsbAddCart}
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;