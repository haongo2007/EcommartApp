import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/client/flex-box";
import BazaarRating from "components/client/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/client/Typography";
import { getDateDifference } from "helpers/date";

const ProductComment = (props) => {
  const { name, imgUrl, rating, date, comment } = props;

  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <Avatar
          src={imgUrl}
          sx={{
            width: 48,
            height: 48,
          }}
        />
        <Box ml={2}>
          <H5 mb={0.5}>{name}</H5>
          <FlexBox alignItems="center">
            <BazaarRating value={rating} color="warn" readOnly />
            <H6 mx={1.25}>{rating}</H6>
            <Span>{getDateDifference(date)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{comment}</Paragraph>
    </Box>
  );
};

export default ProductComment;
