import { useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchMangaComments,
  addMangaComment,
  toggleReaction,
  setReplyingTo,
} from '../../store/slices/comment-slice';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface MangaCommentSectionProps {
  mangaId: string;
  mangaTitle: string;
}

export default function MangaCommentSection({ mangaId, mangaTitle }: MangaCommentSectionProps) {
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.comments.mangaComments[mangaId] || []);
  const userReactions = useAppSelector((state) => state.comments.userReactions);
  const loading = useAppSelector((state) => state.comments.loading);
  const replyingTo = useAppSelector((state) => state.comments.replyingTo);

  useEffect(() => {
    dispatch(fetchMangaComments(mangaId));
  }, [dispatch, mangaId]);

  const handleSubmit = (content: string) => {
    dispatch(
      addMangaComment({
        mangaId,
        mangaTitle,
        content,
        parentId: replyingTo || undefined,
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReply = (commentId: string, _username: string) => {
    dispatch(setReplyingTo(commentId));
  };

  const handleCancelReply = () => {
    dispatch(setReplyingTo(null));
  };

  const handleLike = (commentId: string) => {
    dispatch(
      toggleReaction({
        commentId,
        reaction: 'like',
        context: 'manga',
        targetId: mangaId,
      })
    );
  };

  const handleDislike = (commentId: string) => {
    dispatch(
      toggleReaction({
        commentId,
        reaction: 'dislike',
        context: 'manga',
        targetId: mangaId,
      })
    );
  };

  // Find username of the comment being replied to
  const findUsername = (id: string): string | undefined => {
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
  };

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
      <Box sx={{ mb: 3 }}>
        <CommentInput
          onSubmit={handleSubmit}
          replyingTo={replyingToUsername}
          onCancelReply={replyingTo ? handleCancelReply : undefined}
        />
      </Box>

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
