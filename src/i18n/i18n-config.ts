import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAuth from './locales/en/auth.json';
import enManga from './locales/en/manga.json';
import enReader from './locales/en/reader.json';
import enComment from './locales/en/comment.json';
import viCommon from './locales/vi/common.json';
import viHome from './locales/vi/home.json';
import viAuth from './locales/vi/auth.json';
import viManga from './locales/vi/manga.json';
import viReader from './locales/vi/reader.json';
import viComment from './locales/vi/comment.json';
import enAdmin from './locales/en/admin.json';
import viAdmin from './locales/vi/admin.json';

// Import types for augmentation
import './i18n-types';

const resources = {
  en: { common: enCommon, home: enHome, auth: enAuth, manga: enManga, reader: enReader, comment: enComment, admin: enAdmin },
  vi: { common: viCommon, home: viHome, auth: viAuth, manga: viManga, reader: viReader, comment: viComment, admin: viAdmin },
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
