import { Inter } from "@next/font/google";
import React from "react";
import { notFound } from "next/navigation";
import { TRPCProvider } from "providers/trpcProvider";
import MuiTheme from "theme/MuiTheme";
import SnackbarProvider from "providers/SnackbarProvider";
import {ReactNode} from 'react';
import {createTranslator, NextIntlClientProvider} from 'next-intl';
import TopbarSCP from "components/server/TopbarSCP";
import Header from "components/client/Header";
import NavbarSCP from "components/server/NavbarSCP";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
type Props = {
    children: ReactNode;
    params: {locale: string};
};

async function getMessages(locale: string) {
    try {
        return (await import(`../../../i18n/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}

export async function generateStaticParams() {
    return ['en', 'vi'].map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: Props) {
    const messages = await getMessages(locale);
  
    // You can use the core (non-React) APIs when you have to use next-intl
    // outside of components. Potentially this will be simplified in the future
    // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
    const t = createTranslator({locale, messages});
  
    return {
        title: t('Ecommflex.title'),
        description: t('Ecommflex.description'),
    };
}

export default async function LocaleLayout({children, params: {locale}}: Props) {
    const messages = await getMessages(locale);
    return (
    <html lang={locale} className={inter.variable}>
      <body>
        <TRPCProvider>
            <MuiTheme>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <SnackbarProvider>
                        {/* TOPBAR */}
                        <TopbarSCP locale={locale}/>
                        {/* HEADER */}
                        <Header/>
                        <div className="section-after-sticky">
                            <NavbarSCP locale={locale} />
                            {children}
                        </div>
                    </SnackbarProvider>
                </NextIntlClientProvider>
            </MuiTheme>
        </TRPCProvider>
      </body>
    </html>
  );
}