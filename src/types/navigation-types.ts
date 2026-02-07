import type { Genre } from './genre-types';

export interface NavbarProps {
  className?: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface GenreDropdownProps {
  genres: Genre[];
  onGenreSelect: (genreId: string) => void;
}

export interface UserMenuProps {
  isAuthenticated?: boolean;
}
