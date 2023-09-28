"use client"
import { Pagination } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import AccountHeader from "components/account/AccountHeader";
import OrderRow from "components/pages-sections/orders/OrderRow";

// ====================================================
const OrdersDashboard = ({locale,domain}:{locale:string,domain:string}) => {
    const orderList = [];
    return (
        <>
        {/* TITLE HEADER AREA */}
            <AccountHeader
                title="My Orders"
                icon={ShoppingBag}
                button={undefined}
            />

            {/* ORDER LIST AREA */}
            <TableRow
                elevation={0}
                sx={{
                padding: "0px 18px",
                background: "none",
                display: {
                    xs: "none",
                    md: "flex",
                },
                }}
            >
                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                Order #
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                Status
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                Date purchased
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                Total
                </H5>

                <H5
                my={0}
                px={2.75}
                color="grey.600"
                flex="0 0 0 !important"
                display={{
                    xs: "none",
                    md: "block",
                }}
                />
            </TableRow>

            {orderList?.map((order) => (
                <OrderRow order={order} key={order.id} />
            ))}

            <FlexBox justifyContent="center" mt={5}>
                <Pagination
                count={5}
                color="primary"
                variant="outlined"
                onChange={(data) => console.log(data)}
                />
            </FlexBox>
        </>
    );
};

export default OrdersDashboard;
