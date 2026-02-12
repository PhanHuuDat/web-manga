import { useEffect } from 'react';
import { Box, Typography, Chip, IconButton, Modal, Fade } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPageComments,
  addPageComment,
  toggleReaction,
} from '../../store/slices/comment-slice';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface PageCommentModalProps {
  open: boolean;
  chapterId: string;
  pageNumber: number;
  pageImageUrl?: string;
  mangaId: string;
  mangaTitle: string;
  chapterTitle?: string;
  totalPages: number;
  onClose: () => void;
}

export default function PageCommentModal({
  open,
  chapterId,
  pageNumber,
  pageImageUrl,
  mangaId,
  mangaTitle,
  chapterTitle,
  totalPages,
  onClose,
}: PageCommentModalProps) {
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();

  const pageKey = `${chapterId}-p${pageNumber}`;
  const comments = useAppSelector((state) => state.comments.pageComments[pageKey] || []);
  const userReactions = useAppSelector((state) => state.comments.userReactions);
  const loading = useAppSelector((state) => state.comments.loading);

  useEffect(() => {
    if (open) {
      dispatch(fetchPageComments({ chapterId, pageNumber }));
    }
  }, [dispatch, chapterId, pageNumber, open]);

  const handleSubmit = (content: string) => {
    dispatch(
      addPageComment({
        chapterId,
        pageNumber,
        mangaId,
        mangaTitle,
        content,
      })
    );
  };

  const handleLike = (commentId: string) => {
    dispatch(
      toggleReaction({
        commentId,
        reaction: 'like',
        context: 'page',
        targetId: pageKey,
      })
    );
  };

  const handleDislike = (commentId: string) => {
    dispatch(
      toggleReaction({
        commentId,
        reaction: 'dislike',
        context: 'page',
        targetId: pageKey,
      })
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="page-comment-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            maxHeight: '90vh',
            bgcolor: '#1a1e2e',
            borderRadius: 5,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Box>
              <Typography
                id="page-comment-modal-title"
                sx={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#f1f5f9',
                }}
              >
                {t('pageComments', 'Page {{number}} Comments', { number: pageNumber })}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: '#64748b',
                }}
              >
                {chapterTitle || `Chapter`} • {mangaTitle}
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              aria-label="Close page comments"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Close sx={{ fontSize: 18, color: '#94a3b8' }} />
            </IconButton>
          </Box>

          {/* Page Preview */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 2,
              bgcolor: '#121520',
            }}
          >
            {/* Page Thumbnail */}
            <Box
              sx={{
                width: 60,
                height: 80,
                bgcolor: '#242938',
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {pageImageUrl && (
                <Box
                  component="img"
                  src={pageImageUrl}
                  alt={`Page ${pageNumber}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </Box>

            {/* Page Info */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: '#64748b',
                }}
              >
                {t('currentPage', 'Current viewing page')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#f1f5f9',
                }}
              >
                {t('pageOf', 'Page {{current}} of {{total}}', {
                  current: pageNumber,
                  total: totalPages,
                })}
              </Typography>
            </Box>

            {/* Comment Count */}
            <Chip
              label={t('commentsCount', '{{count}} comments', { count: comments.length })}
              size="small"
              sx={{
                bgcolor: '#3b82f6',
                color: '#f1f5f9',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                fontSize: 11,
              }}
            />
          </Box>

          {/* Comment List */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              minHeight: 200,
              maxHeight: 300,
              '&::-webkit-scrollbar': {
                width: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              },
            }}
          >
            <CommentList
              comments={comments}
              loading={loading}
              userReactions={userReactions}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </Box>

          {/* Comment Input */}
          <Box
            sx={{
              p: 2,
              bgcolor: '#121520',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <CommentInput
              placeholder={t('pagePlaceholder', 'Add a comment about this page...')}
              onSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
