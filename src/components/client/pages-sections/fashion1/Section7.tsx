"use client"
import { styled } from "@mui/material/styles";
import appIcons from "components/client/icons";
import { H3, Span } from "components/client/Typography";
import { FlexBetween, FlexBox } from "components/client/flex-box";
import { useStore } from "stores";
import Container from "@mui/material/Container";
// styled component
const StyledFlexBox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  borderRadius: "8px",
  padding: "1rem 2rem",
  border: `1px solid ${theme.palette.grey[400]}`,
  [theme.breakpoints.between("sm", "lg")]: {
    "&": {
      justifyContent: "space-evenly",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
})); // ===========================================================

// ===========================================================
const Section7 = (props) => {
  const {shopConfig} = useStore();
  const serviceList = shopConfig.filter((item) => item.key === 'shop_services');
  return (
    <Container
      sx={{
        mb: "4rem",
      }}
    >
      <StyledFlexBox>
        {serviceList?.map((item, ind) => {
          const info = JSON.parse(item.detail);
          const Icon = appIcons[info.icon];
          return (
            <FlexBox gap={1} key={ind} p="1rem">
              {Icon ? (
                <Icon
                  color="inherit"
                  fontSize="inherit"
                  sx={{
                    color: "grey.900",
                    fontSize: "40px",
                  }}
                />
              ) : null}
              <div>
                <H3 color="grey.900" lineHeight={1.3}>
                  {info.title}
                </H3>
                <Span color="grey.600">{info.subtitle}</Span>
              </div>
            </FlexBox>
          );
        })}
      </StyledFlexBox>
    </Container>
  );
};

export default Section7;
