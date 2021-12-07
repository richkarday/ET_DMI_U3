import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./translations/en.json"
import es from "./translations/es.json"
const userLanguage = window.navigator.userLanguage || window.navigator.language;

const resources = {
    en,
    es
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage,
    interpolation: {
      escapeValue: false
    }
  });


export default i18n;