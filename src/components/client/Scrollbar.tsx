import { styled } from "@mui/material";
import SimpleBar from "simplebar-react";
const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  position: "relative",
  "& .simplebar-wrapper" : {
    overflow: "hidden",
    width: "inherit",
    height: "inherit",
    maxWidth: "inherit",
    maxHeight: "inherit",
  },
  "& .simplebar-scrollbar": {
    backgroundColor: "rgb(15 52 96 / 89%)",
    borderRadius: "4px",
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 9,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
    position: "absolute",
    padding: "0px",
    margin: "0px",
    inset: "0px",
    direction: "inherit",
    overflow: "hidden",
    width: "auto !important",
    height: "auto !important",
    "& .simplebar-offset": {
      direction: "inherit !important",
      boxSizing: "inherit !important",
      resize: "none !important",
      "& .simplebar-content-wrapper": {
        direction: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        boxSizing: "border-box !important",
      }
    },
  },
})); // =============================================================

// =============================================================
const Scrollbar = ({ children, sx, ...props }) => {
  return (
    <StyledScrollBar sx={sx} {...props}>
      {children}
    </StyledScrollBar>
  );
};

export default Scrollbar;
