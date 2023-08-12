import React, {use} from "react";
import Topbar from "components/topbar";
import Sticky from "components/sticky";
import Header from "components/Header";
import Navbar from "components/navbar/Navbar";
import {fetchAllCategories} from "../../../server/handlers/categories/fetchAllCategories";
import {StoreInitializer} from "../../../stores/store-initializer";
import {getShop, getShopMeta} from "../../../server/handlers/shop/getShop";
import {Metadata} from "next";
import Footer from "components/Footer";
import { getEnvSafely } from "env/config";



type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}

export async function generateMetadata( { params }: LayoutProps): Promise<Metadata> {
  const shopMeta = await getShopMeta(params);
  return {
    metadataBase: new URL(getEnvSafely('NEXT_PUBLIC_URL')),
    title: {
      default: `${shopMeta.title}`,
      template: `%s | ${shopMeta.title}`,
    },
    description: shopMeta.description,
    verification: {
      google: 'google-site-verification=878787878'
    },
    icons: {
      icon: getEnvSafely('NEXT_PUBLIC_URL')+shopMeta.favicon,
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
  const shopCategory = use(fetchAllCategories(shopConfig.id,shop));
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
  return (
    <>
      <StoreInitializer initialStore={dataInit} />
        {/* TOPBAR */}
        <Topbar infomation={infomation} useCurrency={true}/>
        {/* HEADER */}
        <Sticky fixedOn={0} scrollDistance={300}>
          <Header infomation={infomation}/>
        </Sticky>
        <div className="section-after-sticky">
          {/* NAVIGATION BAR */}
          <Navbar data={shopCategory} elevation={0} border={1} hideHorizontalCategories={true} />

          {/* BODY CONTENT */}
          {children}
        </div>
        <Footer/>
    </>
  );
}

