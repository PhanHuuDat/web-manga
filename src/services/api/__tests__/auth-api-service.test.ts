import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from '../auth-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = vi.mocked(apiClient);

describe('auth-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('sends login request with correct body', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };
      const mockResponse = {
        data: {
          accessToken: 'jwt-token',
          expiresAt: '2026-02-17T12:00:00Z',
          userId: 'user-1',
          username: 'testuser',
          displayName: 'Test User',
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await authApi.login(loginData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/login', loginData);
      expect(result).toEqual(mockResponse.data);
    });

    it('throws error on invalid credentials', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid credentials'));

      await expect(authApi.login({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('sends register request with correct body', async () => {
      const registerData = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
      };
      mockApiClient.post.mockResolvedValue({ data: undefined });

      const result = await authApi.register(registerData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/register', registerData);
      expect(result).toBeUndefined();
    });

    it('throws error on invalid register data', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Email already exists'));

      await expect(
        authApi.register({
          email: 'existing@example.com',
          password: 'password123',
          username: 'newuser',
        }),
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('refreshToken', () => {
    it('sends refresh token request', async () => {
      const mockResponse = {
        data: {
          accessToken: 'new-jwt-token',
          expiresAt: '2026-02-17T12:00:00Z',
          userId: 'user-1',
          username: 'testuser',
          displayName: 'Test User',
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await authApi.refreshToken();

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/refresh');
      expect(result).toEqual(mockResponse.data);
    });

    it('throws error on token refresh failure', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Token expired'));

      await expect(authApi.refreshToken()).rejects.toThrow('Token expired');
    });
  });

  describe('logout', () => {
    it('sends logout request', async () => {
      mockApiClient.post.mockResolvedValue({ data: undefined });

      const result = await authApi.logout();

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/logout');
      expect(result).toBeUndefined();
    });
  });

  describe('getCurrentUser', () => {
    it('fetches current user profile', async () => {
      const mockUserProfile = {
        id: 'user-1',
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        avatarUrl: null,
        level: 1,
        roles: ['Reader'],
        emailConfirmed: true,
      };
      mockApiClient.get.mockResolvedValue({ data: mockUserProfile });

      const result = await authApi.getCurrentUser();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/me');
      expect(result).toEqual(mockUserProfile);
    });

    it('throws error when user not authenticated', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Unauthorized'));

      await expect(authApi.getCurrentUser()).rejects.toThrow('Unauthorized');
    });
  });

  describe('verifyEmail', () => {
    it('sends email verification request', async () => {
      mockApiClient.post.mockResolvedValue({ data: undefined });

      const result = await authApi.verifyEmail('verify-token-123', 'user-1');

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/verify-email', {
        token: 'verify-token-123',
        userId: 'user-1',
      });
      expect(result).toBeUndefined();
    });

    it('throws error on invalid token', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid token'));

      await expect(authApi.verifyEmail('invalid-token', 'user-1')).rejects.toThrow('Invalid token');
    });
  });

  describe('forgotPassword', () => {
    it('sends forgot password request', async () => {
      mockApiClient.post.mockResolvedValue({ data: undefined });

      const result = await authApi.forgotPassword('test@example.com');

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/forgot-password', {
        email: 'test@example.com',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    it('sends reset password request', async () => {
      const resetData = {
        token: 'reset-token-123',
        newPassword: 'newpassword123',
      };
      mockApiClient.post.mockResolvedValue({ data: undefined });

      const result = await authApi.resetPassword(resetData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/reset-password', resetData);
      expect(result).toBeUndefined();
    });

    it('throws error on invalid reset token', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid reset token'));

      await expect(
        authApi.resetPassword({
          token: 'invalid-token',
          newPassword: 'newpassword123',
        }),
      ).rejects.toThrow('Invalid reset token');
    });
  });
});
