/** Chapter API response types matching backend DTOs exactly. */

/** Matches backend ChapterPageDto record. */
export interface ChapterPageDto {
  id: string;
  pageNumber: number;
  imageUrl: string;
  scrambleSeed: number | null;
  scrambleGridSize: number | null;
}

/** Matches backend ChapterDetailDto record. */
export interface ChapterDetailDto {
  id: string;
  mangaSeriesId: string;
  mangaTitle: string;
  chapterNumber: number;
  title: string | null;
  slug: string;
  publishedAt: string;
  pages: ChapterPageDto[];
  views: number;
  createdAt: string;
}

/** Body for POST /api/chapters (create). */
export interface CreateChapterRequest {
  mangaSeriesId: string;
  chapterNumber: number;
  title?: string;
  publishedAt: string;
  pageImageIds: string[];
}

/** Body for PUT /api/chapters/:id (update). */
export interface UpdateChapterRequest {
  title?: string;
  publishedAt?: string;
  pageImageIds?: string[];
}
