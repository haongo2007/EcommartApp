import AccountDashboard from "components/client/account/AccountDashboard";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { PageDefaultProps } from "types/types";
 
export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.account.index'),
      description: t('Ecommflex.description'),
  };
}

export default function Account({ params }: PageDefaultProps){
  const {locale,shop} = params;
  return (
    <AccountDashboard locale={locale} domain={shop}/>
  );
};