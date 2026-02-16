import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import MangaInfo from '../../components/manga/MangaInfo';
import ChapterList from '../../components/manga/ChapterList';
import { MangaCommentSection } from '../../components/comment';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchMangaDetail,
  fetchMangaChapters,
  selectSelectedManga,
  selectMangaChapters,
  clearSelected,
} from '../../store/slices/manga-slice';
import { useViewTracker } from '../../hooks/use-view-tracker';

function MangaDetailPage() {
  const { t } = useTranslation();
  const { slug: id } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: manga, loading, error } = useAppSelector(selectSelectedManga);
  const chapters = useAppSelector(selectMangaChapters);

  // Fire-and-forget view tracking on page load
  useViewTracker('Series', id);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMangaDetail(id));
    dispatch(fetchMangaChapters({ mangaId: id, page: 1, pageSize: 50 }));
    return () => { dispatch(clearSelected()); };
  }, [id, dispatch]);

  const handleReadClick = () => {
    if (manga && chapters.data.length > 0) {
      // Navigate to first chapter by ID
      const firstChapter = [...chapters.data].sort((a, b) => a.chapterNumber - b.chapterNumber)[0];
      navigate(`/read/${manga.id}/${firstChapter.id}`);
    }
  };

  const handleBookmarkClick = () => {
    // TODO: Implement bookmark functionality when backend supports it
  };

  const handleChapterClick = (chapterId: string) => {
    if (manga) {
      navigate(`/read/${manga.id}/${chapterId}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !manga) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {t('manga.notFound')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {error || t('manga.notFoundDescription')}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 10 }}>
      {/* Banner */}
      {manga.bannerUrl && (
        <Box
          sx={{
            width: '100%',
            height: { xs: 200, md: 400 },
            position: 'relative',
            overflow: 'hidden',
            mb: -15,
          }}
        >
          <Box
            component="img"
            src={manga.bannerUrl}
            alt={manga.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background:
                'linear-gradient(to bottom, transparent, rgba(10, 12, 20, 1))',
            }}
          />
        </Box>
      )}

      <Container sx={{ py: 4 }}>
        {/* Manga info */}
        <MangaInfo
          manga={manga}
          onReadClick={handleReadClick}
          onBookmarkClick={handleBookmarkClick}
        />

        {/* Chapter list */}
        <Box sx={{ mt: 6 }}>
          <ChapterList
            chapters={chapters.data}
            onChapterClick={handleChapterClick}
          />
        </Box>

        {/* Comment section */}
        <Box sx={{ mt: 6 }}>
          <MangaCommentSection mangaId={manga.id} mangaTitle={manga.title} />
        </Box>
      </Container>
    </Box>
  );
}

export default MangaDetailPage;
