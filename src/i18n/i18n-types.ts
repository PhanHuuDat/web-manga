import type enCommon from './locales/en/common.json';
import type enHome from './locales/en/home.json';

export type CommonTranslations = typeof enCommon;
export type HomeTranslations = typeof enHome;

export type TranslationResources = {
  common: CommonTranslations;
  home: HomeTranslations;
};

// Augment i18next types for type-safe translations
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: TranslationResources;
  }
}
