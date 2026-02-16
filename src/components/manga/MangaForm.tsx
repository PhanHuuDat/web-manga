import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ImageUploader from '../common/ImageUploader';
import GenreSelector from './GenreSelector';
import { AttachmentType } from '../../types/attachment-api-types';
import {
  SeriesStatus,
  type MangaDetailDto,
  type CreateMangaRequest,
  type UpdateMangaRequest,
} from '../../types/manga-api-types';

interface MangaFormProps {
  mode: 'create' | 'edit';
  initialData?: MangaDetailDto;
  onSubmit: (data: CreateMangaRequest | UpdateMangaRequest) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

function MangaForm({ mode, initialData, onSubmit, isSubmitting, error }: MangaFormProps) {
  const { t } = useTranslation('manga');

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [synopsis, setSynopsis] = useState(initialData?.synopsis ?? '');
  const [authorId, setAuthorId] = useState(initialData?.author?.id ?? '');
  const [artistId, setArtistId] = useState(initialData?.artist?.id ?? '');
  const [genreIds, setGenreIds] = useState<string[]>(
    initialData?.genres?.map((g) => g.id) ?? [],
  );
  const [status, setStatus] = useState<SeriesStatus>(
    initialData?.status ?? SeriesStatus.Ongoing,
  );
  const [publishedYear, setPublishedYear] = useState(
    initialData?.publishedYear?.toString() ?? '',
  );
  const [coverId, setCoverId] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverUrl ?? null,
  );
  const [bannerId, setBannerId] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    initialData?.bannerUrl ?? null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      const data: CreateMangaRequest = {
        title,
        synopsis: synopsis || undefined,
        authorId,
        artistId: artistId || undefined,
        genreIds,
        status,
        publishedYear: publishedYear ? Number(publishedYear) : undefined,
        coverId: coverId || undefined,
        bannerId: bannerId || undefined,
      };
      await onSubmit(data);
    } else {
      const data: UpdateMangaRequest = {
        title: title || undefined,
        synopsis: synopsis || undefined,
        artistId: artistId || undefined,
        genreIds,
        status,
        publishedYear: publishedYear ? Number(publishedYear) : undefined,
        coverId: coverId || undefined,
        bannerId: bannerId || undefined,
      };
      await onSubmit(data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      {/* Image uploaders */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Cover Image</Typography>
          <ImageUploader
            previewUrl={coverPreview}
            onChange={(id, url) => {
              setCoverId(id);
              setCoverPreview(url);
            }}
            attachmentType={AttachmentType.MangaCover}
            label="Upload cover"
            width={150}
            height={225}
            disabled={isSubmitting}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Banner Image</Typography>
          <ImageUploader
            previewUrl={bannerPreview}
            onChange={(id, url) => {
              setBannerId(id);
              setBannerPreview(url);
            }}
            attachmentType={AttachmentType.MangaBanner}
            label="Upload banner"
            width={300}
            height={100}
            disabled={isSubmitting}
          />
        </Box>
      </Box>

      {/* Text fields */}
      <TextField
        label={t('detail.title', 'Title')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={mode === 'create'}
        size="small"
        disabled={isSubmitting}
      />
      <TextField
        label="Synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        multiline
        rows={4}
        size="small"
        disabled={isSubmitting}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Author ID"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required={mode === 'create'}
          size="small"
          sx={{ flex: 1 }}
          disabled={isSubmitting}
          helperText={initialData?.author ? `Current: ${initialData.author.name}` : undefined}
        />
        <TextField
          label="Artist ID"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          disabled={isSubmitting}
          helperText={initialData?.artist ? `Current: ${initialData.artist.name}` : undefined}
        />
      </Box>

      <GenreSelector value={genreIds} onChange={setGenreIds} disabled={isSubmitting} />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value) as SeriesStatus)}
          select
          size="small"
          sx={{ flex: 1 }}
          disabled={isSubmitting}
        >
          <MenuItem value={SeriesStatus.Ongoing}>Ongoing</MenuItem>
          <MenuItem value={SeriesStatus.Completed}>Completed</MenuItem>
          <MenuItem value={SeriesStatus.Hiatus}>Hiatus</MenuItem>
        </TextField>
        <TextField
          label="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          type="number"
          size="small"
          sx={{ flex: 1 }}
          disabled={isSubmitting}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          {mode === 'create' ? 'Create Manga' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
}

export default MangaForm;
