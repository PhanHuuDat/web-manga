import apiClient from './axios-instance';
import type { PagedResponse, ListParams } from '../../types/api-types';
import type {
  MangaDto,
  MangaDetailDto,
  ChapterDto,
  ListMangaParams,
  SearchMangaParams,
  TrendingMangaParams,
  CreateMangaRequest,
  UpdateMangaRequest,
} from '../../types/manga-api-types';

export const mangaApi = {
  list: (params: ListMangaParams = {}) =>
    apiClient
      .get<PagedResponse<MangaDto>>('/api/manga', { params })
      .then((r) => r.data),

  get: (id: string) =>
    apiClient
      .get<MangaDetailDto>(`/api/manga/${id}`)
      .then((r) => r.data),

  create: (data: CreateMangaRequest) =>
    apiClient
      .post<string>('/api/manga', data)
      .then((r) => r.data),

  update: (id: string, data: UpdateMangaRequest) =>
    apiClient.put(`/api/manga/${id}`, data).then(() => undefined),

  delete: (id: string) =>
    apiClient.delete(`/api/manga/${id}`).then(() => undefined),

  getChapters: (id: string, params: ListParams = {}) =>
    apiClient
      .get<PagedResponse<ChapterDto>>(`/api/manga/${id}/chapters`, { params })
      .then((r) => r.data),

  search: (params: SearchMangaParams) =>
    apiClient
      .get<PagedResponse<MangaDto>>('/api/manga/search', { params })
      .then((r) => r.data),

  getTrending: (params: TrendingMangaParams = {}) =>
    apiClient
      .get<PagedResponse<MangaDto>>('/api/manga/trending', { params })
      .then((r) => r.data),
};
