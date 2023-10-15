import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductFilterCard from "components/client/product/ProductFilterCard";
import ShopIntroCard from "components/client/shop/ShopIntroCard";
import { PRODUCTS_PER_PAGE } from "../../../../../constants";
import {createTranslator} from 'next-intl';
import getMessages from "i18n/getMessages";
import {use} from "react";
import { fetchPaginatedProducts } from "server/handlers/products/fetchPaginatedProducts";
import { getShop } from "server/handlers/shop/getShop";
import { PageDefaultProps } from "types/types";
import { Sort } from "server/routers/subRouters/admin.router";
import ProductCardList from "components/client/product/ProductCardList";

export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.store'),
      description: t('Ecommflex.description'),
  };
}

export const revalidate = 86400;

export default function Home({params: { locale,shop } }:PageDefaultProps) {
  const shopInclude = {
    description: true,
    address: {
      where:{
        pickup:1
      }
    },
    configs:{
      where:{
        group: 'shop_display',
        code: 'store_display',
      }
    },
    brand:true,
  }
  const store = use(getShop(shopInclude,shop));
  const configPagi = store.configs.find(item => item.key === 'product_per_page');
  const configOrder = store.configs.find(item => item.key === 'product_order');
  let productLimit: number = PRODUCTS_PER_PAGE;
  let productOrder: Sort = Sort.Asc;
  let store_id:number = 0;
  if(configPagi){
    productLimit = configPagi.value;
  }
  if(configOrder){
    productOrder = configOrder.detail;
  }
  if(store){
    store_id = parseInt(store.id);
  }
  const products = use(fetchPaginatedProducts(store_id,productLimit,productOrder));
  return (
    <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* SHOP INTRODUCTION AREA */}
      <ShopIntroCard
        data={store}
        locale={locale}
      />

      <Grid container spacing={3}>
          {/* SIDEBAR AREA */}
        <Grid
            item
            md={3}
            xs={12}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
          <ProductFilterCard />
        </Grid>

        <Grid item md={9} xs={12}>
            {/* SMALL DEVICE SIDEBAR AREA */}
          {/* {isDownMd && (
            <Sidenav position="left" handle={ICON_BUTTON}>
              <ProductFilterCard />
            </Sidenav>
          )} */}

            {/* PRODUCT LIST AREA */}
          <ProductCardList products={products} />
        </Grid>
      </Grid>
    </Container>
  );
}
