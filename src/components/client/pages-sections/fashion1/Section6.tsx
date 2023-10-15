"use client"
import { Grid } from "@mui/material";
import CategorySectionCreator from "components/client/CategorySectionCreator";
import ProductCard12 from "components/client/product-cards/ProductCard12";
import ProductCard3 from "components/client/product-cards/ProductCard3";

// =============================================================
const Section6 = ({ most_buyed }) => {
  const mostBuyed = most_buyed?.slice(1, most_buyed.length);
  const locale = 'vi';
  return (
    <CategorySectionCreator title="Trending Items">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          { most_buyed && (
            <ProductCard12
              id={most_buyed[0].id}
              slug={most_buyed[0].slug}
              title={most_buyed[0].description.filter((desc) => desc.lang === locale)[0].name}
              price={most_buyed[0].price}
              promotion={most_buyed[0].promotion.length > 0 ? most_buyed[0].promotion[0].discount_percent : 0}
              rating={most_buyed[0].rate_point / most_buyed[0].rate_count}
              imgUrl={most_buyed[0].images[0]}
            />) }
        </Grid>

        <Grid item container md={9} xs={12} spacing={4}>
          {mostBuyed?.map((item) => (
            <Grid item xs={6} sm={4} key={item.id}>
              <ProductCard3
                slug={item.slug}
                title={item.description.filter((desc) => desc.lang === locale)[0].name}
                price={item.price}
                promotion={item.promotion.length > 0 ? item.promotion[0].discount_percent : 0}
                rating={item.rate_point / item.rate_count}
                imgUrl={item.images[0]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </CategorySectionCreator>
  );
};

export default Section6;
