import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiIconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useTranslation } from 'react-i18next';

interface ReaderToolbarProps {
  title: string;
  chapterNumber: number;
  mode: 'vertical' | 'horizontal';
  isFullscreen: boolean;
  sidebarOpen?: boolean;
  onBack: () => void;
  onModeToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFullscreenToggle: () => void;
  onCommentToggle?: () => void;
  onPageComment?: () => void;
}

function ReaderToolbar({
  title,
  chapterNumber,
  mode,
  isFullscreen,
  sidebarOpen,
  onBack,
  onModeToggle,
  onZoomIn,
  onZoomOut,
  onFullscreenToggle,
  onCommentToggle,
  onPageComment,
}: ReaderToolbarProps) {
  const { t } = useTranslation('reader');

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgba(10, 12, 20, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Back button */}
        <MuiIconButton
          edge="start"
          color="inherit"
          onClick={onBack}
          aria-label={t('toolbar.back')}
        >
          <ArrowBackIcon />
        </MuiIconButton>

        {/* Title */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 16 } }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: { xs: 11, sm: 12 }, color: 'text.secondary' }}>
            {t('toolbar.chapter', { number: chapterNumber })}
          </Typography>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Mode toggle */}
          <MuiIconButton
            color="inherit"
            onClick={onModeToggle}
            aria-label={t('toolbar.toggleMode')}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {mode === 'vertical' ? <ViewCarouselIcon /> : <ViewAgendaIcon />}
          </MuiIconButton>

          {/* Zoom controls */}
          <MuiIconButton
            color="inherit"
            onClick={onZoomOut}
            aria-label={t('toolbar.zoomOut')}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <ZoomOutIcon />
          </MuiIconButton>
          <MuiIconButton
            color="inherit"
            onClick={onZoomIn}
            aria-label={t('toolbar.zoomIn')}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <ZoomInIcon />
          </MuiIconButton>

          {/* Chapter comments toggle */}
          {onCommentToggle && (
            <MuiIconButton
              color="inherit"
              onClick={onCommentToggle}
              aria-label={t('toolbar.comments')}
              sx={{
                bgcolor: sidebarOpen ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                '&:hover': {
                  bgcolor: sidebarOpen ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ color: sidebarOpen ? '#3b82f6' : 'inherit' }} />
            </MuiIconButton>
          )}

          {/* Page comment */}
          {onPageComment && (
            <MuiIconButton
              color="inherit"
              onClick={onPageComment}
              aria-label={t('toolbar.pageComment')}
            >
              <AddCommentIcon />
            </MuiIconButton>
          )}

          {/* Fullscreen toggle */}
          <MuiIconButton
            color="inherit"
            onClick={onFullscreenToggle}
            aria-label={t('toolbar.fullscreen')}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </MuiIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ReaderToolbar;
