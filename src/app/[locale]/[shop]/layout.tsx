import React, {use} from "react";
import AccountProvider from "providers/AccountProvider";
import {getShop} from "../../../server/handlers/shop/getShop";
import {Metadata} from "next";
import { getEnvSafely } from "env/config";
import { getCurrentUser } from "lib/getCurrentUser";
import TopbarSCP from "components/server/TopbarSCP";
import Header from "components/client/Header";
import NavbarSCP from "components/server/NavbarSCP";
import StoreInitializer from "stores/store-initializer";
import { notFound } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode,
  params: { lng: string,shop: string }
}

export async function generateMetadata( { children, params : { lng,shop }}: LayoutProps): Promise<Metadata> {
  const shopInfo = await getShop({description:true},shop);
  if(!shopInfo){
    notFound();
  }
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
  const shopInfo = use(getShop(shopInclude,shop));
  if(!shopInfo){
    notFound();
  }
  const account = use(getCurrentUser());

  const initShopConfig = {
    shopConfig: shopInfo.configs,
    shopInfo: {
      email: shopInfo.email,
      phone: shopInfo.phone,
      language: shopInfo.language,
      currency: shopInfo.currency,
      logo: shopInfo.logo,
      favicon: shopInfo.favicon,
      domain: shopInfo.domain,
    },
    shopLocale: {
      languages: shopInfo.languages,
      currencies: JSON.parse(JSON.stringify(shopInfo.currencies)),
      currency: shopInfo.currency,
      language: lng,
    },
    shopBrands: shopInfo.brand,
    shopBanner: shopInfo.banner,
    shopAGroupP: shopInfo.attribute_group,
  }

  // if(account !== undefined && account !== null){
  //   const carts = use(getCartByCustomerId(account.id,account.store_id));
  //   const objCart = {};
  //   objCart[shop] = carts;
  //   dataInit['shopCarts'] = objCart;
  // }
  return (
    <>
      <AccountProvider account={account} >
        <StoreInitializer initialStore={initShopConfig} >
          {/* TOPBAR */}
          <TopbarSCP lng={lng} />
          {/* HEADER */}
          <Header/>
          {/* <div className="section-after-sticky"> */}
            {/* NAVIGATION BAR */}
            <NavbarSCP lng={lng} store_id={shopInfo.id} store_name={shop}/>

            {/* BODY CONTENT */}
            {/* <Box
                sx={{
                  minHeight: "70vh",
                  backgroundColor: "#ffffff",
                  overFlow: "hidden",
                }}
              >
              {children}
            </Box> */}
          {/* </div> */}
          {/* SMALL DEVICE BOTTOM NAVIGATION */}
          {/* <MobileNavigationBar domain={shopConfig.domain} locale={lng}/> */}
          {/* <Footer/> */}
        </StoreInitializer>
      </AccountProvider>
    </>
  );
}

