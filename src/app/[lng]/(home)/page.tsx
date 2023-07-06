import {Fragment, use} from "react";
import ShopListSection from "../../../components/sections/ShopList";
import {fetchShops} from "../../../server/handlers/shop/fetchShops";
import {SHOP_PER_PAGE} from "../../../constants";

export default function Home({ params: { lng } }: {params:{lng:string}}) {
    const shop = use(fetchShops(SHOP_PER_PAGE));
    return (
        <Fragment>
            <ShopListSection lng={lng} total={shop.total} data={shop.data}/>
        </Fragment>
    );
}
