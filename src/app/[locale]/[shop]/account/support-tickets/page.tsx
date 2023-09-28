import SupportTicketsDashboard from "components/account/SupportTicketsDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Support Tickets',
}
  
export default function SupportTickets({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <SupportTicketsDashboard locale={lng} domain={shop}/>
  );
};