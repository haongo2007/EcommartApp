import { styled } from "@mui/material/styles";
import { LAYOUT_CONSTANT } from "../../constants";
const CategoryMenuNavStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: "80vh",
  display: "flex",
  "& .header": {
  },
  "& .main-category-holder": {
    overflowY: "auto",
    background: theme.palette.grey[300],
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
    flex: "1 1 0",
    overflowY: "auto",
    padding: "0.5rem 1rem",
  },
  "& .ellipsis": {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
export default CategoryMenuNavStyle;
