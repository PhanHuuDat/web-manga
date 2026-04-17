import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ChapterForm from '../../components/manga/ChapterForm';
import { chapterApi } from '../../services/api/chapter-api-service';
import type { ChapterDetailDto, CreateChapterRequest, UpdateChapterRequest } from '../../types/chapter-api-types';

function ChapterEditPage() {
  const { t } = useTranslation('manga');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [chapter, setChapter] = useState<ChapterDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    chapterApi
      .get(id)
      .then(setChapter)
      .catch(() => setError(t('pages.failedLoadChapter')))
      .finally(() => setLoading(false));
  }, [id, t]);

  const handleSubmit = async (data: CreateChapterRequest | UpdateChapterRequest) => {
    if (!id || !chapter) return;
    setSubmitting(true);
    setError(null);
    try {
      await chapterApi.update(id, data as UpdateChapterRequest);
      navigate(isAdmin ? `/admin/manga/${chapter.mangaSeriesId}/chapters` : `/manga/${chapter.mangaSeriesId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('pages.failedUpdateChapter');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!chapter) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{t('pages.chapterNotFound')}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        {t('pages.editChapter', { number: chapter.chapterNumber })}
      </Typography>
      <ChapterForm
        mode="edit"
        mangaSeriesId={chapter.mangaSeriesId}
        initialData={chapter}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        error={error}
      />
    </Box>
  );
}

export default ChapterEditPage;
