import { Box, Avatar, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Comment, ReactionType } from '../../types/comment-types';
import ReactionButtons from './ReactionButtons';
import { formatRelativeTime } from '../../utils/format-relative-time';

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
  compact?: boolean;
  userReaction?: ReactionType;
  onReply?: (commentId: string, username: string) => void;
  onLike?: (commentId: string) => void;
  onDislike?: (commentId: string) => void;
}

export default function CommentItem({
  comment,
  depth = 0,
  maxDepth = 3,
  compact = false,
  userReaction,
  onReply,
  onLike,
  onDislike,
}: CommentItemProps) {
  const { t } = useTranslation('comment');

  const avatarSize = compact ? 28 : depth > 0 ? 32 : 40;
  const indentPx = depth * 24;
  const canReply = depth < maxDepth - 1;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: compact ? 1.25 : 2,
          pl: `${indentPx}px`,
          py: compact ? 1.5 : 2,
          alignItems: 'flex-start',
          borderBottom: depth === 0 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          ...(depth > 0 && {
            borderLeft: '2px solid',
            borderLeftColor: depth === 1 ? 'rgba(59, 130, 246, 0.1)' :
                           depth === 2 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            ml: 2,
            pl: 2,
          }),
        }}
      >
        <Avatar
          src={comment.avatarUrl}
          sx={{
            width: avatarSize,
            height: avatarSize,
            bgcolor: '#3b82f6',
            fontSize: compact ? 9 : depth > 0 ? 10 : 12,
            fontWeight: 600,
          }}
        >
          {comment.username.slice(0, 2).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Header: username + timestamp */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: compact ? 11 : depth > 0 ? 12 : 13,
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#f1f5f9',
              }}
            >
              {comment.username}
            </Typography>
            <Typography
              sx={{
                fontSize: compact ? 9 : depth > 0 ? 10 : 11,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#64748b',
              }}
            >
              {formatRelativeTime(comment.createdAt)}
            </Typography>
          </Box>

          {/* Content */}
          <Typography
            sx={{
              fontSize: compact ? 11 : depth > 0 ? 12 : 13,
              fontFamily: 'JetBrains Mono, monospace',
              color: depth > 0 ? '#94a3b8' : '#f1f5f9',
              lineHeight: 1.5,
              mb: 1,
              wordBreak: 'break-word',
            }}
          >
            {comment.content}
          </Typography>

          {/* Actions: reactions + reply */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: compact ? 1 : 2 }}>
            <ReactionButtons
              likes={comment.likes}
              dislikes={comment.dislikes}
              userReaction={userReaction}
              compact={compact}
              onLike={() => onLike?.(comment.id)}
              onDislike={() => onDislike?.(comment.id)}
            />

            {canReply && onReply && (
              <Button
                size="small"
                onClick={() => onReply(comment.id, comment.username)}
                aria-label={`Reply to ${comment.username}`}
                sx={{
                  minWidth: 'auto',
                  p: 0,
                  fontSize: compact ? 9 : 11,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#3b82f6',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#60a5fa',
                  },
                }}
              >
                {t('reply', 'Reply')}
              </Button>
            )}

            {/* Max depth indicator */}
            {depth === maxDepth - 1 && (
              <Box
                sx={{
                  px: 1,
                  py: 0.25,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 9,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#64748b',
                  }}
                >
                  // max_depth
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <Box>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
              compact={compact}
              onReply={onReply}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
