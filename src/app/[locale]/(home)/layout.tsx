import { Inter } from "@next/font/google";
import React, { use } from "react";
import { TRPCProvider } from "providers/trpcProvider";
import MuiTheme from "theme/MuiTheme";
import SnackbarProvider from "providers/SnackbarProvider";
import {ReactNode} from 'react';
import {createTranslator, NextIntlClientProvider} from 'next-intl';
import getMessages from "i18n/getMessages";
import { APP_INFOMATION, APP_LOCALES } from "../../../constants";
import TopBar from "components/client/TopBar";
import Header from "components/client/Header";
import { fetchAllCategoriesParentWithGroup } from "server/handlers/categories/fetchAllCategoriesParentWithGroup";
import StoreInitializer from "stores/store-initializer";
import Navbar from "components/client/navbar/Navbar";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
type LocaleProps = {
    children: ReactNode;
    params: {locale: string};
};

export async function generateStaticParams() {
    return ['en', 'vi'].map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: LocaleProps) {
    const messages = await getMessages(locale);
    const t = createTranslator({locale, messages});
  
    return {
        title: t('Ecommflex.title'),
        description: t('Ecommflex.description'),
    };
}

export default function LocaleLayout({children, params: {locale}}: LocaleProps) {
    const messages = use(getMessages(locale));
    const shopCategory = use(fetchAllCategoriesParentWithGroup());
    const shopLocale = APP_LOCALES;
    shopLocale.language = locale;
    const initStore = { shopCategory,shopLocale };
    return (
    <html lang={locale} className={inter.variable}>
      <body>
        <TRPCProvider>
            <MuiTheme>
                <SnackbarProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <StoreInitializer initialStore={initStore}>
                            {/* HEADER */}
                            <TopBar infomation={APP_INFOMATION} locales={shopLocale} language={ true} currency={false}/>
                            <Header infomation={APP_INFOMATION} locale={locale} dynamic={false}/>
                            <div className="section-after-sticky">
                                <Navbar locale={locale} categories={shopCategory} hideHorizontalCategories={true}/>
                                {children}
                            </div>
                        </StoreInitializer>
                    </NextIntlClientProvider>
                </SnackbarProvider>
            </MuiTheme>
        </TRPCProvider>
      </body>
    </html>
  );
}