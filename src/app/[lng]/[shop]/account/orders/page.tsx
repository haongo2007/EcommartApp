import OrdersDashboard from "components/account/OrdersDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Orders',
}
  
export default function Orders({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <OrdersDashboard locale={lng} domain={shop}/>
  );
};