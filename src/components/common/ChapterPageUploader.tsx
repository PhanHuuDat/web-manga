import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {
  ArrowUpward,
  ArrowDownward,
  Close,
  CloudUpload,
} from '@mui/icons-material';
import UploadProgress from './UploadProgress';
import { attachmentApi } from '../../services/api/attachment-api-service';
import { AttachmentType } from '../../types/attachment-api-types';

export interface UploadedPage {
  attachmentId: string;
  url: string;
  thumbnailUrl: string | null;
  pageNumber: number;
}

interface ChapterPageUploaderProps {
  value: UploadedPage[];
  onChange: (pages: UploadedPage[]) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] };

function ChapterPageUploader({
  value,
  onChange,
  disabled = false,
}: ChapterPageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || uploading) return;

      // Validate sizes
      const oversized = acceptedFiles.find((f) => f.size > MAX_FILE_SIZE);
      if (oversized) {
        setError(`"${oversized.name}" exceeds 10MB limit.`);
        return;
      }

      setError(null);
      setUploading(true);

      const newPages: UploadedPage[] = [...value];

      for (const file of acceptedFiles) {
        setCurrentFile(file.name);
        setProgress(0);
        try {
          const result = await attachmentApi.upload(
            file,
            AttachmentType.ChapterPage,
            setProgress,
          );
          newPages.push({
            attachmentId: result.id,
            url: result.url,
            thumbnailUrl: result.thumbnailUrl,
            pageNumber: newPages.length + 1,
          });
          // Update incrementally so user sees progress
          onChange(renumberPages(newPages));
        } catch {
          setError(`Failed to upload "${file.name}".`);
          break;
        }
      }

      setUploading(false);
      setCurrentFile('');
    },
    [value, onChange, disabled, uploading],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    disabled: disabled || uploading,
    multiple: true,
  });

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(renumberPages(updated));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...value];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(renumberPages(updated));
  };

  const handleMoveDown = (index: number) => {
    if (index >= value.length - 1) return;
    const updated = [...value];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(renumberPages(updated));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Drop zone */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: disabled || uploading ? 'default' : 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: disabled || uploading ? undefined : 'primary.main',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {isDragActive
            ? 'Drop chapter pages here...'
            : 'Drag & drop chapter pages here, or click to browse'}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          JPEG, PNG, WebP — max 10MB each
        </Typography>
      </Box>

      {/* Upload progress */}
      {uploading && (
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Uploading: {currentFile}
          </Typography>
          <UploadProgress progress={progress} visible />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Page thumbnails grid */}
      {value.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 1.5,
          }}
        >
          {value.map((page, index) => (
            <Box
              key={page.attachmentId}
              sx={{
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                component="img"
                src={page.thumbnailUrl || page.url}
                alt={`Page ${page.pageNumber}`}
                sx={{
                  width: '100%',
                  aspectRatio: '2 / 3',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Page number badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: 2,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  borderRadius: 1,
                  px: 0.5,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {page.pageNumber}
              </Box>
              {/* Controls */}
              {!disabled && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.6)',
                    py: 0.25,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    sx={{ color: 'white', p: 0.25 }}
                  >
                    <ArrowUpward sx={{ fontSize: 14 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleMoveDown(index)}
                    disabled={index >= value.length - 1}
                    sx={{ color: 'white', p: 0.25 }}
                  >
                    <ArrowDownward sx={{ fontSize: 14 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(index)}
                    sx={{ color: 'error.light', p: 0.25 }}
                  >
                    <Close sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

function renumberPages(pages: UploadedPage[]): UploadedPage[] {
  return pages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
}

export default ChapterPageUploader;
