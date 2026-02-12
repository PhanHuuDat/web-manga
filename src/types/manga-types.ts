export interface Manga {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  author: string;
  genres: string[];
  latestChapter: number;
  totalChapters: number;
  views: number;
  updatedAt: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  badge?: 'hot' | 'top' | 'new';
}

export interface MangaDetail extends Manga {
  artist?: string;
  synopsis: string;
  rating: number;
  ratingCount: number;
  bannerUrl?: string;
  alternativeTitles?: string[];
  publishedYear?: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title?: string;
  slug: string;
  publishedAt: string;
  pages: number;
  views: number;
}

export interface ChapterDetail extends Chapter {
  mangaId: string;
  mangaTitle: string;
  mangaSlug: string;
  images: ChapterPage[];
  prevChapter?: { chapterNumber: number; slug: string };
  nextChapter?: { chapterNumber: number; slug: string };
}

export interface ChapterPage {
  pageNumber: number;
  imageUrl: string;
}

export interface MangaRanked extends Manga {
  rank: number;
  viewsFormatted: string;
}

export type ViewPeriod = 'daily' | 'weekly' | 'monthly';
export type ReadingMode = 'vertical' | 'horizontal';
export type PageLayout = 'single' | 'double';
