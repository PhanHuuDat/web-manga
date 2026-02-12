import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Comment, ReactionType } from '../../types/comment-types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
  hasMore?: boolean;
  compact?: boolean;
  userReactions?: Record<string, ReactionType>;
  onLoadMore?: () => void;
  onReply?: (commentId: string, username: string) => void;
  onLike?: (commentId: string) => void;
  onDislike?: (commentId: string) => void;
}

export default function CommentList({
  comments,
  loading = false,
  hasMore = false,
  compact = false,
  userReactions = {},
  onLoadMore,
  onReply,
  onLike,
  onDislike,
}: CommentListProps) {
  const { t } = useTranslation('comment');

  if (loading && comments.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} sx={{ color: '#3b82f6' }} />
      </Box>
    );
  }

  if (comments.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#64748b',
          }}
        >
          {t('noComments', 'No comments yet. Be the first to comment!')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          compact={compact}
          userReaction={userReactions[comment.id]}
          onReply={onReply}
          onLike={onLike}
          onDislike={onDislike}
        />
      ))}

      {hasMore && onLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Button
            onClick={onLoadMore}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={14} /> : <KeyboardArrowDown />}
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: '#121520',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              color: '#f1f5f9',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#1a1e2e',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {t('loadMore', 'Load more comments')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
