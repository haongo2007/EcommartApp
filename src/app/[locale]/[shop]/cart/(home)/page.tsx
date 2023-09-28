import { Metadata } from "next";
import { PageDefaultProps } from "types/types";
import CartDashboard from "components/cart/CartDashboard";

export const metadata: Metadata = {
    title: 'Cart',
}
  
export default function LoginPage({ params }: PageDefaultProps){
    const {lng,shop} = params;
    return (
        <CartDashboard locale={lng} domain={shop}/>
    );
};