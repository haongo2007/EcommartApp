import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazaarImage from "components/client/BazaarImage";
import NavLink2 from "components/client/nav-link/NavLink2";
import { H1, Paragraph, Span } from "components/client/Typography";
import Link from "next/link";
import React from "react"; // styled component

const StyledGrid = styled(Grid)(({ theme }) => ({
  borderRadius: 4,
  alignItems: "center",
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[3],
    borderColor: "transparent",
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
      paddingBottom: 0,
    },
  },
  [theme.breakpoints.between("md", "lg")]: {
    "& .css-1eqr9bp": {
      paddingRight: "1rem",
    },
  },
}));

const ShowcaseCard3 = ({data}) => {
  return Object.keys(data).length > 0 ? (
    <Link href={data.url}>
        <StyledGrid container>
          <Grid item sm={6} xs={12}>
            <BazaarImage
              alt="apple-watch-1"
              src={data.image}
              sx={{
                mx: "auto",
                maxWidth: "100%",
                maxHeight: "225px",
              }}
            />
          </Grid>

          <Grid item sm={6} xs={12} py={4}>
            <Paragraph mb={1}>{data.subtitle}</Paragraph>

            <H1 lineHeight={1.3}>
              {data.title}
            </H1>

            <Paragraph mt={1} mb={2}>
              {data.description}
            </Paragraph>

            <NavLink2 title={data.buttonName} borderColor="grey.100" />
          </Grid>
        </StyledGrid>
    </Link>
  ) : null;
};

export default ShowcaseCard3;
