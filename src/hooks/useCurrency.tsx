"use client";

import { Decimal } from "@prisma/client/runtime";

const useCurrency = (price: number | Decimal,promo?: number | object) => {
    // const { state } = JSON.parse(localStorage.getItem('shopState'));
    // if(promo){
    //     if(typeof promo === 'object' && promo.length > 0){
    //         promo = promo[0].discount_percent;
    //     };
    //     price = Number((price - price * (promo / 100)).toFixed(2));
    // }
    // const { shopLocale,shopInfo } = state;

    // if (shopInfo.currency !== shopLocale.currency){
    //     const indexOldCur = shopLocale.currencies.findIndex((item) => item.code === shopInfo.currency);
    //     if (indexOldCur >= 0){
    //         price = price / shopLocale.currencies[indexOldCur].exchange_rate;
    //     }
    // }

    const formatCurrency = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: 'VND',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
    return formatCurrency.format(price);
};
export default useCurrency;