import WishListDashboard from "components/client/account/WishListDashboard";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { PageDefaultProps } from "types/types";
  
export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.account.wish_list'),
      description: t('Ecommflex.description'),
  };
}

export default function WishListAccount({ params }: PageDefaultProps){
  const {locale,shop} = params;
  return (
    <WishListDashboard locale={locale} domain={shop}/>
  );
};