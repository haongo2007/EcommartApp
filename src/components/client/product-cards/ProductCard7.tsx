"use client"
import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useStore } from "stores";
import useCurrency from "hooks/useCurrency";
import { useSnackbar } from "notistack";
import { useAccountContext } from "providers/AccountProvider";
import useCartSync from "hooks/useCartSync";
import { CartItemProps } from "types/types";
import { useState } from "react";

const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
})); // =========================================================

// =========================================================
const ProductCard7 = ({product,updateCart}) => {
  const { id, description, finalPrice, store_id, price, promotion, images, slug, shopName, variant, qty } = product;
  const { account } = useAccountContext();
  const { shopLocale } = useStore((state) => state);
  const { shopInfo } = useStore((state) => state);
  const currentLang = useStore((state) => state.shopLocale.language);
  const { setCart,shopCarts } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const title = description.filter((item) => item.lang === currentLang)[0].name;
  const [syncCartTimer, setSyncCartTimer] = useState(0);
  const handleCartAmountChange = (amount) => () => {
    const ProductItem : CartItemProps =  {
        id,
        slug,
        qty: amount,
        variant,
        price,
        promotion,
        description,
        finalPrice,
        images,
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

  return (
    <Wrapper>
      <Image
        alt={title}
        width={140}
        height={140}
        display="block"
        src={images[0] || "/assets/images/products/iphone-xi.png"}
      />

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{
          position: "absolute",
          right: 15,
          top: 15,
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/${currentLang}/${shopName}/product/${slug}`}>
            <Span ellipsis fontWeight="600" fontSize={18}>
              {title}
            </Span>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            { useCurrency(finalPrice,null,shopLocale,shopInfo) } x {qty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            { useCurrency(finalPrice * qty,null,shopLocale,shopInfo)}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{
              p: "5px",
            }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button
            color="primary"
            sx={{
              p: "5px",
            }}
            variant="outlined"
            onClick={handleCartAmountChange(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
