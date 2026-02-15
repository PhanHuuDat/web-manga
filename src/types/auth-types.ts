export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  userId: string;
  username: string;
  displayName: string | null;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
  emailConfirmed: boolean;
  roles: string[];
}

export interface ResetPasswordRequest {
  token: string;
  userId: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiError {
  status: number;
  title: string;
  detail: string;
}
