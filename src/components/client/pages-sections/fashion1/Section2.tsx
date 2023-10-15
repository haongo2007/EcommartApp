"use client"
import { useEffect, useState } from "react";
import Light from "components/client/icons/Light";
import Carousel from "components/client/carousel/Carousel";
import ProductCard3 from "components/client/product-cards/ProductCard3";
import CategorySectionCreator from "components/client/CategorySectionCreator";
import useWindowSize from "hooks/useWindowSize";
import { arrowButtonStyle } from "../../../../constants";

// =================================================
const Section2 = ({ flashDeals }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  const locale = 'vi';
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);
  return (
    <CategorySectionCreator
      icon={<Light color="primary" />}
      title="Flash Deals"
    >
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={flashDeals?.length}
        leftButtonStyle={arrowButtonStyle}
        rightButtonStyle={arrowButtonStyle}
      >
        {flashDeals?.map((item) => (
          <ProductCard3
            key={item.id}
            slug={item.product.slug}
            title={item.product.description.filter((desc) => desc.lang === locale)[0].name}
            price={item.product.price}
            promotion={item.discount_percent}
            rating={item.product.rate_point / item.product.rate_count}
            imgUrl={item.product.images.split(',')[0]}
          />
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default Section2;
