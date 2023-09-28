import Link from "next/link";
import { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Carousel from "components/carousel/Carousel";
import ProductCard11 from "components/product-cards/ProductCard11";
import CategorySectionCreator from "components/CategorySectionCreator";
import useSettings from "hooks/useSettings";
import {chunk} from "lodash-es";

// ==========================================================
const Section4 = ({ dealOfTheDay }) => {
  const { settingState } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = dealOfTheDay?.length / 4;
  const firstIndex = currentSlide * 4;
  const lastIndex = firstIndex + 4;
  dealOfTheDay = chunk(dealOfTheDay,totalSlides)

  const handleSlideChange = (count) => () => {
    if (count < 0) {
      setCurrentSlide(0);
    } else if (count > totalSlides - 1) {
      setCurrentSlide(totalSlides - 1);
    } else {
      setCurrentSlide(count);
    }
  }; // custom arrow button for carousel

  const buttonStyled = (color1, color2) => ({
    boxShadow: 3,
    backgroundColor: color1,
    "&:hover": {
      backgroundColor: color1,
      color: color2,
    },
  });
  const locale = 'vi';
  const shopDomain = 'bepetshop'
  return (
    <CategorySectionCreator title="Deal Of The Day">
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -55,
            right: 0,
          }}
        >
          {/* CAROUSEL ARROW BUTTONS */}
          <IconButton
            disableRipple
            onClick={handleSlideChange(currentSlide - 1)}
            sx={{ ...buttonStyled("white", "primary.500"), mr: 1 }}
          >
            {settingState.direction === "ltr" ? (
              <ArrowBack fontSize="small" color="secondary" />
            ) : (
              <ArrowForward fontSize="small" color="secondary" />
            )}
          </IconButton>

          <IconButton
            disableRipple
            onClick={handleSlideChange(currentSlide + 1)}
            sx={{ ...buttonStyled("primary.500", "white"), color: "white" }}
          >
            {settingState.direction === "ltr" ? (
              <ArrowForward fontSize="small" color="inherit" />
            ) : (
              <ArrowBack fontSize="small" color="inherit" />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* MAIN CAROUSEL */}
      <Carousel
        showDots
        visibleSlides={1}
        showArrow={false}
        totalSlides={totalSlides}
        currentSlide={currentSlide}
      >
        {dealOfTheDay?.map((_item, ind) => (
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={'r_'+ind}>
            {_item.map((item) => (
              <Grid item xs={12} key={'c_'+item.id}>
                <Box py="0.25rem">
                  <Link href={shopDomain+'/product/'+item.product.slug}>
                      <ProductCard11
                        imgUrl={item.product.images.split(',')[0]}
                        title={item.product.description.filter((desc) => desc.lang === locale)[0].name}
                        promotion={item.discount_percent}
                      />
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default Section4;
