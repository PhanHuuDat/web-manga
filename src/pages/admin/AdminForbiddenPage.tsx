import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Home, Block } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function AdminForbiddenPage() {
  const { t } = useTranslation('admin');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#0a0c14',
        p: 3,
      }}
    >
      <Block sx={{ fontSize: 72, color: '#ef4444', mb: 2 }} />
      <Typography
        sx={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 48,
          fontWeight: 900,
          color: '#ef4444',
          mb: 1,
        }}
      >
        403
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: '#f1f5f9',
          mb: 1,
        }}
      >
        Access Denied
      </Typography>
      <Typography
        sx={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: '#94a3b8',
          mb: 3,
        }}
      >
        {t('common.forbidden')}
      </Typography>
      <Button
        component={Link}
        to="/"
        startIcon={<Home />}
        variant="contained"
        sx={{
          bgcolor: '#3b82f6',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'none',
          px: 3,
          '&:hover': { bgcolor: '#2563eb' },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default AdminForbiddenPage;
