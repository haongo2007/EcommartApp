import ShopListSection from "components/client/sections/ShopSection/ShopList";
import { SHOP_PER_PAGE } from "../../../constants";
import { use } from "react";
import { fetchShops } from "server/handlers/shop/fetchShops";

const ShopListSCP = ({locale}:{locale:string}) => {
    const shop = use(fetchShops(SHOP_PER_PAGE));

    return (
        <>
            <ShopListSection locale={locale} total={shop.total} data={shop.data}/>
        </>
    );
};

export default ShopListSCP;
