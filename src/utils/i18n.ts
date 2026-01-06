import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as english from '@locales/en/en.json';
import * as french from '@locales/fr/fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...english,
      },
    },
    fr: {
      translation: {
        ...french,
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
