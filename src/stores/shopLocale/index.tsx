
export const createShopLocaleStore = (set, get) => ({
  shopLocale: {},
  setLocale: (type:string,code:string) => {
    const { shopLocale } = get();
    if(type === 'language'){
      shopLocale.language = code;
    }else{
      shopLocale.currency = code;
    }
    set(shopLocale);
  },
});
