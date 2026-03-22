import { useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchComments,
  createComment,
  toggleCommentReaction,
  setReplyingTo,
} from '../../store/slices/comment-slice';
import { selectIsAuthenticated } from '../../store/slices/auth-slice';
import {
  selectMangaComments,
  selectUserReactionsForComments,
  selectCommentsLoading,
  selectCommentsSubmitting,
  selectCommentsReplyingTo,
} from '../../store/selectors/comment-selectors';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface MangaCommentSectionProps {
  mangaId: string;
  mangaTitle: string;
}

export default function MangaCommentSection({ mangaId }: MangaCommentSectionProps) {
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();

  const selectComments = useMemo(() => selectMangaComments(mangaId), [mangaId]);
  const comments = useAppSelector(selectComments);

  const commentIds = useMemo(
    () => comments.flatMap((c) => [c.id, ...(c.replies?.map((r) => r.id) ?? [])]),
    [comments],
  );
  const selectReactions = useMemo(() => selectUserReactionsForComments(commentIds), [commentIds]);
  const userReactions = useAppSelector(selectReactions);

  const loading = useAppSelector(selectCommentsLoading);
  const submitting = useAppSelector(selectCommentsSubmitting);
  const replyingTo = useAppSelector(selectCommentsReplyingTo);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(fetchComments({ mangaSeriesId: mangaId }));
  }, [dispatch, mangaId]);

  const handleSubmit = useCallback(
    async (content: string) => {
      const result = await dispatch(
        createComment({
          content,
          mangaSeriesId: mangaId,
          parentId: replyingTo || undefined,
        }),
      );
      if (createComment.fulfilled.match(result)) {
        dispatch(fetchComments({ mangaSeriesId: mangaId }));
      }
    },
    [dispatch, mangaId, replyingTo],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReply = useCallback(
    (commentId: string, _username: string) => {
      dispatch(setReplyingTo(commentId));
    },
    [dispatch],
  );

  const handleCancelReply = useCallback(() => {
    dispatch(setReplyingTo(null));
  }, [dispatch]);

  const handleLike = useCallback(
    (commentId: string) => {
      dispatch(
        toggleCommentReaction({
          commentId,
          reaction: 'like',
          context: 'manga',
          targetId: mangaId,
        }),
      );
    },
    [dispatch, mangaId],
  );

  const handleDislike = useCallback(
    (commentId: string) => {
      dispatch(
        toggleCommentReaction({
          commentId,
          reaction: 'dislike',
          context: 'manga',
          targetId: mangaId,
        }),
      );
    },
    [dispatch, mangaId],
  );

  // Find username of the comment being replied to
  const findUsername = useCallback(
    (id: string): string | undefined => {
      const findInComments = (list: typeof comments): string | undefined => {
        for (const c of list) {
          if (c.id === id) return c.username;
          if (c.replies) {
            const found = findInComments(c.replies);
            if (found) return found;
          }
        }
        return undefined;
      };
      return findInComments(comments);
    },
    [comments],
  );

  const replyingToUsername = replyingTo ? findUsername(replyingTo) : undefined;
  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replyCount || 0), 0);

  return (
    <Box sx={{ mt: 6 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            color: '#f1f5f9',
          }}
        >
          {t('title', 'Comments')}
        </Typography>
        <Chip
          label={totalComments}
          size="small"
          sx={{
            bgcolor: '#3b82f6',
            color: '#f1f5f9',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      </Box>

      {/* Comment Input */}
      {isAuthenticated && (
        <Box sx={{ mb: 3 }}>
          <CommentInput
            onSubmit={handleSubmit}
            submitting={submitting}
            replyingTo={replyingToUsername}
            onCancelReply={replyingTo ? handleCancelReply : undefined}
          />
        </Box>
      )}

      {/* Comment List */}
      <Box
        sx={{
          bgcolor: '#1a1e2e',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <CommentList
          comments={comments}
          loading={loading}
          userReactions={userReactions}
          onReply={handleReply}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </Box>
    </Box>
  );
}
