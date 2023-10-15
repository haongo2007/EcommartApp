import Link from "next/link";
import HoverBox from "components/client/HoverBox";
import { H4 } from "components/client/Typography";
import LazyImage from "components/client/LazyImage";
import { currency } from "lib"; // ==========================================================

// ==========================================================
const ProductCard2 = (props) => {
  const { thumbnail, title, price, slug } = props;
  return (
    <Link href={`/product/${slug}`}>
        <HoverBox borderRadius="8px" mb={1}>
          <LazyImage
            width={0}
            height={0}
            alt={title}
            src={thumbnail}
            layout="responsive"
          />
        </HoverBox>

        <H4 fontSize={14} mb={0.5}>
          {title}
        </H4>

        <H4 fontSize={14} color="primary.main">
          {currency(price)}
        </H4>
    </Link>
  );
};

export default ProductCard2;
