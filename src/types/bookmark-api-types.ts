/** Bookmark API types matching backend DTOs. */

export interface ToggleBookmarkResponse {
  isBookmarked: boolean;
  bookmarkId: string | null;
}

export interface BookmarkDto {
  id: string;
  mangaSeriesId: string;
  mangaTitle: string;
  coverUrl: string | null;
  createdAt: string;
}
