import { useEffect, useState } from "react";
import Carousel from "components/carousel/Carousel";
import ProductCard3 from "components/product-cards/ProductCard3";
import CategorySectionCreator from "components/CategorySectionCreator";
import useWindowSize from "hooks/useWindowSize";
import { arrowButtonStyle } from "../../../constants";

// ==========================================================
const Section3 = ({ newArrivals }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);
  const locale = 'vi';
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);
  return (
    <CategorySectionCreator title="New Arrivals" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={newArrivals?.length}
        leftButtonStyle={arrowButtonStyle}
        rightButtonStyle={arrowButtonStyle}
      >
        {newArrivals?.map((item, ind) => (
          <ProductCard3
            hideReview
            hideFavoriteIcon
            key={item.id}
            slug={item.slug}
            title={item.description.filter((desc) => desc.lang === locale)[0].name}
            price={item.price}
            promotion={item.promotion.length > 0 ? item.promotion[0].discount_percent : 0}
            rating={item.rate_point / item.rate_count}
            imgUrl={item.images.split(',')[0]}
          />
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default Section3;
