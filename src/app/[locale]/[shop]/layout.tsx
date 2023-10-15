import { Inter } from "@next/font/google";
import React, {use} from "react";
import { notFound } from "next/navigation";
import { TRPCProvider } from "providers/trpcProvider";
import MuiTheme from "theme/MuiTheme";
import SnackbarProvider from "providers/SnackbarProvider";
import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import { getShop } from "server/handlers/shop/getShop";
import { getEnvSafely } from "env/config";
import AccountProvider from "providers/AccountProvider";
import Box from "@mui/material/Box";
import Footer from "components/client/Footer";
import { MobileNavigationBar } from "components/client/mobile-navigation";
import { getCurrentUser } from "lib/getCurrentUser";
import { ShopDescriptions } from "@prisma/client";
import getMessages from "i18n/getMessages";
import StoreInitializer from "stores/store-initializer";
import Navbar from "components/client/navbar/Navbar";
import TopBar from "components/client/TopBar";
import Header from "components/client/Header";
import { useStore } from "stores";
import { fetchAllCategoriesParentWithGroup } from "server/handlers/categories/fetchAllCategoriesParentWithGroup";
import { cookies } from "next/headers";
import SetStoreIdAction from "actions/SetStoreIdAction";
import { getCartByCustomerId } from "server/handlers/carts/getCartByCustomerId";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
type Props = {
    children: ReactNode;
    params: {
      locale: string,
      shop: string
    };
};

export async function generateStaticParams() {
    return ['en', 'vi'].map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale,shop}}: Props) {
    const shopInfo = await getShop({description:true},shop);
    if(!shopInfo){
      notFound();
    }
    const {favicon} = shopInfo;
    const shopDesc = shopInfo.description.filter((item:ShopDescriptions) => item.lang === locale);
    const {title} = shopDesc[0];
    const {description} = shopDesc[0];
    return {
        metadataBase: new URL(getEnvSafely('NEXT_PUBLIC_URL')),
        title: {
          default: `${title}`,
          template: `%s | ${title}`,
        },
        description,
        verification: {
          google: 'google-site-verification=878787878'
        },
        icons: {
          icon: getEnvSafely('NEXT_PUBLIC_URL')+favicon,
        }
    };
}

export const dynamic = 'auto';

export default function ShopListLayout({children, params: {locale,shop}}: Props) {
    const shopInclude = {
      description: true,
      address: true,
      configs: true,
      languages: true,
      currencies: true,
      brand:true,
      attribute_group:true,
      categories: true,
    }
    const shopInfo = use(getShop(shopInclude,shop));
    if(!shopInfo){
      notFound();
    }
    const shopCategory = use(fetchAllCategoriesParentWithGroup(shopInfo.id,shop));
    const initShopConfig = {
      shopCategory,
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
        language: locale,
      },
      shopBrands: shopInfo.brand,
      shopAGroupP: shopInfo.attribute_group,
    }
    const messages = use(getMessages(locale));
    async function setShopId() {
      "use server"
      cookies().set('store_id', String(shopInfo?.id))
    }
    const account = use(getCurrentUser());
    if(account !== undefined && account !== null){
      const carts = use(getCartByCustomerId(account.id,account.store_id));
      const objCart = {};
      objCart[shop] = carts;
      initShopConfig['shopCarts'] = objCart;
    }
    useStore.setState(initShopConfig);
    return (
      <html lang={locale} className={inter.variable}>
        <body>
          <TRPCProvider>
              <MuiTheme>
                <SnackbarProvider>
                    <SetStoreIdAction setshopId={setShopId} />
                    <NextIntlClientProvider locale={locale} messages={messages}>
                      <AccountProvider account={account} >
                        <StoreInitializer initialStore={initShopConfig}>
                          {/* HEADER */}
                          <TopBar infomation={initShopConfig.shopInfo} locales={initShopConfig.shopLocale} language={true} currency={true}/>
                          <Header infomation={initShopConfig.shopInfo} locale={locale} dynamic={true}/>
                          <div className="section-after-sticky">
                            {/* NAVIGATION BAR */}
                            <Navbar locale={locale} categories={shopCategory} shop={shop}/>
                            {/* BODY CONTENT */}
                            <Box
                                sx={{
                                  minHeight: "70vh",
                                  backgroundColor: "#ffffff",
                                  overFlow: "hidden",
                                }}
                            >
                              {children}
                            </Box>
                          </div>
                          {/* SMALL DEVICE BOTTOM NAVIGATION */}
                          <MobileNavigationBar domain={shop} locale={locale}/>
                          <Footer/>
                        </StoreInitializer>
                      </AccountProvider>
                    </NextIntlClientProvider>
                </SnackbarProvider>
              </MuiTheme>
          </TRPCProvider>
        </body>
      </html>
    );
}