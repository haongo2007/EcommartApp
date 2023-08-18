import { styled } from "@mui/material/styles";
import { LAYOUT_CONSTANT } from "../../constants";
const CategoryMenuNavStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: "80vh",
  "& .header": {
    top: 0,
    left: 0,
    right: 0,
    position: "fixed",
  },
  "& .main-category-holder": {
    left: 0,
    position: "fixed",
    overflowY: "auto",
    background: theme.palette.grey[300],
    top: LAYOUT_CONSTANT.mobileNavHeightPage,
    bottom: LAYOUT_CONSTANT.mobileNavHeight,
    "& .main-category-box": {
      width: "90px",
      height: "80px",
      display: "flex",
      cursor: "pointer",
      padding: "0.5rem",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      borderBottom: "1px solid",
      borderLeftColor: theme.palette.grey[600],
      borderBottomColor: theme.palette.grey[300],
    },
  },
  "& .container": {
    left: "90px",
    flex: "1 1 0",
    position: "fixed",
    overflowY: "auto",
    padding: "0.5rem 1rem",
    top: LAYOUT_CONSTANT.mobileHeaderHeight,
    bottom: LAYOUT_CONSTANT.mobileNavHeight,
  },
  "& .ellipsis": {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
export default CategoryMenuNavStyle;
