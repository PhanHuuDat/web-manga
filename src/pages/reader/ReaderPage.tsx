import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReaderToolbar from '../../components/reader/ReaderToolbar';
import VerticalReader from '../../components/reader/VerticalReader';
import HorizontalReader from '../../components/reader/HorizontalReader';
import ReaderProgress from '../../components/reader/ReaderProgress';
import { ChapterCommentSidebar, PageCommentModal } from '../../components/comment';
import { getChapterDetail } from '../../constants/mock-chapter-data';
import type { ChapterDetail } from '../../types/manga-types';

function ReaderPage() {
  const { mangaSlug, chapterSlug } = useParams<{
    mangaSlug: string;
    chapterSlug: string;
  }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    // Simulate API call
    const fetchChapter = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (mangaSlug && chapterSlug) {
        const chapterNumber = parseInt(chapterSlug.replace('chapter-', ''));
        const data = getChapterDetail(mangaSlug, chapterNumber);
        setChapter(data);
      }
      setLoading(false);
    };

    fetchChapter();
  }, [mangaSlug, chapterSlug]);

  useEffect(() => {
    // Sync fullscreen state when user presses ESC
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleBack = () => {
    navigate(`/manga/${mangaSlug}`);
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

  const handleCommentToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handlePageCommentOpen = () => {
    setPageModalOpen(true);
  };

  const handlePageCommentClose = () => {
    setPageModalOpen(false);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
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
        onCommentToggle={handleCommentToggle}
        onPageComment={handlePageCommentOpen}
      />

      {/* Reader content */}
      <Box sx={{ pt: mode === 'vertical' ? 8 : 0 }}>
        {mode === 'vertical' ? (
          <VerticalReader
            pages={chapter.images}
            zoom={zoom}
            onPageChange={setSelectedPage}
          />
        ) : (
          <HorizontalReader
            pages={chapter.images}
            zoom={zoom}
            onPageChange={setSelectedPage}
          />
        )}
      </Box>

      {/* Progress bar (only for vertical mode) */}
      {mode === 'vertical' && (
        <ReaderProgress current={selectedPage} total={chapter.images.length} />
      )}

      {/* Chapter comment sidebar */}
      <ChapterCommentSidebar
        isOpen={sidebarOpen}
        chapterId={chapter.id}
        mangaId={chapter.mangaId}
        mangaTitle={chapter.mangaTitle}
        onClose={handleSidebarClose}
      />

      {/* Page comment modal */}
      <PageCommentModal
        open={pageModalOpen}
        chapterId={chapter.id}
        pageNumber={selectedPage}
        pageImageUrl={chapter.images[selectedPage - 1]?.imageUrl}
        mangaId={chapter.mangaId}
        mangaTitle={chapter.mangaTitle}
        chapterTitle={`Chapter ${chapter.chapterNumber}`}
        totalPages={chapter.images.length}
        onClose={handlePageCommentClose}
      />
    </Box>
  );
}

export default ReaderPage;
