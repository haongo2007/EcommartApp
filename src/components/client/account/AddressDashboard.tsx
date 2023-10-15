"use client"
import Link from "next/link";
import { Delete, Edit, Place } from "@mui/icons-material";
import { Button, IconButton, Pagination, Typography } from "@mui/material";
import TableRow from "components/client/TableRow";
import { FlexBox } from "components/client/flex-box";
import AccountHeader from "components/client/account/AccountHeader";

// =======================================================
const AddressDashboard = ({locale,domain}:{locale:string,domain:string}) => {
  const HEADER_BUTTON = (
    <Button
      color="primary"
      sx={{
        bgcolor: "primary.light",
        px: 4,
      }}
    >
      Add New Address
    </Button>
  ); // HANDLE ADDRESS DELETE
    const allAddress = [];
    const handleAddressDelete = (id) => {
        
    };

    return (
        <>
            <AccountHeader
                icon={Place}
                title="My Addresses"
                button={HEADER_BUTTON}
            />
            {/* ALL ADDRESS LIST AREA */}
                {allAddress.map((address) => (
                    <TableRow
                    sx={{
                        my: 2,
                        padding: "6px 18px",
                    }}
                    key={address.id}
                    >
                    <Typography whiteSpace="pre" m={0.75} textAlign="left">
                        {address.title}
                    </Typography>

                    <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
                        {`${address.street}, ${address.city}`}
                    </Typography>

                    <Typography whiteSpace="pre" m={0.75} textAlign="left">
                        {address.phone}
                    </Typography>

                    <Typography whiteSpace="pre" textAlign="center" color="grey.600">
                        <Link href={`/address/${address.id}`} passHref>
                        <IconButton>
                            <Edit fontSize="small" color="inherit" />
                        </IconButton>
                        </Link>

                        <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddressDelete(address.id);
                        }}
                        >
                        <Delete fontSize="small" color="inherit" />
                        </IconButton>
                    </Typography>
                    </TableRow>
                ))}
            {/* PAGINATION AREA */}
            <FlexBox justifyContent="center" mt={5}>
                <Pagination count={5} onChange={(data) => console.log(data)} />
            </FlexBox>
        </>
    );
};

export default AddressDashboard;
