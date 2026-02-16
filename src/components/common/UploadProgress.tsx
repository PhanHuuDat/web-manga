import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

interface UploadProgressProps {
  progress: number;
  visible: boolean;
}

function UploadProgress({ progress, visible }: UploadProgressProps) {
  if (!visible) return null;

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', minWidth: 35 }}
        >
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
}

export default UploadProgress;
