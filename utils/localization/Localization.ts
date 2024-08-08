import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from "../localization/locals/en.json";
import ru from "../localization/locals/ru.json";

const translations = {
    en: en,
    ru: ru,
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

function translate(id: string) : string {
    return i18n.t(id);
}

export default translate;
