import OrdersDashboard from "components/client/account/OrdersDashboard";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { PageDefaultProps } from "types/types";
  
export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.account.orders'),
      description: t('Ecommflex.description'),
  };
}

export default function OrdersAccount({ params }: PageDefaultProps){
  const {locale,shop} = params;
  return (
    <OrdersDashboard locale={locale} domain={shop}/>
  );
};