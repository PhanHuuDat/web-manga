import type enCommon from './locales/en/common.json';
import type enHome from './locales/en/home.json';
import type enAuth from './locales/en/auth.json';
import type enManga from './locales/en/manga.json';
import type enReader from './locales/en/reader.json';
import type enComment from './locales/en/comment.json';

export type CommonTranslations = typeof enCommon;
export type HomeTranslations = typeof enHome;
export type AuthTranslations = typeof enAuth;
export type MangaTranslations = typeof enManga;
export type ReaderTranslations = typeof enReader;
export type CommentTranslations = typeof enComment;

export type TranslationResources = {
  common: CommonTranslations;
  home: HomeTranslations;
  auth: AuthTranslations;
  manga: MangaTranslations;
  reader: ReaderTranslations;
  comment: CommentTranslations;
};

// Augment i18next types for type-safe translations
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: TranslationResources;
  }
}
