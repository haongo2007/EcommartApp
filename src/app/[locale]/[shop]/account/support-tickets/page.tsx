import SupportTicketsDashboard from "components/client/account/SupportTicketsDashboard";
import getMessages from "i18n/getMessages";
import { createTranslator } from "next-intl";
import { PageDefaultProps } from "types/types";
  
export async function generateMetadata({params: {locale}}: PageDefaultProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.account.support_tickets'),
      description: t('Ecommflex.description'),
  };
}

export default function SupportTicketsAccount({ params }: PageDefaultProps){
  const {lng,shop} = params;
  return (
    <SupportTicketsDashboard locale={lng} domain={shop}/>
  );
};