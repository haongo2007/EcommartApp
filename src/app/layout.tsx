import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { TRPCProvider } from "../providers/trpcProvider";
import React from "react";
import MuiTheme from "../theme/MuiTheme";
import SnackbarProvider from "../providers/SnackbarProvider";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
    <html lang="vi" className={inter.variable}>
      <head />
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
