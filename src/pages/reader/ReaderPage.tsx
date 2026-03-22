import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReaderToolbar from '../../components/reader/ReaderToolbar';
import VerticalReader from '../../components/reader/VerticalReader';
import HorizontalReader from '../../components/reader/HorizontalReader';
import ReaderProgress from '../../components/reader/ReaderProgress';
import { ChapterCommentSidebar, PageCommentModal } from '../../components/comment';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchChapterDetail, clearChapter, selectSelectedChapter } from '../../store/slices/chapter-slice';
import { useViewTracker } from '../../hooks/use-view-tracker';

// Static sx objects hoisted to module level to avoid recreation on every render
const rootBoxSx = {
  bgcolor: 'background.default',
  minHeight: '100vh',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  '& img, & canvas': {
    pointerEvents: 'none',
    userSelect: 'none',
  },
} as const;

const loadingBoxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  bgcolor: 'background.default',
} as const;

function ReaderPage() {
  const { mangaSlug: mangaId, chapterSlug: chapterId } = useParams<{
    mangaSlug: string;
    chapterSlug: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: chapter, loading } = useAppSelector(selectSelectedChapter);
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);

  // Fire-and-forget view tracking on chapter load
  useViewTracker('Chapter', chapterId);

  useEffect(() => {
    if (!chapterId) return;
    dispatch(fetchChapterDetail(chapterId));
    return () => { dispatch(clearChapter()); };
  }, [chapterId, dispatch]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleBack = useCallback(() => {
    if (mangaId) {
      navigate(`/manga/${mangaId}`);
    } else if (chapter) {
      navigate(`/manga/${chapter.mangaSeriesId}`);
    } else {
      navigate('/');
    }
  }, [navigate, mangaId, chapter]);

  const handleModeToggle = useCallback(() => {
    setMode((prev) => (prev === 'vertical' ? 'horizontal' : 'vertical'));
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 10, 200));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 10, 50));
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleCommentToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handlePageModalOpen = useCallback(() => {
    setPageModalOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handlePageModalClose = useCallback(() => {
    setPageModalOpen(false);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  if (loading || !chapter) {
    return (
      <Box sx={loadingBoxSx}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={rootBoxSx} onContextMenu={handleContextMenu}>
      {/* Toolbar */}
      <ReaderToolbar
        title={chapter.mangaTitle}
        chapterNumber={chapter.chapterNumber}
        mode={mode}
        isFullscreen={isFullscreen}
        sidebarOpen={sidebarOpen}
        onBack={handleBack}
        onModeToggle={handleModeToggle}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFullscreenToggle={handleFullscreenToggle}
        onCommentToggle={handleCommentToggle}
        onPageComment={handlePageModalOpen}
      />

      {/* Reader content */}
      <Box sx={{ pt: mode === 'vertical' ? 8 : 0 }}>
        {mode === 'vertical' ? (
          <VerticalReader
            pages={chapter.pages}
            zoom={zoom}
            onPageChange={setSelectedPage}
          />
        ) : (
          <HorizontalReader
            pages={chapter.pages}
            zoom={zoom}
            onPageChange={setSelectedPage}
          />
        )}
      </Box>

      {/* Progress bar (only for vertical mode) */}
      {mode === 'vertical' && (
        <ReaderProgress current={selectedPage} total={chapter.pages.length} />
      )}

      {/* Chapter comment sidebar */}
      <ChapterCommentSidebar
        isOpen={sidebarOpen}
        chapterId={chapter.id}
        mangaId={chapter.mangaSeriesId}
        mangaTitle={chapter.mangaTitle}
        onClose={handleSidebarClose}
      />

      {/* Page comment modal */}
      <PageCommentModal
        open={pageModalOpen}
        chapterId={chapter.id}
        pageNumber={selectedPage}
        pageImageUrl={chapter.pages[selectedPage - 1]?.imageUrl}
        mangaId={chapter.mangaSeriesId}
        mangaTitle={chapter.mangaTitle}
        chapterTitle={`Chapter ${chapter.chapterNumber}`}
        totalPages={chapter.pages.length}
        onClose={handlePageModalClose}
      />
    </Box>
  );
}

export default ReaderPage;
