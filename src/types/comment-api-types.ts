/** Comment API types matching backend DTOs. */

export interface CommentDto {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  likes: number;
  dislikes: number;
  mangaSeriesId: string | null;
  chapterId: string | null;
  pageNumber: number | null;
  parentId: string | null;
  replyCount: number;
  replies: CommentDto[];
  createdAt: string;
  lastModifiedAt: string | null;
}

export interface CreateCommentRequest {
  content: string;
  mangaSeriesId?: string;
  chapterId?: string;
  pageNumber?: number;
  parentId?: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface ToggleReactionRequest {
  reactionType: number; // 0=Like, 1=Dislike
}

export interface ToggleReactionResponse {
  currentReaction: number | null;
  likes: number;
  dislikes: number;
}

export interface ListCommentsParams {
  mangaSeriesId?: string;
  chapterId?: string;
  pageNumber?: number;
  page?: number;
  pageSize?: number;
}
