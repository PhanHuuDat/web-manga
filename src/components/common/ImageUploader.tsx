import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { CameraAlt, Close } from '@mui/icons-material';
import UploadProgress from './UploadProgress';
import { attachmentApi } from '../../services/api/attachment-api-service';
import type { AttachmentType } from '../../types/attachment-api-types';

interface ImageUploaderProps {
  previewUrl: string | null;
  onChange: (id: string | null, url: string | null, thumbnailUrl: string | null) => void;
  attachmentType: AttachmentType;
  label?: string;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function ImageUploader({
  previewUrl,
  onChange,
  attachmentType,
  label = 'Upload image',
  width = 200,
  height = 200,
  disabled = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    e.target.value = '';

    // Client-side validation
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, WebP, and GIF images are allowed.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must not exceed 10MB.');
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const result = await attachmentApi.upload(file, attachmentType, setProgress);
      onChange(result.id, result.url, result.thumbnailUrl);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null, null);
    setError(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box
        onClick={handleClick}
        sx={{
          width,
          height,
          border: '2px dashed',
          borderColor: error ? 'error.main' : 'divider',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled || uploading ? 'default' : 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.paper',
          transition: 'border-color 0.2s',
          '&:hover': {
            borderColor: disabled || uploading ? undefined : 'primary.main',
          },
        }}
      >
        {previewUrl ? (
          <>
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {!disabled && (
              <IconButton
                onClick={handleRemove}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              p: 2,
            }}
          >
            <CameraAlt sx={{ fontSize: 32, color: 'text.disabled' }} />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              {label}
            </Typography>
          </Box>
        )}
      </Box>

      <UploadProgress progress={progress} visible={uploading} />

      {error && (
        <Alert severity="error" sx={{ py: 0, fontSize: 12 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
}

export default ImageUploader;
