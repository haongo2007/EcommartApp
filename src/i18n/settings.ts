import {APP_INFOMATION} from "../constants";

export const fallbackLng = APP_INFOMATION.language;
export const languages = APP_INFOMATION.languages.map((item) => item.code);
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}
