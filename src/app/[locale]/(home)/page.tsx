import { SHOP_PER_PAGE } from "../../../constants";
import { fetchShops } from "server/handlers/shop/fetchShops";
import { use } from "react";
import ShopListSection from "components/client/sections/ShopSection/ShopList";

export default function Home({params:{locale}}:{params:{locale:string}}) {
    const shop = use(fetchShops(SHOP_PER_PAGE));
    return (
        <>
            <ShopListSection locale={locale} total={shop.total} data={shop.data}/>
        </>
    );
}