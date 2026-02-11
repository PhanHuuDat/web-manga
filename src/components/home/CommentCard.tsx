import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import type { Comment } from '../../types/comment-types';
import { formatRelativeTime } from '../../utils/format-relative-time';

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Avatar src={comment.avatarUrl} sx={{ width: 32, height: 32 }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary' }}>
            {comment.username}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>
          {formatRelativeTime(comment.createdAt)}
        </Typography>
      </Box>

      {/* Content */}
      <Typography
        sx={{
          fontSize: 12,
          color: 'text.secondary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {comment.content}
      </Typography>
    </Box>
  );
}

export default CommentCard;
