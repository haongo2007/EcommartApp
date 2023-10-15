import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AccountSideBar from "components/client/account/AccountSideBar";
/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */
// ======================================================
type LayoutProps = {
  children: React.ReactNode,
  params: { locale: string,shop: string }
}
export default function AccountLayout({ children, params : { locale,shop }}: LayoutProps) {
  return (
    <Container
      sx={{
          my: "2rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12}
          sx={{
              display: {
              xs: "none",
              sm: "none",
              md: "block",
              },
          }}
        >
          <AccountSideBar locale={locale} domain={shop}/>
        </Grid>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
};