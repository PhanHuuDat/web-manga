/** Genre API response types matching backend DTOs exactly. */

/** Matches backend GenreWithCountDto record. */
export interface GenreWithCountDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mangaCount: number;
}
