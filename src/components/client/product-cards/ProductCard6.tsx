import { Card, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import HoverBox from "components/client/HoverBox";
import LazyImage from "components/client/LazyImage"; // styled components

const StyledChip = styled(Chip)(() => ({
  zIndex: 2,
  top: "0.875rem",
  fontSize: "10px",
  padding: "0 8px",
  fontWeight: "600",
  position: "absolute",
})); // ========================================================

// ========================================================
const ProductCard6 = ({ title, subtitle, imgUrl }) => {
  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <StyledChip
        color="secondary"
        label={title}
        size="small"
        sx={{
          left: "0.875rem",
        }}
      />

      <StyledChip
        label={subtitle}
        size="small"
        sx={{
          right: "0.875rem",
        }}
      />

      <HoverBox position="relative" height="120px" borderRadius="8px">
        <LazyImage
          src={imgUrl}
          layout="fill"
          objectFit="cover"
          borderRadius="8px"
          alt={title}
        />
      </HoverBox>
    </Card>
  );
};

export default ProductCard6;
