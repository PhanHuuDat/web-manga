import { useState } from 'react';
import { Box, Avatar, TextField, IconButton, Typography, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { MOCK_USER } from '../../types/comment-types';

interface CommentInputProps {
  placeholder?: string;
  replyingTo?: string;
  compact?: boolean;
  submitting?: boolean;
  onSubmit: (content: string) => void;
  onCancelReply?: () => void;
}

export default function CommentInput({
  placeholder,
  replyingTo,
  compact = false,
  submitting = false,
  onSubmit,
  onCancelReply,
}: CommentInputProps) {
  const { t } = useTranslation('comment');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim() && !submitting) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const avatarSize = compact ? 28 : 44;
  const inputHeight = compact ? 36 : 80;

  // Compact version for sidebar
  if (compact) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1.5,
          bgcolor: '#121520',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('placeholder', 'Write a comment...')}
          disabled={submitting}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: inputHeight,
              bgcolor: '#0a0c14',
              borderRadius: 2,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
            '& .MuiOutlinedInput-input': {
              py: 1,
              px: 1.5,
              '&::placeholder': {
                color: '#64748b',
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          aria-label="Send comment"
          sx={{
            width: 36,
            height: 36,
            bgcolor: '#3b82f6',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#2563eb',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(59, 130, 246, 0.3)',
            },
          }}
        >
          <Send sx={{ fontSize: 16, color: '#f1f5f9' }} />
        </IconButton>
      </Box>
    );
  }

  // Full version for manga detail and modal
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2.5,
        bgcolor: '#1a1e2e',
        borderRadius: 4,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        src={MOCK_USER.avatarUrl}
        sx={{
          width: avatarSize,
          height: avatarSize,
          bgcolor: '#3b82f6',
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {MOCK_USER.username.charAt(0)}
      </Avatar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {replyingTo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: 12,
                color: '#94a3b8',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {t('replyingTo', 'Replying to')} <span style={{ color: '#3b82f6' }}>@{replyingTo}</span>
            </Typography>
            {onCancelReply && (
              <Button
                size="small"
                onClick={onCancelReply}
                sx={{
                  minWidth: 'auto',
                  p: 0.5,
                  fontSize: 11,
                  color: '#64748b',
                  '&:hover': { color: '#f1f5f9' },
                }}
              >
                {t('cancel', 'Cancel')}
              </Button>
            )}
          </Box>
        )}

        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            replyingTo
              ? t('replyPlaceholder', 'Reply to {{username}}...', { username: replyingTo })
              : placeholder || t('placeholder', 'Write a comment...')
          }
          disabled={submitting}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: '#121520',
              borderRadius: 3,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
            '& .MuiOutlinedInput-input': {
              p: 2,
              '&::placeholder': {
                color: '#64748b',
                opacity: 1,
              },
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
            startIcon={<Send sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: '#3b82f6',
              borderRadius: 2,
              px: 2.5,
              py: 1,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#2563eb',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(59, 130, 246, 0.3)',
                color: 'rgba(241, 245, 249, 0.5)',
              },
            }}
          >
            {t('submit', 'Post')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
