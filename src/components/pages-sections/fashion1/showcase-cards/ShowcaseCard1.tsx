import { Box, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import NavLink2 from "components/nav-link/NavLink2";
import { H1, Paragraph, Span } from "components/Typography";
import Link from "next/link";
import React from "react"; // styled components

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  borderRadius: 4,
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[3],
    borderColor: "transparent",
  },
  [theme.breakpoints.between("sm", "md")]: {
    "&": {
      display: "flex",
      alignItems: "center",
      padding: "2rem",
    },
    "& .content": {
      padding: "0",
      width: "50%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
    },
    "& .content": {
      padding: 0,
      marginTop: 10,
    },
  },
}));
const StyledImage = styled(BazaarImage)(({ theme }) => ({
  padding: "2.5rem",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "50%",
    padding: "1rem",
  },
}));

const ShowcaseCard1 = ({data}) => {
  return Object.keys(data).length > 0 ? (
    <Link href={data.url}>
        <StyledBox>
          <StyledImage
            src={data.image}
            alt="apple-watch-1"
          />

          <Box p="25px" className="content">
            <Paragraph mb={1}>{data.subtitle}</Paragraph>

            <H1 lineHeight={1.3}>
              {data.title}
            </H1>

            <Paragraph mt={1} mb={2}>
              {data.description}
            </Paragraph>

            <NavLink2 title={data.buttonName} borderColor="grey.100" />
          </Box>
        </StyledBox>
    </Link>
  ) : null;
};

export default ShowcaseCard1;
