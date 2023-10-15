import Link from "next/link";
import { Box } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import HoverBox from "components/client/HoverBox";
import { H4 } from "components/client/Typography";
import BazaarImage from "components/client/BazaarImage";
import BazaarRating from "components/client/BazaarRating";
import { FlexBetween, FlexBox } from "components/client/flex-box";
import useCurrency from "hooks/useCurrency";
import { useStore } from "stores";

// ===========================================================
const ProductCard12 = ({
  id,
  slug,
  title,
  price,
  imgUrl,
  rating,
  promotion,
  hideReview,
  hideFavoriteIcon,
}) => {
  const shopName = useStore((state) => state.shopInfo.domain);
  const locale = useStore((state) => state.shopLocale.language);
  const link = `/${locale}/${shopName}/product/${slug}`;
  return (
    <Box>
      <Link href={link}>
          <HoverBox>
            <BazaarImage
              src={imgUrl}
              width="100%"
              height="auto"
              alt={title}
              mx="auto"
            />
          </HoverBox>
      </Link>

      <FlexBetween>
        <Box mt="1rem">
          <H4 fontWeight="600" fontSize="14px" mb={0.5} title={title} ellipsis>
            {title}
          </H4>
          {!hideReview && <BazaarRating value={rating} color="warn" readOnly />}

          <FlexBox gap={1} alignItems="center">
            <Box fontWeight="600" color="primary.main">
              { useCurrency(price, promotion) }
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
          <FavoriteBorder
            fontSize="small"
            color="secondary"
            sx={{
              opacity: 0.5,
              m: "1rem",
            }}
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default ProductCard12;
