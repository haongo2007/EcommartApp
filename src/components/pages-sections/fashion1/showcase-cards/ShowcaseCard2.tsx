import { Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import NavLink2 from "components/nav-link/NavLink2";
import { H1, Paragraph, Span } from "components/Typography";
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
      flexDirection: "column-reverse",
    },
    "& .content": {
      padding: 0,
      marginTop: 10,
    },
  },
}));

const ShowcaseCard2 = ({data}) => {
  return Object.keys(data).length > 0 ? (
    <Link href={data.url}>
        <StyledGrid container>
          <Grid item sm={7} xs={12} p="30px" className="content">
            <Paragraph mb={1}>{data.subtitle}</Paragraph>
            <H1 lineHeight={1.3}>
              {data.title}
            </H1>

            <Paragraph mt={1} mb={2}>
              {data.description}
            </Paragraph>

            <NavLink2 title={data.buttonName} borderColor="grey.100" />
          </Grid>

          <Grid item sm={5} xs={12}>
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
        </StyledGrid>
    </Link>
  ) : null;
};

export default ShowcaseCard2;
