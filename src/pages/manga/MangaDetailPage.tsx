import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import MangaInfo from '../../components/manga/MangaInfo';
import ChapterList from '../../components/manga/ChapterList';
import { MangaCommentSection } from '../../components/comment';
import { getMangaDetail } from '../../constants/mock-chapter-data';
import type { MangaDetail } from '../../types/manga-types';

function MangaDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<MangaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchManga = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (slug) {
        const data = getMangaDetail(slug);
        setManga(data || null);
      }
      setLoading(false);
    };

    fetchManga();
  }, [slug]);

  const handleReadClick = () => {
    if (manga && manga.chapters.length > 0) {
      navigate(`/manga/${manga.slug}/${manga.chapters[0].slug}`);
    }
  };

  const handleBookmarkClick = () => {
    // TODO: Implement bookmark functionality
    console.log('Bookmark clicked');
  };

  const handleChapterClick = (chapterId: string) => {
    const chapter = manga?.chapters.find((ch) => ch.id === chapterId);
    if (chapter && manga) {
      navigate(`/manga/${manga.slug}/${chapter.slug}`);
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

  if (!manga) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {t('manga.notFound')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('manga.notFoundDescription')}
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
            chapters={manga.chapters}
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
