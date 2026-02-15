export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  level: number;
  isOnline: boolean;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
  displayName: string | null;
  email: string;
  avatarUrl: string | null;
  roles: string[];
  emailConfirmed: boolean;
}
