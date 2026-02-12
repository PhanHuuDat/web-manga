export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  mangaId: string;
  mangaTitle: string;
  chapterId?: string;
  pageNumber?: number;
  parentId?: string;
  replies?: Comment[];
  replyCount?: number;
}

export type CommentContext = 'manga' | 'chapter' | 'page';
export type ReactionType = 'like' | 'dislike' | null;

export interface CommentState {
  mangaComments: Record<string, Comment[]>;
  chapterComments: Record<string, Comment[]>;
  pageComments: Record<string, Comment[]>;
  userReactions: Record<string, ReactionType>;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  replyingTo: string | null;
}

export const MOCK_USER = {
  id: 'mock-user',
  username: 'You',
  avatarUrl: 'https://placehold.co/40x40/3b82f6/ffffff?text=You',
};
