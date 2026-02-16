import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Comment, CommentState } from '../../types/comment-types';
import type { ListCommentsParams } from '../../types/comment-api-types';
import { commentApi } from '../../services/api/comment-api-service';
import { mapCommentDtoToComment, mapApiReaction, mapReactionToApi } from '../../utils/comment-mapper';
import { extractError } from '../../utils/extract-api-error';
import { logoutThunk } from './auth-slice';

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

// --- Helpers ---

/** Determine storage context and key from API params. */
function getCommentKey(params: ListCommentsParams): { context: 'manga' | 'chapter' | 'page'; key: string } {
  if (params.pageNumber != null && params.chapterId) {
    return { context: 'page', key: `${params.chapterId}-p${params.pageNumber}` };
  }
  if (params.chapterId) return { context: 'chapter', key: params.chapterId };
  return { context: 'manga', key: params.mangaSeriesId || '' };
}

/** Update likes/dislikes for a comment in a nested list. */
function updateCommentReaction(
  comments: Comment[],
  commentId: string,
  likes: number,
  dislikes: number,
): Comment[] {
  return comments.map((c) => {
    if (c.id === commentId) return { ...c, likes, dislikes };
    if (c.replies?.length) {
      return { ...c, replies: updateCommentReaction(c.replies, commentId, likes, dislikes) };
    }
    return c;
  });
}

/** Remove a comment from a nested list. */
function removeCommentById(comments: Comment[], commentId: string): Comment[] {
  return comments
    .filter((c) => c.id !== commentId)
    .map((c) => {
      if (c.replies?.length) {
        return { ...c, replies: removeCommentById(c.replies, commentId) };
      }
      return c;
    });
}

// --- Async Thunks ---

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (params: ListCommentsParams, { rejectWithValue }) => {
    try {
      const response = await commentApi.list(params);
      const { context, key } = getCommentKey(params);
      return { context, key, comments: response.data.map(mapCommentDtoToComment) };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

interface CreateCommentParams {
  content: string;
  mangaSeriesId?: string;
  chapterId?: string;
  pageNumber?: number;
  parentId?: string;
}

export const createComment = createAsyncThunk(
  'comments/create',
  async (params: CreateCommentParams, { rejectWithValue }) => {
    try {
      await commentApi.create(params);
      // Return context so component can refetch
      const { context, key } = getCommentKey(params);
      return { context, key };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (
    { commentId, context, key }: { commentId: string; context: 'manga' | 'chapter' | 'page'; key: string },
    { rejectWithValue },
  ) => {
    try {
      await commentApi.remove(commentId);
      return { commentId, context, key };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

interface ToggleReactionParams {
  commentId: string;
  reaction: 'like' | 'dislike';
  context: 'manga' | 'chapter' | 'page';
  targetId: string;
}

export const toggleCommentReaction = createAsyncThunk(
  'comments/toggleReaction',
  async ({ commentId, reaction, context, targetId }: ToggleReactionParams, { rejectWithValue }) => {
    try {
      const result = await commentApi.toggleReaction(commentId, mapReactionToApi(reaction));
      return {
        commentId,
        context,
        targetId,
        likes: result.likes,
        dislikes: result.dislikes,
        currentReaction: mapApiReaction(result.currentReaction),
      };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

// --- Slice ---

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setReplyingTo(state, action: PayloadAction<string | null>) {
      state.replyingTo = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { context, key, comments } = action.payload;
        if (context === 'manga') state.mangaComments[key] = comments;
        else if (context === 'chapter') state.chapterComments[key] = comments;
        else state.pageComments[key] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createComment.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.submitting = false;
        state.replyingTo = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId, context, key } = action.payload;
        if (context === 'manga') {
          state.mangaComments[key] = removeCommentById(state.mangaComments[key] || [], commentId);
        } else if (context === 'chapter') {
          state.chapterComments[key] = removeCommentById(state.chapterComments[key] || [], commentId);
        } else {
          state.pageComments[key] = removeCommentById(state.pageComments[key] || [], commentId);
        }
      })
      // Toggle reaction
      .addCase(toggleCommentReaction.fulfilled, (state, action) => {
        const { commentId, context, targetId, likes, dislikes, currentReaction } = action.payload;
        state.userReactions[commentId] = currentReaction;
        const updater = (list: Comment[]) => updateCommentReaction(list, commentId, likes, dislikes);
        if (context === 'manga') {
          state.mangaComments[targetId] = updater(state.mangaComments[targetId] || []);
        } else if (context === 'chapter') {
          state.chapterComments[targetId] = updater(state.chapterComments[targetId] || []);
        } else {
          state.pageComments[targetId] = updater(state.pageComments[targetId] || []);
        }
      })
      // Logout - reset state
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const { setReplyingTo, clearError } = commentSlice.actions;

export default commentSlice.reducer;
