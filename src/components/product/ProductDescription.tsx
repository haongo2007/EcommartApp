"use client"
import { useState } from "react";
import { Box, styled, Tab, Tabs } from "@mui/material";
import ProductReview from "./ProductReview";
import { useStore } from "stores";
import { H3 } from "components/Typography";

 // styled component
 const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    marginTop: 80,
    marginBottom: 24,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    "& .inner-tab": {
      minHeight: 40,
      fontWeight: 600,
      textTransform: "capitalize",
    },
  }));

  // ======================================================
const Description = ({description}) => {
    const createMarkup = () => {
        return { __html: description };
    }
    return (
        <Box>
            <H3 mb={2}>Specification:</H3>
            <Box dangerouslySetInnerHTML={createMarkup()} />
        </Box>
    );
};
// ================================================================
const ProductDescription = ({ product }: {product:ShopProduct}) => {
    const { id, stock, description, promotion, price, rate_count, rate_point, brand, categories,attribute } = product;
    const [selectedOption, setSelectedOption] = useState(0);
    const handleOptionClick = (_, value) => setSelectedOption(value);
    const locale = useStore((state) => state.shopLocale.language);
    return (
        <>
            <StyledTabs
                textColor="primary"
                value={selectedOption}
                indicatorColor="primary"
                onChange={handleOptionClick}
            >
                <Tab className="inner-tab" label="Description" />
                <Tab className="inner-tab" label="Review (3)" />
            </StyledTabs>

            <Box mb={6}>
                {selectedOption === 0 && <Description description={description.filter((item) => item.lang === locale)[0].content}/>}
                {selectedOption === 1 && <ProductReview />}
            </Box>
        </>
    );
};

export default ProductDescription;