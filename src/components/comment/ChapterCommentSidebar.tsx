import { useEffect } from 'react';
import { Box, Typography, Chip, IconButton, Drawer, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { Close, ChatBubbleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchComments,
  createComment,
  toggleCommentReaction,
} from '../../store/slices/comment-slice';
import { selectIsAuthenticated } from '../../store/slices/auth-slice';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface ChapterCommentSidebarProps {
  chapterId: string;
  mangaId: string;
  mangaTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

export default function ChapterCommentSidebar({
  chapterId,
  mangaId,
  isOpen,
  onClose,
  onOpen,
}: ChapterCommentSidebarProps) {
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const comments = useAppSelector((state) => state.comments.chapterComments[chapterId] || []);
  const userReactions = useAppSelector((state) => state.comments.userReactions);
  const loading = useAppSelector((state) => state.comments.loading);
  const submitting = useAppSelector((state) => state.comments.submitting);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchComments({ chapterId }));
    }
  }, [dispatch, chapterId, isOpen]);

  const handleSubmit = async (content: string) => {
    const result = await dispatch(createComment({ content, chapterId, mangaSeriesId: mangaId }));
    if (createComment.fulfilled.match(result)) {
      dispatch(fetchComments({ chapterId }));
    }
  };

  const handleLike = (commentId: string) => {
    dispatch(
      toggleCommentReaction({
        commentId,
        reaction: 'like',
        context: 'chapter',
        targetId: chapterId,
      }),
    );
  };

  const handleDislike = (commentId: string) => {
    dispatch(
      toggleCommentReaction({
        commentId,
        reaction: 'dislike',
        context: 'chapter',
        targetId: chapterId,
      }),
    );
  };

  const sidebarContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#0a0c14',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChatBubbleOutline sx={{ fontSize: 18, color: '#3b82f6' }} />
          <Typography
            sx={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              color: '#f1f5f9',
            }}
          >
            {t('chapterComments', 'Chapter Comments')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={comments.length}
            size="small"
            sx={{
              height: 24,
              bgcolor: '#3b82f6',
              color: '#f1f5f9',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              fontSize: 10,
            }}
          />
          <IconButton size="small" onClick={onClose} aria-label="Close comments" sx={{ color: '#94a3b8' }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Comment List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
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
          compact
          userReactions={userReactions}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </Box>

      {/* Comment Input */}
      {isAuthenticated && (
        <CommentInput
          compact
          submitting={submitting}
          placeholder={t('chapterPlaceholder', 'Comment on this chapter...')}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );

  // Mobile: Bottom sheet
  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        onOpen={onOpen || (() => {})}
        disableSwipeToOpen
        PaperProps={{
          sx: {
            height: '70vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            bgcolor: '#0a0c14',
          },
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 4,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
            }}
          />
        </Box>
        {sidebarContent}
      </SwipeableDrawer>
    );
  }

  // Desktop: Side drawer
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      variant="persistent"
      PaperProps={{
        sx: {
          width: 320,
          bgcolor: '#0a0c14',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}
