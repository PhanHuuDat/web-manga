import type { CommentDto } from '../types/comment-api-types';
import type { Comment, ReactionType } from '../types/comment-types';

/** Maps backend CommentDto to frontend Comment type. */
export function mapCommentDtoToComment(dto: CommentDto): Comment {
  return {
    id: dto.id,
    userId: dto.userId,
    username: dto.username,
    avatarUrl: dto.avatarUrl || '',
    content: dto.content,
    likes: dto.likes,
    dislikes: dto.dislikes,
    createdAt: dto.createdAt,
    mangaId: dto.mangaSeriesId || '',
    mangaTitle: '',
    chapterId: dto.chapterId || undefined,
    pageNumber: dto.pageNumber || undefined,
    parentId: dto.parentId || undefined,
    replyCount: dto.replyCount,
    replies: dto.replies?.map(mapCommentDtoToComment),
  };
}

/** Maps API reaction number (0=Like, 1=Dislike, null=None) to frontend ReactionType. */
export function mapApiReaction(apiReaction: number | null): ReactionType {
  if (apiReaction === 0) return 'like';
  if (apiReaction === 1) return 'dislike';
  return null;
}

/** Maps frontend reaction string to API number. */
export function mapReactionToApi(reaction: 'like' | 'dislike'): number {
  return reaction === 'like' ? 0 : 1;
}
