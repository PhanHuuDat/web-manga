import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import viCommon from './locales/vi/common.json';
import viHome from './locales/vi/home.json';

// Import types for augmentation
import './i18n-types';

const resources = {
  en: { common: enCommon, home: enHome },
  vi: { common: viCommon, home: viHome },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
