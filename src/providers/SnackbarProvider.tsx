"use client"
import { styled } from "@mui/material/styles";
import { SnackbarProvider as NotistackProvider } from "notistack";
import React from "react"; // styled component

const Provider = styled(NotistackProvider)(({ theme }) => ({
    "&.SnackbarContent-root.SnackbarItem-contentRoot": {
        boxShadow: theme.shadows[2],
        color: theme.palette.common.black,
        background: theme.palette.common.white,
        fontFamily: theme.typography.fontFamily,
    },
    "&.SnackbarItem-variantSuccess .MuiSvgIcon-root": {
        color: theme.palette.success.main,
    },
    "&.SnackbarItem-variantError .MuiSvgIcon-root": {
        color: theme.palette.error.main,
    },
})); // ========================================

// ========================================
const SnackbarProvider = ({ children }: {children: React.ReactNode}) => {
    return (
        <Provider
            maxSnack={4}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
        >
            {children}
        </Provider>
    );
};

export default SnackbarProvider;
