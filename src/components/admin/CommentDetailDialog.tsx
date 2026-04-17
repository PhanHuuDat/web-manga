import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type { AdminCommentDto } from '../../types/admin-api-types';

interface CommentDetailDialogProps {
  open: boolean;
  comment: AdminCommentDto | null;
  onClose: () => void;
}

function CommentDetailDialog({ open, comment, onClose }: CommentDetailDialogProps) {
  const { t } = useTranslation('admin');
  if (!comment) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: '#f1f5f9',
          bgcolor: '#1a1e2e',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {t('comments.commentBy', { username: comment.username })}
        {comment.isDeleted && <Chip label={t('comments.deleted')} size="small" color="error" />}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#1a1e2e', pt: 2 }}>
        <Typography sx={{ mb: 2, whiteSpace: 'pre-wrap', color: '#f1f5f9', lineHeight: 1.6 }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {comment.mangaTitle && (
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              {t('comments.mangaLabel')} {comment.mangaTitle}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            {t('comments.dateLabel')} {new Date(comment.createdDate).toLocaleDateString()}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: '#1a1e2e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button onClick={onClose} sx={{ color: '#94a3b8' }}>
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDetailDialog;
