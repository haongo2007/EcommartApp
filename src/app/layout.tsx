import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { TRPCProvider } from "../providers/trpcProvider";
import React from "react";
import MuiTheme from "../theme/MuiTheme";
import SnackbarProvider from "../providers/SnackbarProvider";
import {Metadata} from "next";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'An e-commerce web application | Ecommflex',
  description: 'React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store'
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
    <html lang="vi" className={inter.variable}>
      <body>
        <TRPCProvider>
            <MuiTheme>
                <SnackbarProvider>
                  {children}
                </SnackbarProvider>
            </MuiTheme>
        </TRPCProvider>
      </body>
    </html>
  );
}
