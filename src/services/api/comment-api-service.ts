import apiClient from './axios-instance';
import type { PagedResponse } from '../../types/api-types';
import type {
  CommentDto,
  CreateCommentRequest,
  UpdateCommentRequest,
  ToggleReactionResponse,
  ListCommentsParams,
} from '../../types/comment-api-types';

export const commentApi = {
  create: (data: CreateCommentRequest) =>
    apiClient
      .post<{ id: string }>('/api/comments', data)
      .then((r) => r.data),

  list: (params: ListCommentsParams = {}) =>
    apiClient
      .get<PagedResponse<CommentDto>>('/api/comments', { params })
      .then((r) => r.data),

  update: (id: string, data: UpdateCommentRequest) =>
    apiClient.put(`/api/comments/${id}`, data),

  remove: (id: string) =>
    apiClient.delete(`/api/comments/${id}`),

  toggleReaction: (commentId: string, reactionType: number) =>
    apiClient
      .post<ToggleReactionResponse>(`/api/comments/${commentId}/reactions`, { reactionType })
      .then((r) => r.data),
};
