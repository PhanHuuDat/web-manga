export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export type GenreId =
  | 'action'
  | 'adventure'
  | 'comedy'
  | 'drama'
  | 'fantasy'
  | 'horror'
  | 'mystery'
  | 'romance'
  | 'sci-fi'
  | 'slice-of-life'
  | 'sports'
  | 'supernatural';
