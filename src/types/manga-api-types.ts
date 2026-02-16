/** Manga API response types matching backend DTOs exactly. */
import type { ListParams } from './api-types';

// Backend enums (serialized as integers) — use `as const` for erasableSyntaxOnly
export const SeriesStatus = {
  Ongoing: 0,
  Completed: 1,
  Hiatus: 2,
} as const;
export type SeriesStatus = (typeof SeriesStatus)[keyof typeof SeriesStatus];

export const MangaBadge = {
  Hot: 0,
  Top: 1,
  New: 2,
} as const;
export type MangaBadge = (typeof MangaBadge)[keyof typeof MangaBadge];

export const MangaSortBy = {
  Latest: 0,
  Rating: 1,
  Views: 2,
  Title: 3,
} as const;
export type MangaSortBy = (typeof MangaSortBy)[keyof typeof MangaSortBy];

/** Matches backend MangaDto record (list view). */
export interface MangaDto {
  id: string;
  title: string;
  coverUrl: string | null;
  authorName: string;
  status: SeriesStatus;
  badge: MangaBadge | null;
  rating: number;
  views: number;
  totalChapters: number;
  publishedYear: number | null;
}

/** Matches backend PersonDto record. */
export interface PersonDto {
  id: string;
  name: string;
  biography: string | null;
  photoUrl: string | null;
}

/** Matches backend GenreDto record. */
export interface GenreDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

/** Matches backend MangaDetailDto record (full detail view). */
export interface MangaDetailDto {
  id: string;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  bannerUrl: string | null;
  author: PersonDto;
  artist: PersonDto | null;
  genres: GenreDto[];
  alternativeTitles: string[];
  status: SeriesStatus;
  badge: MangaBadge | null;
  publishedYear: number | null;
  rating: number;
  ratingCount: number;
  views: number;
  totalChapters: number;
  latestChapterNumber: number;
  createdAt: string;
}

/** Matches backend ChapterDto record (list view). */
export interface ChapterDto {
  id: string;
  chapterNumber: number;
  title: string | null;
  slug: string;
  pages: number;
  views: number;
  publishedAt: string;
}

/** Params for GET /api/manga (list). */
export interface ListMangaParams extends ListParams {
  genreId?: string;
  status?: SeriesStatus;
  sortBy?: MangaSortBy;
}

/** Params for GET /api/manga/search. */
export interface SearchMangaParams extends ListParams {
  q: string;
}

/** Params for GET /api/manga/trending. */
export interface TrendingMangaParams extends ListParams {
  days?: number;
}

/** Body for POST /api/manga (create). */
export interface CreateMangaRequest {
  title: string;
  synopsis?: string;
  authorId: string;
  artistId?: string;
  genreIds: string[];
  status: SeriesStatus;
  publishedYear?: number;
  coverId?: string;
  bannerId?: string;
}

/** Body for PUT /api/manga/:id (update). */
export interface UpdateMangaRequest {
  title?: string;
  synopsis?: string;
  artistId?: string;
  genreIds?: string[];
  status?: SeriesStatus;
  badge?: MangaBadge;
  publishedYear?: number;
  coverId?: string;
  bannerId?: string;
}
