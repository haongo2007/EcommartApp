import TopBar from "components/client/TopBar";
import { use } from "react";
import { getLocale } from "server/handlers/locale/getLocale";
import { useStore } from "stores";
import StoreInitializer from "stores/store-initializer";


const TopbarSCP = ({locale}:{locale:string}) => {
    const shopLocale = use(getLocale());
    shopLocale.language = locale;
    const initLocale = {
        shopLocale,
    }
    useStore.setState(initLocale);
    return (
        <>
            <StoreInitializer initialStore={initLocale}>
                <TopBar/>
            </StoreInitializer>
        </>
    );
};

export default TopbarSCP;
