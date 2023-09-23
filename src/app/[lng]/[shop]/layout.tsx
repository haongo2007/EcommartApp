import React, {use} from "react";
import Topbar from "components/topbar";
import Header from "components/Header";
import Navbar from "components/navbar/Navbar";
import AccountProvider from "providers/AccountProvider";
import {fetchAllCategoriesParentWithGroup} from "../../../server/handlers/categories/fetchAllCategoriesParentWithGroup";
import {StoreInitializer} from "../../../stores/store-initializer";
import {getShop} from "../../../server/handlers/shop/getShop";
import {Metadata} from "next";
import Footer from "components/Footer";
import { getEnvSafely } from "env/config";
import { getCurrentUser } from "lib/getCurrentUser";
import { getCartByCustomerId } from "server/handlers/carts/getCartByCustomerId";
import { MobileNavigationBar } from "components/mobile-navigation";

type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}

export async function generateMetadata( { children, params : { lng,shop }}: LayoutProps): Promise<Metadata> {
  const shopInfo = await getShop({description:true},shop);
  const {favicon} = shopInfo;
  const shopDesc = shopInfo.description.filter((item) => item.lang === lng);
  const {title} = shopDesc[0];
  const {description} = shopDesc[0];
  return {
    metadataBase: new URL(getEnvSafely('NEXT_PUBLIC_URL')),
    title: {
      default: `${title}`,
      template: `%s | ${title}`,
    },
    description: description,
    verification: {
      google: 'google-site-verification=878787878'
    },
    icons: {
      icon: getEnvSafely('NEXT_PUBLIC_URL')+favicon,
    },
  }
}

export default function ShopListLayout({ children, params : { lng,shop }}: LayoutProps) {
  const shopInclude = {
    description: true,
    address: true,
    configs: true,
    languages: true,
    currencies: true,
    banner:true,
    brand:true,
    attribute_group:true
  }
  const shopConfig = use(getShop(shopInclude,shop));
  const shopCategory = use(fetchAllCategoriesParentWithGroup(shopConfig.id,shop));
  const infomation = {
    email: shopConfig.email,
    phone: shopConfig.phone,
    language: shopConfig.language,
    currency: shopConfig.currency,
    logo: shopConfig.logo,
    favicon: shopConfig.favicon,
    domain: shopConfig.domain,
  };
  const locally = {
    languages: shopConfig.languages,
    currencies: JSON.parse(JSON.stringify(shopConfig.currencies)),
    currency: shopConfig.currency,
    language: lng,
  };
  const dataInit = {
    shopCategory,
    shopConfig: shopConfig.configs,
    shopInfo: infomation,
    shopLocale: locally,
    shopBrands: shopConfig.brand,
    shopBanner: shopConfig.banner,
    shopAGroupP: shopConfig.attribute_group,
  }
  const account = use(getCurrentUser());
  if(account !== undefined && account !== null){
    const carts = use(getCartByCustomerId(account.id,account.store_id));
    const objCart = {};
    objCart[shop] = carts;
    dataInit['shopCarts'] = objCart;
  }
  return (
    <>
      <AccountProvider account={account} >
        <StoreInitializer initialStore={dataInit} />
          {/* TOPBAR */}
          <Topbar infomation={infomation} useCurrency={true}/>
          {/* HEADER */}
          <Header infomation={infomation}/>
          <div className="section-after-sticky">
            {/* NAVIGATION BAR */}
            <Navbar data={shopCategory} elevation={0} border={1} hideHorizontalCategories={false} locale={lng} domain={shopConfig.domain}/>

            {/* BODY CONTENT */}
            {children}
          </div>
          {/* SMALL DEVICE BOTTOM NAVIGATION */}
          <MobileNavigationBar domain={shopConfig.domain} locale={lng}/>
          <Footer/>
      </AccountProvider>
    </>
  );
}

