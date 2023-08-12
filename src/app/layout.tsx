import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { TRPCProvider } from "../providers/trpcProvider";
import React, { use } from "react";
import MuiTheme from "../theme/MuiTheme";
import SnackbarProvider from "../providers/SnackbarProvider";
import {Metadata} from "next";
import AccountProvider from "providers/AccountProvider";
import { getCurrentUser } from "lib/getCurrentUser";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'An e-commerce web application | Ecommflex',
  description: 'React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store'
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    const account = use(getCurrentUser());
    return (
    <html lang="vi" className={inter.variable}>
      <body>
        <AccountProvider account={account} >
          <TRPCProvider>
              <MuiTheme>
                  <SnackbarProvider>
                    {children}
                  </SnackbarProvider>
              </MuiTheme>
          </TRPCProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
