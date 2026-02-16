import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CommentCard from './CommentCard';
import { commentApi } from '../../services/api/comment-api-service';
import { mapCommentDtoToComment } from '../../utils/comment-mapper';
import type { Comment } from '../../types/comment-types';

function TopCommentsSection() {
  const { t } = useTranslation('home');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    commentApi
      .list({ pageSize: 5 })
      .then((res) => {
        if (!cancelled) setComments(res.data.map(mapCommentDtoToComment));
      })
      .catch(() => {
        // Silently fail -- section is non-critical
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Don't render section if no comments and not loading
  if (!loading && comments.length === 0) return null;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 6,
            height: 24,
            bgcolor: 'primary.main',
            borderRadius: 1,
          }}
        />
        <Typography
          sx={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}
        >
          {t('comments.title')}
        </Typography>
      </Box>

      {/* Comments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            ))
          : comments.slice(0, 2).map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </Box>
    </Box>
  );
}

export default TopCommentsSection;
