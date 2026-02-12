import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

interface ReaderProgressProps {
  current: number;
  total: number;
}

function ReaderProgress({ current, total }: ReaderProgressProps) {
  const { t } = useTranslation();
  const progress = (current / total) * 100;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(10, 12, 20, 0.95)',
        backdropFilter: 'blur(10px)',
        p: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
          {t('reader.progress')}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          {current} / {total} {t('reader.pages')}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 1,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 1,
            bgcolor: 'primary.main',
          },
        }}
      />
    </Box>
  );
}

export default ReaderProgress;
