import Box from "@mui/material/Box";
import ProductCard1 from "components/product-cards/ProductCard1";
import Carousel from "components/carousel/Carousel";
import { arrowButtonStyle } from "../../constants";
import { use } from "react";
import { getProductRelation } from "server/handlers/products/getProduct";
import { H3 } from "components/Typography";
import { ProductTypeClient } from "types/product";

// ===================================================
const RelatedProducts = ({ product } : { product:ProductTypeClient }) => {
  const { categories, brand_id, id, store_id } = product;
  const productRelate = use(getProductRelation(categories,brand_id,id,store_id));
  return (
    productRelate && productRelate.length &&
    <Box mb={7.5}>
      <H3 mb={3}>Realted Products</H3>
        <Carousel
          infinite={true}
          visibleSlides={4}
          totalSlides={productRelate.length}
          leftButtonStyle={arrowButtonStyle}
          rightButtonStyle={arrowButtonStyle}
        >
          {productRelate.map((item, ind) => (
            <ProductCard1 product={item} key={ind}/>
          ))}
        </Carousel>
    </Box>
  );
};

export default RelatedProducts;
