import { PromoTypeClient} from "../types/promotion";

export const responsePromotion = (promo: PromoTypeClient) => ({
    ...promo,
    createdAt: promo.createdAt.toUTCString(),
    updatedAt: promo.updatedAt?.toUTCString() ?? null,
    dateStart: promo.dateStart.toUTCString(),
    dateEnd:   promo.dateEnd.toUTCString(),
});

export const responsePromotionList = (promoList: PromoTypeClient[]) => promoList.map((promo) => responsePromotion(promo));
