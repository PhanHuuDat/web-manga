import apiClient from './axios-instance';
import type { PagedResponse, ListParams } from '../../types/api-types';
import type { ToggleBookmarkResponse, BookmarkDto } from '../../types/bookmark-api-types';

export const bookmarkApi = {
  toggle: (mangaSeriesId: string) =>
    apiClient
      .post<ToggleBookmarkResponse>('/api/bookmarks', { mangaSeriesId })
      .then((r) => r.data),

  list: (params: ListParams = {}) =>
    apiClient
      .get<PagedResponse<BookmarkDto>>('/api/bookmarks', { params })
      .then((r) => r.data),

  check: (mangaId: string) =>
    apiClient
      .get<{ isBookmarked: boolean }>(`/api/bookmarks/check/${mangaId}`)
      .then((r) => r.data.isBookmarked),

  remove: (id: string) =>
    apiClient.delete(`/api/bookmarks/${id}`),
};
