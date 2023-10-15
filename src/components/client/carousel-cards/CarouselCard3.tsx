import Link from "next/link";
import { styled } from "@mui/material";
import { FlexBox } from "components/client/flex-box";
import BazaarCard from "components/client/BazaarCard";
import BazaarImage from "components/client/BazaarImage";
import { H2, Paragraph, Small } from "components/client/Typography";
// styled components
const ContentWrapper = styled(BazaarCard)(({ theme }) => ({
  height: "100%",
  borderRadius: "2px",
  boxShadow: theme.shadows[4],
}));
const StyledFlexBox = styled(FlexBox)(() => ({
  padding: "1rem",
  paddingTop: "3rem",
  alignItems: "center",
  flexDirection: "column",
}));
const StyledShopButton = styled(Small)(({ theme }) => ({
  fontWeight: 900,
  lineHeight: 1.6,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
})); // ==========================================================

// ==========================================================
const CarouselCard3 = ({ product }) => {
  return (
    <ContentWrapper>
      <StyledFlexBox>
        <H2 mb="0.5rem" textAlign="center" lineHeight={1.2}>
          {product.title}
        </H2>

        <Paragraph color="grey.600" textAlign="center" mb="1.5rem">
          Starting at ${product.price} & save upto {product.discount}%
        </Paragraph>

        <Link href={`/product/${product.slug}`}>
          <Link>
            <StyledShopButton>SHOP NOW</StyledShopButton>
          </Link>
        </Link>
      </StyledFlexBox>

      <BazaarImage width="100%" src={product.thumbnail} alt="shoes" />
    </ContentWrapper>
  );
};

export default CarouselCard3;
