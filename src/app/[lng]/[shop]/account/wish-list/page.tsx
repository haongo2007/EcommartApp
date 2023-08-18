import WishListDashboard from "components/account/WishListDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Wish List',
}
  
export default function SupportTickets({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <WishListDashboard locale={lng} domain={shop}/>
  );
};