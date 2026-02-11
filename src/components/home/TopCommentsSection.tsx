import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommentCard from './CommentCard';
import { LATEST_COMMENTS } from '../../constants/mock-comment-data';

function TopCommentsSection() {
  const { t } = useTranslation('home');

  return (
    <Box
      sx={{
        bgcolor: 'rgba(26, 30, 46, 0.5)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.05)',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ width: 6, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
        <Typography sx={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>
          {t('comments.title')}
        </Typography>
      </Box>

      {/* Comments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {LATEST_COMMENTS.slice(0, 2).map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
}

export default TopCommentsSection;
