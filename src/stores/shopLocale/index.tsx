interface LocaleState {
  shopLocale: {
    language?: string;
    currency?: string;
  };
  setLocale: (type: 'language' | 'currency', code: string) => void;
}

export const createShopLocaleStore = (
  set: (value: LocaleState) => void,
  get: () => LocaleState
) => ({
  shopLocale: {} as Partial<LocaleState['shopLocale']>,
  setLocale: (type: 'language' | 'currency', code: string) => {
    const { shopLocale } = get();
    if (type === 'language') {
      shopLocale.language = code;
    } else {
      shopLocale.currency = code;
    }
    set({ ...get(), shopLocale }); // Update the entire LocaleState
  },
}) as LocaleState;