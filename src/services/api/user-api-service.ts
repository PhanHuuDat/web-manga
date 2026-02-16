import apiClient from './axios-instance';

export interface UserStatsResponse {
  bookmarkCount: number;
  historyCount: number;
  commentCount: number;
}

export const userApi = {
  updateProfile: (data: { displayName?: string }) =>
    apiClient.put('/api/users/profile', data).then(() => undefined),

  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient
      .post<{ avatarUrl: string }>('/api/users/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },

  getStats: () =>
    apiClient.get<UserStatsResponse>('/api/users/stats').then((r) => r.data),
};
