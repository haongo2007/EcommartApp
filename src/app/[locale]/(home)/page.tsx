
import ShopListSCP from "components/server/contain/ShopListSCP";

export default async function Home({params:{locale}}:{params:{locale:string}}) {
    return (
        <>
            <ShopListSCP locale={locale}/>
        </>
    );
}