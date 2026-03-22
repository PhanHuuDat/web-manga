import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { EMPTY_ARRAY } from '../../constants/empty-arrays';
import type { Comment, ReactionType } from '../../types/comment-types';

// Memoized selector factory: returns stable [] when key doesn't exist
export const selectMangaComments = (mangaId: string) =>
  createSelector(
    (state: RootState) => state.comments.mangaComments,
    (mangaComments) => mangaComments[mangaId] ?? (EMPTY_ARRAY as unknown as Comment[]),
  );

export const selectChapterComments = (chapterId: string) =>
  createSelector(
    (state: RootState) => state.comments.chapterComments,
    (chapterComments) => chapterComments[chapterId] ?? (EMPTY_ARRAY as unknown as Comment[]),
  );

// Scoped reaction selector — only subscribes to reactions for the given comment IDs
export const selectUserReactionsForComments = (commentIds: string[]) =>
  createSelector(
    (state: RootState) => state.comments.userReactions,
    (userReactions) => {
      const result: Record<string, ReactionType> = {};
      for (const id of commentIds) {
        if (userReactions[id] !== undefined) result[id] = userReactions[id];
      }
      return result;
    },
  );

// Primitive selectors — no memoization needed
export const selectCommentsLoading = (state: RootState) => state.comments.loading;
export const selectCommentsSubmitting = (state: RootState) => state.comments.submitting;
export const selectCommentsReplyingTo = (state: RootState) => state.comments.replyingTo;
