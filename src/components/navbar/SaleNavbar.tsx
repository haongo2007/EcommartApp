import { Box, styled } from "@mui/material";
import { H5 } from "../Typography";
import Scrollbar from "../Scrollbar";
import { FlexRowCenter } from "../flex-box";
import appIcons from "components/icons";
import Link from "next/link";
// styled compoentents
const StyledScrollbar = styled(Scrollbar)(() => ({
  "& .simplebar-content": {
    maxWidth: "899px",
    height: "4rem",
    display: "flex",
    backgroundColor: "white",
    justifyContent: "start",
    alignItems: "end"
  },
}));
const Title = styled(H5)(({ theme }) => ({
  fontSize: "12px",
  textAlign: "center",
  fontWeight: "400",
  color: "inherit",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "90%",
})); // ==========================================================================

// ==========================================================================
const SaleNavbar = ({ categories,locale,domain }) => {
  let SvgIcon = '';
  return (
    <Box sx={{width:"calc(100% - 96px)",margin: "0 auto"}}>
      <StyledScrollbar autoHide={false}>
        {categories.map((item) => {
          console.log(item);
          if(item.icon !== '' && item.icon !== null){
              SvgIcon = appIcons[item.icon];
          }
          const title = item.description.filter((desc) => desc.lang === locale)[0].title;
          return (
            <Link href={`/${locale}/${domain}/category/${item.alias}`}>
              <FlexRowCenter
                key={item.id}
                sx={{
                  color: "#000",
                  paddingBottom: "5px",
                  cursor: "pointer",
                  minWidth: "100px",
                  flexDirection: "column",
                  background: "transparent",
                }}
              >
                  {item.icon && <SvgIcon fontSize="small" color="inherit" sx={{fontSize: "1.75rem"}}/>}
                  <Title>{title}</Title>
              </FlexRowCenter>
            </Link>
          );
        })}
      </StyledScrollbar>
    </Box>
  );
};

export default SaleNavbar;
