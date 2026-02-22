export interface AdminStatsDto {
  totalManga: number;
  totalChapters: number;
  totalUsers: number;
  totalComments: number;
  newUsersLast7Days: number;
}

export interface AdminUserDto {
  id: string;
  username: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  emailConfirmed: boolean;
  roles: string[];
  createdDate: string;
}

export interface AdminCommentDto {
  id: string;
  content: string;
  username: string;
  userId: string;
  mangaTitle: string | null;
  createdDate: string;
  isDeleted: boolean;
}

export interface UpdateUserRoleRequest {
  role: string;
  grant: boolean;
}

export interface UpdateUserStatusRequest {
  isActive: boolean;
}
