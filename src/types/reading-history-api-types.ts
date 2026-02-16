/** Reading history API types matching backend DTOs. */

export interface ReadingHistoryDto {
  id: string;
  mangaSeriesId: string;
  mangaTitle: string;
  coverUrl: string | null;
  chapterId: string;
  chapterTitle: string | null;
  chapterNumber: number;
  lastPageNumber: number;
  lastReadAt: string;
}

export interface ResumePointDto {
  chapterId: string;
  chapterTitle: string | null;
  chapterNumber: number;
  lastPageNumber: number;
}

export interface UpsertReadingProgressRequest {
  mangaSeriesId: string;
  chapterId: string;
  lastPageNumber: number;
}
