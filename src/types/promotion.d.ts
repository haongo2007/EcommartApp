import {ShopProductPromotion} from "@prisma/client";

export interface PromoTypeClient extends Omit<ShopProductPromotion, "createdAt" | "updatedAt" | "dateStart" | "dateEnd"> {
    createdAt: any;
    updatedAt: any | null;
    dateStart: any | null;
    dateEnd: any | null;
}