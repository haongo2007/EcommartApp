import React, {use} from "react";
import CartContextProvider from "../../../providers/CartContextProvider";
import {NextAuthProvider} from "../../../providers/SessionProvider";
import Topbar from "../../../components/topbar";
import Sticky from "../../../components/sticky";
import Header from "../../../components/Header";
import Navbar from "../../../components/navbar/Navbar";
import {fetchAllCategories} from "../../../server/handlers/categories/fetchAllCategories";
import {StoreInitializer} from "../../../stores/store-initializer";
import { APP_INFOMATION } from "../../../constants";

export default function ShopListLayout({ children, params : { lng }}: {children: React.ReactNode, params: { lng: string}}) {
    const shopCategory = use(fetchAllCategories());
    const locally = {
        languages: APP_INFOMATION.languages,
        language: lng,
    };
    const dataInit = {
        shopCategory,
        shopLocale: locally,
    }
    return (
        <NextAuthProvider>
            <StoreInitializer initialStore={dataInit} />
            <CartContextProvider>
                {/* TOPBAR */}
                <Topbar useCurrency={false}/>
                {/* HEADER */}
                <Sticky fixedOn={0} scrollDistance={300}>
                    <Header/>
                </Sticky>
                <div className="section-after-sticky">
                    {/* NAVIGATION BAR */}
                    <Navbar data={shopCategory} elevation={0} border={1} hideHorizontalCategories={true} />

                    {/* BODY CONTENT */}
                    {children}
                </div>
            </CartContextProvider>
        </NextAuthProvider>
    );
}
