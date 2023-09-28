import { ShopLocal } from "../types/shop";


export const responseLocale = (data: ShopLocal) =>({
  ...data,
  currency: data.currencies.length ? data.currencies[0].code : [],
  language: data.languages.length ? data.languages[0].code : [],
});