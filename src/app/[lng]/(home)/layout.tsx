import React, {use} from "react";
import Topbar from "../../../components/topbar";
import Sticky from "../../../components/sticky";
import Header from "../../../components/Header";
import Navbar from "../../../components/navbar/Navbar";
import {fetchAllCategoriesParentWithGroup} from "../../../server/handlers/categories/fetchAllCategoriesParentWithGroup";
import {StoreInitializer} from "../../../stores/store-initializer";
import { getLocale } from "server/handlers/locale/getLocale";

export const dynamic = 'force-static'

export default function ShopListLayout({ children, params:{lng} }:{ children: React.ReactNode,params:{lng:string} }) {
    const shopCategory = use(fetchAllCategoriesParentWithGroup());
    const shopLocale = use(getLocale());
    shopLocale.language = lng || null;
    const dataInit = {
        shopCategory,
        shopLocale,
    }
    return (
        <>
            <StoreInitializer initialStore={dataInit} />
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
        </>
    );
}
