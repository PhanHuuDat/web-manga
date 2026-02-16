import apiClient from './axios-instance';
import type {
  ChapterDetailDto,
  CreateChapterRequest,
  UpdateChapterRequest,
} from '../../types/chapter-api-types';

export const chapterApi = {
  get: (id: string) =>
    apiClient
      .get<ChapterDetailDto>(`/api/chapters/${id}`)
      .then((r) => r.data),

  create: (data: CreateChapterRequest) =>
    apiClient
      .post<string>('/api/chapters', data)
      .then((r) => r.data),

  update: (id: string, data: UpdateChapterRequest) =>
    apiClient.put(`/api/chapters/${id}`, data).then(() => undefined),

  delete: (id: string) =>
    apiClient.delete(`/api/chapters/${id}`).then(() => undefined),
};
