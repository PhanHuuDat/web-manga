import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ChapterForm from '../../components/manga/ChapterForm';
import { chapterApi } from '../../services/api/chapter-api-service';
import type { ChapterDetailDto, CreateChapterRequest, UpdateChapterRequest } from '../../types/chapter-api-types';

function ChapterEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    chapterApi
      .get(id)
      .then(setChapter)
      .catch(() => setError('Failed to load chapter.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: CreateChapterRequest | UpdateChapterRequest) => {
    if (!id || !chapter) return;
    setSubmitting(true);
    setError(null);
    try {
      await chapterApi.update(id, data as UpdateChapterRequest);
      navigate(`/manga/${chapter.mangaSeriesId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update chapter.';
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
        <Alert severity="error">Chapter not found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Edit Chapter {chapter.chapterNumber}
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
