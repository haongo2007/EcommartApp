import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "components/stepper";

type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}
export default function CheckoutNavLayout({ children, params : { lng,shop }}: LayoutProps) {
  return (
    <Container sx={{ my: 4 }}>
        <Box
            mb={3}
            display={{
            sm: "block",
            xs: "none",
            }}
        >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Stepper locale={lng} domain={shop}/>
              </Grid>
            </Grid>
        </Box>
        {children}
    </Container>
  );
};
