import { Shops } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { ShopLocal } from "types/shop";
import { useStore } from "../stores";

const useCurrency = (price: number | Decimal,promo?: number | object | null, shopLocale?: ShopLocal,shopInfo?: Shops) => {
    if(promo){
        if(typeof promo === 'object' && promo.length > 0){
            promo = promo[0].discount_percent;
        };
        price = Number((price - price * (promo / 100)).toFixed(2));
    }
    if(!shopLocale){
        shopLocale = useStore((state) => state.shopLocale);
    }
    if(!shopInfo){
        shopInfo = useStore((state) => state.shopInfo);
    }
    if (shopInfo.currency !== shopLocale.currency){
        const indexOldCur = shopLocale.currencies.findIndex((item) => item.code === shopInfo.currency);
        if (indexOldCur >= 0){
            price = price / shopLocale.currencies[indexOldCur].exchange_rate;
        }
    }
    const formatCurrency = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: shopLocale.currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
    return formatCurrency.format(price);
};
export default useCurrency;
