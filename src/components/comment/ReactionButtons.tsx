import { Box, Typography } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import type { ReactionType } from '../../types/comment-types';

interface ReactionButtonsProps {
  likes: number;
  dislikes: number;
  userReaction?: ReactionType;
  compact?: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export default function ReactionButtons({
  likes,
  dislikes,
  userReaction,
  compact = false,
  onLike,
  onDislike,
}: ReactionButtonsProps) {
  const total = likes + dislikes;
  const iconSize = compact ? 12 : 14;
  const fontSize = compact ? 9 : 11;
  const padding = compact ? '2px 4px' : '4px 8px';
  const gap = compact ? 0.25 : 0.5;
  const borderRadius = compact ? 1 : 1.5;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {/* Like button */}
      <Box
        onClick={onLike}
        role="button"
        tabIndex={0}
        aria-label="Like comment"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onLike();
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap,
          padding,
          borderRadius,
          bgcolor: userReaction === 'like' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: userReaction === 'like' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <ThumbUp
          sx={{
            fontSize: iconSize,
            color: userReaction === 'like' ? '#22c55e' : '#94a3b8',
          }}
        />
        <Typography
          sx={{
            fontSize,
            fontFamily: 'JetBrains Mono, monospace',
            color: userReaction === 'like' ? '#22c55e' : '#94a3b8',
          }}
        >
          {likes}
        </Typography>
      </Box>

      {/* Dislike button */}
      <Box
        onClick={onDislike}
        role="button"
        tabIndex={0}
        aria-label="Dislike comment"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDislike();
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap,
          padding,
          borderRadius,
          bgcolor: userReaction === 'dislike' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: userReaction === 'dislike' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <ThumbDown
          sx={{
            fontSize: iconSize,
            color: userReaction === 'dislike' ? '#ef4444' : '#94a3b8',
          }}
        />
        <Typography
          sx={{
            fontSize,
            fontFamily: 'JetBrains Mono, monospace',
            color: userReaction === 'dislike' ? '#ef4444' : '#94a3b8',
          }}
        >
          {dislikes}
        </Typography>
      </Box>

      {/* Total badge */}
      {!compact && (
        <Box
          sx={{
            padding: '4px 8px',
            borderRadius: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#64748b',
            }}
          >
            {total}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
