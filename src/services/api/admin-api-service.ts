import apiClient from './axios-instance';
import type { PagedResponse, ListParams } from '../../types/api-types';
import type {
  AdminStatsDto,
  AdminUserDto,
  AdminCommentDto,
  UpdateUserRoleRequest,
  UpdateUserStatusRequest,
} from '../../types/admin-api-types';

export const adminApi = {
  getStats: () =>
    apiClient.get<AdminStatsDto>('/api/admin/stats').then((r) => r.data),

  listUsers: (params: ListParams & { search?: string; role?: string } = {}) =>
    apiClient
      .get<PagedResponse<AdminUserDto>>('/api/admin/users', { params })
      .then((r) => r.data),

  updateUserRole: (userId: string, data: UpdateUserRoleRequest) =>
    apiClient.put(`/api/admin/users/${userId}/role`, data).then(() => undefined),

  updateUserStatus: (userId: string, data: UpdateUserStatusRequest) =>
    apiClient.put(`/api/admin/users/${userId}/status`, data).then(() => undefined),

  listComments: (params: ListParams & { search?: string; userId?: string } = {}) =>
    apiClient
      .get<PagedResponse<AdminCommentDto>>('/api/admin/comments', { params })
      .then((r) => r.data),
};
