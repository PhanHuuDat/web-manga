import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import MangaForm from '../../components/manga/MangaForm';
import { mangaApi } from '../../services/api/manga-api-service';
import type { MangaDetailDto, CreateMangaRequest, UpdateMangaRequest } from '../../types/manga-api-types';

function MangaEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<MangaDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    mangaApi
      .get(id)
      .then(setManga)
      .catch(() => setError('Failed to load manga.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: CreateMangaRequest | UpdateMangaRequest) => {
    if (!id) return;
    setSubmitting(true);
    setError(null);
    try {
      await mangaApi.update(id, data as UpdateMangaRequest);
      navigate(`/manga/${id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update manga.';
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

  if (!manga) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Manga not found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Edit: {manga.title}
      </Typography>
      <MangaForm
        mode="edit"
        initialData={manga}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        error={error}
      />
    </Box>
  );
}

export default MangaEditPage;
