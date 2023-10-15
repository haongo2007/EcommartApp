"use client"
import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Span } from "components/client/Typography";
import { FlexBetween, FlexBox } from "components/client/flex-box";
import ProductCard7 from "components/client/product-cards/ProductCard7";
import { useStore } from "stores";
import useCurrency from "hooks/useCurrency";
import { trpc } from "providers/trpcProvider";

const CartDashboard = ({locale,domain}:{locale:string,domain:string}) => {
  const countryList = []
  const shopCarts = useStore((state) => state.shopCarts[domain]);
  const { mutate: updateCart } = trpc.carts.updateCart.useMutation();
  const getTotalPrice = () => shopCarts?.reduce((accum, item) => accum + item.finalPrice * item.qty, 0);

  return (
    <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
            {shopCarts?.map((item,ind) => (
                <ProductCard7 key={ind} product={item} updateCart={updateCart}/>
            ))}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
            <Card
            sx={{
                padding: 3,
            }}
            >
            <FlexBetween mb={2}>
                <Span color="grey.600">Total:</Span>

                <Span fontSize={18} fontWeight={600} lineHeight="1">
                {useCurrency(getTotalPrice())}
                </Span>
            </FlexBetween>

            <Divider
                sx={{
                mb: 2,
                }}
            />

            <FlexBox alignItems="center" columnGap={1} mb={2}>
                <Span fontWeight="600">Additional Comments</Span>

                <Span
                p="6px 10px"
                fontSize={12}
                lineHeight="1"
                borderRadius="3px"
                color="primary.main"
                bgcolor="primary.light"
                >
                Note
                </Span>
            </FlexBox>

            <TextField
                variant="outlined"
                rows={6}
                fullWidth
                multiline
                sx={{
                mb: 2,
                }}
            />

            <Divider
                sx={{
                mb: 2,
                }}
            />

            <TextField
                fullWidth
                size="small"
                label="Voucher"
                variant="outlined"
                placeholder="Voucher"
            />

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                mt: 2,
                mb: 4,
                }}
            >
                Apply Voucher
            </Button>

            <Divider
                sx={{
                mb: 2,
                }}
            />

            <Span fontWeight={600} mb={2} display="block">
                Shipping Estimates
            </Span>

            <Autocomplete
                fullWidth
                sx={{
                mb: 2,
                }}
                options={countryList} // getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    label="Country"
                    variant="outlined"
                    placeholder="Select Country"
                />
                )}
            />

            <TextField
                select
                fullWidth
                size="small"
                label="State"
                variant="outlined"
                placeholder="Select State"
                defaultValue="new-york"
            >
                {stateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                    {item.label}
                </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                size="small"
                label="Zip Code"
                placeholder="3100"
                variant="outlined"
                sx={{
                mt: 2,
                }}
            />

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                my: 2,
                }}
            >
                Calculate Shipping
            </Button>

            <Link href="/checkout" passHref legacyBehavior>
                <Button variant="contained" color="primary" fullWidth>
                Checkout Now
                </Button>
            </Link>
            </Card>
        </Grid>
    </Grid>
  );
};

const stateList = [
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "chicago",
    label: "Chicago",
  },
];
export default CartDashboard;
