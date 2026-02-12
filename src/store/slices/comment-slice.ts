import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Comment, CommentState, ReactionType } from '../../types/comment-types';
import {
  MANGA_COMMENTS,
  CHAPTER_COMMENTS,
  PAGE_COMMENTS,
} from '../../constants/mock-comment-data';
import { MOCK_USER } from '../../types/comment-types';

const initialState: CommentState = {
  mangaComments: {},
  chapterComments: {},
  pageComments: {},
  userReactions: {},
  loading: false,
  submitting: false,
  error: null,
  replyingTo: null,
};

// Helper to generate unique ID
const generateId = () => `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Helper to add reply to nested comment structure (max 3 levels)
const addReplyToComment = (
  comments: Comment[],
  parentId: string,
  newReply: Comment,
  depth = 0
): Comment[] => {
  if (depth >= 3) return comments;

  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), newReply],
        replyCount: (comment.replyCount || 0) + 1,
      };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, newReply, depth + 1),
      };
    }
    return comment;
  });
};

// Helper to update reaction in nested comments
const updateReactionInComments = (
  comments: Comment[],
  commentId: string,
  reaction: ReactionType,
  previousReaction: ReactionType
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      let likes = comment.likes;
      let dislikes = comment.dislikes;

      // Remove previous reaction
      if (previousReaction === 'like') likes--;
      if (previousReaction === 'dislike') dislikes--;

      // Add new reaction
      if (reaction === 'like') likes++;
      if (reaction === 'dislike') dislikes++;

      return { ...comment, likes, dislikes };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateReactionInComments(comment.replies, commentId, reaction, previousReaction),
      };
    }
    return comment;
  });
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Fetch manga comments
    fetchMangaComments: (state, action: PayloadAction<string>) => {
      const mangaId = action.payload;
      state.loading = true;
      // Simulate fetching - in real app this would be async thunk
      state.mangaComments[mangaId] = MANGA_COMMENTS[mangaId] || [];
      state.loading = false;
    },

    // Fetch chapter comments
    fetchChapterComments: (state, action: PayloadAction<string>) => {
      const chapterId = action.payload;
      state.loading = true;
      state.chapterComments[chapterId] = CHAPTER_COMMENTS[chapterId] || [];
      state.loading = false;
    },

    // Fetch page comments
    fetchPageComments: (
      state,
      action: PayloadAction<{ chapterId: string; pageNumber: number }>
    ) => {
      const { chapterId, pageNumber } = action.payload;
      const key = `${chapterId}-p${pageNumber}`;
      state.loading = true;
      state.pageComments[key] = PAGE_COMMENTS[key] || [];
      state.loading = false;
    },

    // Add manga comment
    addMangaComment: (
      state,
      action: PayloadAction<{
        mangaId: string;
        mangaTitle: string;
        content: string;
        parentId?: string;
      }>
    ) => {
      const { mangaId, mangaTitle, content, parentId } = action.payload;
      const newComment: Comment = {
        id: generateId(),
        userId: MOCK_USER.id,
        username: MOCK_USER.username,
        avatarUrl: MOCK_USER.avatarUrl,
        content,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        mangaId,
        mangaTitle,
        parentId,
      };

      if (!state.mangaComments[mangaId]) {
        state.mangaComments[mangaId] = [];
      }

      if (parentId) {
        state.mangaComments[mangaId] = addReplyToComment(
          state.mangaComments[mangaId],
          parentId,
          newComment
        );
      } else {
        state.mangaComments[mangaId].unshift(newComment);
      }
      state.replyingTo = null;
    },

    // Add chapter comment
    addChapterComment: (
      state,
      action: PayloadAction<{
        chapterId: string;
        mangaId: string;
        mangaTitle: string;
        content: string;
      }>
    ) => {
      const { chapterId, mangaId, mangaTitle, content } = action.payload;
      const newComment: Comment = {
        id: generateId(),
        userId: MOCK_USER.id,
        username: MOCK_USER.username,
        avatarUrl: MOCK_USER.avatarUrl,
        content,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        mangaId,
        mangaTitle,
        chapterId,
      };

      if (!state.chapterComments[chapterId]) {
        state.chapterComments[chapterId] = [];
      }
      state.chapterComments[chapterId].unshift(newComment);
    },

    // Add page comment
    addPageComment: (
      state,
      action: PayloadAction<{
        chapterId: string;
        pageNumber: number;
        mangaId: string;
        mangaTitle: string;
        content: string;
      }>
    ) => {
      const { chapterId, pageNumber, mangaId, mangaTitle, content } = action.payload;
      const key = `${chapterId}-p${pageNumber}`;
      const newComment: Comment = {
        id: generateId(),
        userId: MOCK_USER.id,
        username: MOCK_USER.username,
        avatarUrl: MOCK_USER.avatarUrl,
        content,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        mangaId,
        mangaTitle,
        chapterId,
        pageNumber,
      };

      if (!state.pageComments[key]) {
        state.pageComments[key] = [];
      }
      state.pageComments[key].unshift(newComment);
    },

    // Toggle reaction (like/dislike)
    toggleReaction: (
      state,
      action: PayloadAction<{
        commentId: string;
        reaction: 'like' | 'dislike';
        context: 'manga' | 'chapter' | 'page';
        targetId: string;
      }>
    ) => {
      const { commentId, reaction, context, targetId } = action.payload;
      const previousReaction = state.userReactions[commentId] || null;

      // Toggle off if same reaction, otherwise set new reaction
      const newReaction = previousReaction === reaction ? null : reaction;
      state.userReactions[commentId] = newReaction;

      // Update comment counts
      if (context === 'manga') {
        state.mangaComments[targetId] = updateReactionInComments(
          state.mangaComments[targetId] || [],
          commentId,
          newReaction,
          previousReaction
        );
      } else if (context === 'chapter') {
        state.chapterComments[targetId] = updateReactionInComments(
          state.chapterComments[targetId] || [],
          commentId,
          newReaction,
          previousReaction
        );
      } else {
        state.pageComments[targetId] = updateReactionInComments(
          state.pageComments[targetId] || [],
          commentId,
          newReaction,
          previousReaction
        );
      }
    },

    // Set replying to comment
    setReplyingTo: (state, action: PayloadAction<string | null>) => {
      state.replyingTo = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchMangaComments,
  fetchChapterComments,
  fetchPageComments,
  addMangaComment,
  addChapterComment,
  addPageComment,
  toggleReaction,
  setReplyingTo,
  clearError,
} = commentSlice.actions;

export default commentSlice.reducer;
