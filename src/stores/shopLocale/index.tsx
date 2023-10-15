interface LocaleState {
  shopLocale: {
    language?: string;
    currency?: string;
  };
  setCurrency: (code: string) => void;
}

export const createShopLocaleStore = (
  set: (value: LocaleState) => void,
  get: () => LocaleState
) => ({
  shopLocale: {} as Partial<LocaleState['shopLocale']>,
  setCurrency: (code: string) => {
    const { shopLocale } = get();
    shopLocale.currency = code;
    set({ ...get(), shopLocale }); // Update the entire LocaleState
  },
}) as LocaleState;