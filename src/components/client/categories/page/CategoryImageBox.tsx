import { Typography } from "@mui/material";
import LazyImage from "components/client/LazyImage";
import { FlexRowCenter } from "components/client/flex-box";
import appIcons from "components/client/icons";

// ==============================================================
const CategoryImageBox = ({ title, image, icon }) => {
  let SvgIcon = '';
  if(icon !== '' && icon !== null){
      SvgIcon = appIcons[icon];
  }
  return (
    <FlexRowCenter flexDirection="column">
      {image ? (
        <LazyImage
          width={100}
          height={100}
          src={image}
          alt="banner"
          objectFit="cover"
          borderRadius="5px"
        />
      ) : (
        SvgIcon && <SvgIcon color="inherit" sx={{fontSize: "48px", mb: "0.5rem",}}/>
      )}
      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="14px"
        lineHeight="1"
        width="90%"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        mt={1}
      >
        {title}
      </Typography>
    </FlexRowCenter>
  );
};

export default CategoryImageBox;
