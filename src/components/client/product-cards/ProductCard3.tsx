import Link from "next/link";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import HoverBox from "components/client/HoverBox";
import { H4 } from "components/client/Typography";
import LazyImage from "components/client/LazyImage";
import BazaarRating from "components/client/BazaarRating";
import { FlexBetween, FlexBox } from "components/client/flex-box";
import useCurrency from "hooks/useCurrency";
import { useStore } from "stores";

// ========================================================
const ProductCard3 = ({
  slug,
  title,
  price,
  imgUrl,
  rating,
  promotion,
  hideReview,
  hideFavoriteIcon,
}) => {
  const [favorite, setFavorite] = useState(false);
  const shopName = useStore((state) => state.shopInfo.domain);
  const locale = useStore((state) => state.shopLocale.language);
  const link = `/${locale}/${shopName}/product/${slug}`;
  return (
    <Box>
      <Link href={link}>
          <HoverBox
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <LazyImage
              width={0}
              mx="auto"
              height={0}
              alt={title}
              src={imgUrl}
              layout="responsive"
            />
          </HoverBox>
      </Link>

      <FlexBetween mt={2}>
        <Box>
          <H4 fontWeight="600" fontSize="14px" mb={0.5} title={title} ellipsis>
            {title}
          </H4>

          {!hideReview && <BazaarRating value={rating} color="warn" readOnly />}

          <FlexBox gap={1} alignItems="center">
            <Box fontWeight="600" color="primary.main">
              {useCurrency(price, promotion)}
              {/*{useSelector(selectPriceWithCurrency(promotion ? useSelector(calculateDiscountWithCurrency(price, promotion)) : price ))}*/}
            </Box>

            {!!promotion && (
              <Box color="grey.600" fontWeight="600">
                <del>{useCurrency(price)}</del>
              </Box>
            )}
          </FlexBox>
        </Box>

        {!hideFavoriteIcon && (
          <Button
            disableRipple
            disableElevation
            onClick={() => setFavorite((state) => !state)}
            sx={{
              height: "0",
              alignItems: "flex-start",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {favorite ? (
              <Favorite fontSize="small" color="primary" />
            ) : (
              <FavoriteBorder
                fontSize="small"
                sx={{
                  opacity: 0.5,
                }}
              />
            )}
          </Button>
        )}
      </FlexBetween>
    </Box>
  );
};

export default ProductCard3;
