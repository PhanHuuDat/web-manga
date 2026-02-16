import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MangaForm from '../../components/manga/MangaForm';
import { mangaApi } from '../../services/api/manga-api-service';
import type { CreateMangaRequest, UpdateMangaRequest } from '../../types/manga-api-types';

function MangaCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateMangaRequest | UpdateMangaRequest) => {
    setSubmitting(true);
    setError(null);
    try {
      const id = await mangaApi.create(data as CreateMangaRequest);
      navigate(`/manga/${id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create manga.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Create Manga
      </Typography>
      <MangaForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        error={error}
      />
    </Box>
  );
}

export default MangaCreatePage;
