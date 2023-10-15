"use client"
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FlexBox } from "components/client/flex-box";
import { H2 } from "components/client/Typography";
import useWindowSize from "hooks/useWindowSize";
import React from "react";
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  "& .headerHold": {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  [theme.breakpoints.up("md")]: {
    "& .sidenav": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
})); // ==============================================================

// ==============================================================
const AccountHeader = ({ title, button, ...props }) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  return (
    <StyledBox>
      <FlexBox mt={2} className="headerHold">
        <FlexBox alignItems="center">
          {props.icon && <props.icon color="primary" />}
          <H2 ml={1.5} my="0px" lineHeight="1" whiteSpace="pre">
            {title}
          </H2>
        </FlexBox>

        {!isTablet && button}
      </FlexBox>

      {isTablet && !!button && <Box mt={2}>{button}</Box>}
    </StyledBox>
  );
};

export default AccountHeader;
