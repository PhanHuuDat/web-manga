import axios from 'axios';
import type { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5087',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Store reference set lazily to avoid circular imports
let getAccessToken: (() => string | null) | null = null;
let onTokenRefreshed: ((token: string) => void) | null = null;
let onRefreshFailed: (() => void) | null = null;

export function setAuthInterceptorCallbacks(callbacks: {
  getAccessToken: () => string | null;
  onTokenRefreshed: (token: string) => void;
  onRefreshFailed: () => void;
}) {
  getAccessToken = callbacks.getAccessToken;
  onTokenRefreshed = callbacks.onTokenRefreshed;
  onRefreshFailed = callbacks.onRefreshFailed;
}

// Request interceptor: attach Authorization header
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 with token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/login');

    if (error.response?.status !== 401 || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await apiClient.post('/api/auth/refresh');
      const newToken = data.accessToken as string;
      onTokenRefreshed?.(newToken);
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      onRefreshFailed?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
