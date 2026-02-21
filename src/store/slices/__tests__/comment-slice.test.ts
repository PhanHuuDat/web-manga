import { describe, it, expect, vi, beforeEach } from 'vitest';
import commentReducer, {
  fetchComments,
  createComment,
  deleteComment,
  toggleCommentReaction,
  setReplyingTo,
  clearError,
} from '../comment-slice';
import '../../../services/api/comment-api-service';

vi.mock('../../../services/api/comment-api-service');

describe('comment-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = commentReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        mangaComments: {},
        chapterComments: {},
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      });
    });
  });

  describe('setReplyingTo reducer', () => {
    it('sets replyingTo to comment id', () => {
      const state = commentReducer(undefined, setReplyingTo('comment-id-123'));
      expect(state.replyingTo).toBe('comment-id-123');
    });

    it('sets replyingTo to null', () => {
      let state = commentReducer(undefined, setReplyingTo('comment-id-123'));
      state = commentReducer(state, setReplyingTo(null));
      expect(state.replyingTo).toBeNull();
    });
  });

  describe('clearError reducer', () => {
    it('clears error message', () => {
      const prevState = {
        mangaComments: {},
        chapterComments: {},
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: 'Some error message',
        replyingTo: null,
      };
      const state = commentReducer(prevState, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe('fetchComments thunk', () => {
    it('sets loading true on pending', () => {
      const state = commentReducer(undefined, { type: fetchComments.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('stores comments by manga on fulfilled', () => {
      const mockComments = [{ id: 'c1', content: 'Great!', replies: [] }];
      const state = commentReducer(undefined, {
        type: fetchComments.fulfilled.type,
        payload: { context: 'manga' as const, key: 'manga-1', comments: mockComments },
      });
      expect(state.loading).toBe(false);
      expect(state.mangaComments['manga-1']).toEqual(mockComments);
    });

    it('stores comments by chapter on fulfilled', () => {
      const mockComments = [{ id: 'c1', content: 'Good!', replies: [] }];
      const state = commentReducer(undefined, {
        type: fetchComments.fulfilled.type,
        payload: { context: 'chapter' as const, key: 'ch-1', comments: mockComments },
      });
      expect(state.chapterComments['ch-1']).toEqual(mockComments);
    });

    it('stores comments by page on fulfilled', () => {
      const mockComments = [{ id: 'c1', content: 'Nice!', replies: [] }];
      const state = commentReducer(undefined, {
        type: fetchComments.fulfilled.type,
        payload: { context: 'page' as const, key: 'ch-1-p5', comments: mockComments },
      });
      expect(state.pageComments['ch-1-p5']).toEqual(mockComments);
    });

    it('sets error on rejected', () => {
      const state = commentReducer(undefined, {
        type: fetchComments.rejected.type,
        payload: 'Failed to fetch comments',
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch comments');
    });
  });

  describe('createComment thunk', () => {
    it('sets submitting true on pending', () => {
      const state = commentReducer(undefined, { type: createComment.pending.type });
      expect(state.submitting).toBe(true);
      expect(state.error).toBeNull();
    });

    it('clears replyingTo on fulfilled', () => {
      let state = commentReducer(undefined, setReplyingTo('c1'));
      state = commentReducer(state, {
        type: createComment.fulfilled.type,
        payload: { context: 'manga' as const, key: 'manga-1' },
      });
      expect(state.submitting).toBe(false);
      expect(state.replyingTo).toBeNull();
    });

    it('sets error on rejected', () => {
      const state = commentReducer(undefined, {
        type: createComment.rejected.type,
        payload: 'Comment creation failed',
      });
      expect(state.submitting).toBe(false);
      expect(state.error).toBe('Comment creation failed');
    });
  });

  describe('deleteComment thunk', () => {
    it('removes comment from manga comments on fulfilled', () => {
      const prevState = {
        mangaComments: {
          'manga-1': [
            { id: 'c1', content: 'First', replies: [] },
            { id: 'c2', content: 'Second', replies: [] },
          ],
        },
        chapterComments: {},
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: deleteComment.fulfilled.type,
        payload: { commentId: 'c1', context: 'manga' as const, key: 'manga-1' },
      });
      expect(state.mangaComments['manga-1']).toHaveLength(1);
      expect(state.mangaComments['manga-1'][0].id).toBe('c2');
    });

    it('removes comment from chapter comments on fulfilled', () => {
      const prevState = {
        mangaComments: {},
        chapterComments: {
          'ch-1': [{ id: 'c1', content: 'Comment', replies: [] }],
        },
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: deleteComment.fulfilled.type,
        payload: { commentId: 'c1', context: 'chapter' as const, key: 'ch-1' },
      });
      expect(state.chapterComments['ch-1']).toHaveLength(0);
    });

    it('removes comment from page comments on fulfilled', () => {
      const prevState = {
        mangaComments: {},
        chapterComments: {},
        pageComments: {
          'ch-1-p5': [{ id: 'c1', content: 'Comment', replies: [] }],
        },
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: deleteComment.fulfilled.type,
        payload: { commentId: 'c1', context: 'page' as const, key: 'ch-1-p5' },
      });
      expect(state.pageComments['ch-1-p5']).toHaveLength(0);
    });
  });

  describe('toggleCommentReaction thunk', () => {
    it('updates user reaction on fulfilled', () => {
      const state = commentReducer(undefined, {
        type: toggleCommentReaction.fulfilled.type,
        payload: {
          commentId: 'c1',
          context: 'manga' as const,
          targetId: 'manga-1',
          likes: 10,
          dislikes: 2,
          currentReaction: 'like',
        },
      });
      expect(state.userReactions['c1']).toBe('like');
    });

    it('updates comment likes and dislikes in manga comments', () => {
      const prevState = {
        mangaComments: {
          'manga-1': [{ id: 'c1', content: 'Test', likes: 5, dislikes: 1, replies: [] }],
        },
        chapterComments: {},
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: toggleCommentReaction.fulfilled.type,
        payload: {
          commentId: 'c1',
          context: 'manga' as const,
          targetId: 'manga-1',
          likes: 10,
          dislikes: 2,
          currentReaction: 'like',
        },
      });
      expect(state.mangaComments['manga-1'][0].likes).toBe(10);
      expect(state.mangaComments['manga-1'][0].dislikes).toBe(2);
    });

    it('updates comment likes and dislikes in chapter comments', () => {
      const prevState = {
        mangaComments: {},
        chapterComments: {
          'ch-1': [{ id: 'c1', content: 'Test', likes: 5, dislikes: 1, replies: [] }],
        },
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: toggleCommentReaction.fulfilled.type,
        payload: {
          commentId: 'c1',
          context: 'chapter' as const,
          targetId: 'ch-1',
          likes: 8,
          dislikes: 0,
          currentReaction: 'dislike',
        },
      });
      expect(state.chapterComments['ch-1'][0].likes).toBe(8);
      expect(state.chapterComments['ch-1'][0].dislikes).toBe(0);
    });

    it('updates comment in nested replies', () => {
      const prevState = {
        mangaComments: {
          'manga-1': [
            {
              id: 'c1',
              content: 'Parent',
              likes: 5,
              dislikes: 1,
              replies: [{ id: 'c2', content: 'Reply', likes: 2, dislikes: 0, replies: [] }],
            },
          ],
        },
        chapterComments: {},
        pageComments: {},
        userReactions: {},
        loading: false,
        submitting: false,
        error: null,
        replyingTo: null,
      };
      const state = commentReducer(prevState, {
        type: toggleCommentReaction.fulfilled.type,
        payload: {
          commentId: 'c2',
          context: 'manga' as const,
          targetId: 'manga-1',
          likes: 5,
          dislikes: 1,
          currentReaction: 'like',
        },
      });
      expect(state.mangaComments['manga-1'][0].replies?.[0].likes).toBe(5);
      expect(state.mangaComments['manga-1'][0].replies?.[0].dislikes).toBe(1);
    });
  });
});
