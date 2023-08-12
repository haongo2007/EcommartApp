import AccountEdit from "components/account/AccountEdit";
import { getCurrentUser } from "lib/getCurrentUser";
import { Metadata } from "next";
import { PageDefaultProps,AccountPageEditProps } from "types/types";
import { use } from "react";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
    title: 'Account',
}
export async function generateMetadata({ params: { lng,shop,name } }: AccountPageEditProps): Promise<Metadata> {
    return {
      title: decodeURIComponent(name)
    }
}
  
export default function ProfileEditor({ params: { lng,shop } }: PageDefaultProps){
    const user = use(getCurrentUser());
    if (!user) {
      return notFound();
    }
    return (
        <AccountEdit locale={lng} domain={shop} />
    );
};