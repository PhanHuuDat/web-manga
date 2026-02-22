import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ChapterForm from '../../components/manga/ChapterForm';
import { chapterApi } from '../../services/api/chapter-api-service';
import type { CreateChapterRequest, UpdateChapterRequest } from '../../types/chapter-api-types';

function ChapterCreatePage() {
  const { id: mangaId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!mangaId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Manga ID is required.</Alert>
      </Box>
    );
  }

  const handleSubmit = async (data: CreateChapterRequest | UpdateChapterRequest) => {
    setSubmitting(true);
    setError(null);
    try {
      await chapterApi.create(data as CreateChapterRequest);
      navigate(isAdmin ? `/admin/manga/${mangaId}/chapters` : `/manga/${mangaId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create chapter.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Add Chapter
      </Typography>
      <ChapterForm
        mode="create"
        mangaSeriesId={mangaId}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        error={error}
      />
    </Box>
  );
}

export default ChapterCreatePage;
