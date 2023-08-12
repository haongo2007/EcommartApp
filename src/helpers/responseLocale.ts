import { ShopLocal } from "../types/shop";


export const responseLocale = (data: ShopLocal) =>({
  ...data,
  currency: data.currencies ? data.currencies[0].code : null,
  language: data.languages ? data.languages[0].code : null,
});