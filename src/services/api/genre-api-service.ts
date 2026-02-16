import apiClient from './axios-instance';
import type { GenreWithCountDto } from '../../types/genre-api-types';

export const genreApi = {
  list: () =>
    apiClient
      .get<GenreWithCountDto[]>('/api/genres')
      .then((r) => r.data),
};
