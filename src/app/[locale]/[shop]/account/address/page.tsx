import AddressDashboard from "components/account/AddressDashboard";
import { Metadata } from "next";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Address',
}
  
export default function Address({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <AddressDashboard locale={lng} domain={shop}/>
  );
};