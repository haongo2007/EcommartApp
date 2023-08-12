import AccountDashboard from "components/account/AccountDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Account',
}
  
export default function Account({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <AccountDashboard locale={lng} domain={shop}/>
  );
};