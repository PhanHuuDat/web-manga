import apiClient from './axios-instance';
import type { PagedResponse, ListParams } from '../../types/api-types';
import type {
  ReadingHistoryDto,
  ResumePointDto,
  UpsertReadingProgressRequest,
} from '../../types/reading-history-api-types';

export const readingHistoryApi = {
  upsert: (data: UpsertReadingProgressRequest) =>
    apiClient
      .post<{ id: string }>('/api/reading-history', data)
      .then((r) => r.data),

  list: (params: ListParams = {}) =>
    apiClient
      .get<PagedResponse<ReadingHistoryDto>>('/api/reading-history', { params })
      .then((r) => r.data),

  getResumePoint: (mangaId: string) =>
    apiClient
      .get<ResumePointDto | null>(`/api/reading-history/${mangaId}`)
      .then((r) => r.data),

  clear: (mangaId: string) =>
    apiClient.delete(`/api/reading-history/${mangaId}`),
};
