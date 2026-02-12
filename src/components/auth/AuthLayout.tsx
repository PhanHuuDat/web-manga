import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          p: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}
          >
            MangaVoid
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Content */}
        {children}
      </Box>
    </Box>
  );
}

export default AuthLayout;
