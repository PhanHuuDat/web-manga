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

export interface MangaRanked extends Manga {
  rank: number;
  viewsFormatted: string;
}

export type ViewPeriod = 'daily' | 'weekly' | 'monthly';
