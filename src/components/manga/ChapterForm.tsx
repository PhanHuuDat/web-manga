import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ChapterPageUploader from '../common/ChapterPageUploader';
import type { UploadedPage } from '../common/ChapterPageUploader';
import type {
  ChapterDetailDto,
  CreateChapterRequest,
  UpdateChapterRequest,
} from '../../types/chapter-api-types';

interface ChapterFormProps {
  mode: 'create' | 'edit';
  mangaSeriesId: string;
  initialData?: ChapterDetailDto;
  onSubmit: (data: CreateChapterRequest | UpdateChapterRequest) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

function ChapterForm({
  mode,
  mangaSeriesId,
  initialData,
  onSubmit,
  isSubmitting,
  error,
}: ChapterFormProps) {
  const [chapterNumber, setChapterNumber] = useState(
    initialData?.chapterNumber?.toString() ?? '',
  );
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt?.split('T')[0] ?? new Date().toISOString().split('T')[0],
  );
  const [pages, setPages] = useState<UploadedPage[]>(
    initialData?.pages?.map((p) => ({
      attachmentId: p.id,
      url: p.imageUrl,
      thumbnailUrl: null,
      pageNumber: p.pageNumber,
    })) ?? [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pageImageIds = pages.map((p) => p.attachmentId);

    if (mode === 'create') {
      const data: CreateChapterRequest = {
        mangaSeriesId,
        chapterNumber: Number(chapterNumber),
        title: title || undefined,
        publishedAt: new Date(publishedAt).toISOString(),
        pageImageIds,
      };
      await onSubmit(data);
    } else {
      const data: UpdateChapterRequest = {
        title: title || undefined,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : undefined,
        pageImageIds: pageImageIds.length > 0 ? pageImageIds : undefined,
      };
      await onSubmit(data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Chapter Number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
          type="number"
          required={mode === 'create'}
          size="small"
          sx={{ width: 150 }}
          disabled={isSubmitting || mode === 'edit'}
        />
        <TextField
          label="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          disabled={isSubmitting}
        />
        <TextField
          label="Published Date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          type="date"
          size="small"
          disabled={isSubmitting}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Chapter Pages ({pages.length})
        </Typography>
        <ChapterPageUploader value={pages} onChange={setPages} disabled={isSubmitting} />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          {mode === 'create' ? 'Create Chapter' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
}

export default ChapterForm;
