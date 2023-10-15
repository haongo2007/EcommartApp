import {use} from "react";
import { getProductHome } from "server/handlers/products/getProductHome";
import { PageDefaultProps } from "types/types";
import {createTranslator} from 'next-intl';
import getMessages from "i18n/getMessages";
import Section1 from "components/client/pages-sections/fashion1/Section1";
import Section2 from "components/client/pages-sections/fashion1/Section2";
import Section3 from "components/client/pages-sections/fashion1/Section3";
import Section4 from "components/client/pages-sections/fashion1/Section4";
import Section5 from "components/client/pages-sections/fashion1/Section5";
import Section6 from "components/client/pages-sections/fashion1/Section6";
import Section7 from "components/client/pages-sections/fashion1/Section7";
import Section8 from "components/client/pages-sections/fashion1/Section8";
import { fetchBanners } from "server/handlers/banner/fetchBanners";

export const revalidate = 86400;

export async function generateMetadata({params: {locale,shop}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.home'),
      description: t('Ecommflex.description'),
  };
}

export default function Home({params: { locale,shop } }:PageDefaultProps) {
  const productHome = use(getProductHome(shop));
  const shopBanner = use(fetchBanners(shop));
  const {product_flash_deals,product_new_arrivals,product_deals_day,product_deals_week,product_most_buyed} = productHome;
  return (
    <>
      {/* HERO SECTION AND SERCIVE CARDS */}
      <Section1 shopBanner={shopBanner}/>
      {/* FLASH DEALS */}
      <Section2 flashDeals={product_flash_deals}/>
      {/*/!* NEW ARRIVALS *!/*/}
      <Section3 newArrivals={product_new_arrivals}/>
      {/*/!* DEALS OF THE WEEK GRID CAROUSEL *!/*/}
      <Section4 dealOfTheDay={product_deals_day}/>
      {/*/!* HOT DEALS CAROUSEL *!/*/}
      <Section5 dealOfTheWeek={product_deals_week}/>
      {/*/!* TRENDING ITEMS *!/*/}
      <Section6 most_buyed={product_most_buyed}/>
      {/*/!* SERVICE ITEMS *!/*/}
      <Section7 />
      {/* SUBSCRIBE NEWSLETTER */}
      <Section8 />
    </>
  );
}
