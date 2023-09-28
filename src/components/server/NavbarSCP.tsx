import Navbar from "components/client/navbar/Navbar";
import { use } from "react";
import { fetchAllCategoriesParentWithGroup } from "server/handlers/categories/fetchAllCategoriesParentWithGroup";
import { useStore } from "stores";
import StoreInitializer from "stores/store-initializer";


const NavbarSCP = ({locale,store_id,store_name}:{locale:string,store_id?:number,store_name?:string}) => {
    const shopCategory = use(fetchAllCategoriesParentWithGroup(store_id,store_name));
    const initCategory = {
        shopCategory,
    }
    useStore.setState(initCategory);
    return (
        <>
            <StoreInitializer initialStore={initCategory}>
                <Navbar elevation={0} border={1} hideHorizontalCategories={true} domain={""} locale={locale} />
            </StoreInitializer>
        </>
    );
};

export default NavbarSCP;
