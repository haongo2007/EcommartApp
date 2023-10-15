import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "components/client/stepper";

type LayoutProps = {
  children: React.ReactNode,
  params: { locale: string,shop: string }
}

export default function CartLayout({ children, params : { locale,shop }}: LayoutProps) {
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
                  <Stepper locale={locale} domain={shop}/>
              </Grid>
            </Grid>
        </Box>
        {children}
    </Container>
  );
};
