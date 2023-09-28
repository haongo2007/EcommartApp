import PaymentDashboard from "components/account/PaymentDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Payment',
}
  
export default function Payment({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <PaymentDashboard locale={lng} domain={shop}/>
  );
};