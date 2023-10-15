import { PageDefaultProps } from "types/types";
import CartDashboard from "components/client/cart/CartDashboard";
import { createTranslator } from "next-intl";
import getMessages from "i18n/getMessages";

export async function generateMetadata({params: {locale}}: PageDefaultProps) {
    const messages = await getMessages(locale);
    const t = createTranslator({locale, messages});
    return {
        title: t('Meta.title.cart.index'),
        description: t('Ecommflex.description'),
    };
}

export default function CartPage({ params }: PageDefaultProps){
    const {locale,shop} = params;
    return (
        <CartDashboard locale={locale} domain={shop}/>
    );
};