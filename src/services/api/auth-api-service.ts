import apiClient from './axios-instance';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UserProfile,
} from '../../types/auth-types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/api/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post('/api/auth/register', data).then(() => undefined),

  refreshToken: () =>
    apiClient.post<AuthResponse>('/api/auth/refresh').then((r) => r.data),

  logout: () => apiClient.post('/api/auth/logout').then(() => undefined),

  getCurrentUser: () =>
    apiClient.get<UserProfile>('/api/auth/me').then((r) => r.data),

  verifyEmail: (token: string, userId: string) =>
    apiClient
      .post('/api/auth/verify-email', { token, userId })
      .then(() => undefined),

  forgotPassword: (email: string) =>
    apiClient
      .post('/api/auth/forgot-password', { email })
      .then(() => undefined),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/api/auth/reset-password', data).then(() => undefined),
};
