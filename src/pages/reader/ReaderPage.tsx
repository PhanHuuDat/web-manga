import { useState, useEffect } from 'react';
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

  const handleBack = () => {
    if (mangaId) {
      navigate(`/manga/${mangaId}`);
    } else if (chapter) {
      navigate(`/manga/${chapter.mangaSeriesId}`);
    } else {
      navigate('/');
    }
  };

  const handleModeToggle = () => {
    setMode((prev) => (prev === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (loading || !chapter) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
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
        onCommentToggle={() => setSidebarOpen((prev) => !prev)}
        onPageComment={() => setPageModalOpen(true)}
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
        onClose={() => setSidebarOpen(false)}
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
        onClose={() => setPageModalOpen(false)}
      />
    </Box>
  );
}

export default ReaderPage;
