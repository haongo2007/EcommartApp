import Image from "next/image";
import { Box, Container, styled } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import CarouselCard2 from "components/carousel-cards/CarouselCard2";
import { arrowButtonStyle } from "../../../constants";

const ContentWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  position: "relative",
  backgroundColor: "#F3F6F9",
  boxShadow: theme.shadows[1],
}));
const BadgeBox = styled(Box)(({ theme }) => ({
  top: 0,
  right: "3rem",
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    "&": {
      width: "85px",
      right: "1rem",
    },
  },
})); // ========================================================

// ========================================================
const Section5 = ({ dealOfTheWeek }) => {
  const locale = 'vi';

  return (
    <Container
      sx={{
        pb: 8,
      }}
    >
      <ContentWrapper>
        <Carousel
          totalSlides={dealOfTheWeek?.length}
          autoPlay={true}
          infinite={true}
          visibleSlides={1}
          leftButtonStyle={arrowButtonStyle}
          rightButtonStyle={arrowButtonStyle}
        >
          {dealOfTheWeek?.map((item, index) => {
            const expireDate = new Date(item.dateEnd).getTime();
            return (
              <CarouselCard2
                key={index}
                imgUrl={item.product.images.split(',')[0]}
                expireDate={expireDate}
                productName={item.product.description.filter((desc) => desc.lang === locale)[0].name}
              />
            );
          })}
        </Carousel>

        <BadgeBox>
          <Image
            src="/assets/images/badges/hot.svg"
            width={110}
            height={130}
            alt="New"
          />
        </BadgeBox>
      </ContentWrapper>
    </Container>
  );
};

export default Section5;
