import AddressDashboard from "components/client/account/AddressDashboard";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { PageDefaultProps } from "types/types";
  
export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.account.address'),
      description: t('Ecommflex.description'),
  };
}

export default function AddressAccount({ params }: PageDefaultProps){
  const {locale,shop} = params;
  return (
    <AddressDashboard locale={locale} domain={shop}/>
  );
};