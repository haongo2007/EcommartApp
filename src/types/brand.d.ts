import {ShopBrand} from "@prisma/client";

export interface ShopBrandTypeClient extends Omit<ShopBrand> {
    id:number;
    slug:string;
    name:string;
    image:string;
}

export type ShopBrandListType = ShopBrandTypeClient[];