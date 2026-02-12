import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { customColors } from '../../theme/theme';

interface GlassCardProps extends BoxProps {
  children: React.ReactNode;
  hover?: boolean;
}

function GlassCard({ children, hover = true, sx, ...props }: GlassCardProps) {
  return (
    <Box
      sx={{
        bgcolor: customColors.cardBg,
        borderRadius: 3,
        border: '1px solid',
        borderColor: customColors.glassBorder,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.2s ease',
        ...(hover && {
          '&:hover': {
            bgcolor: customColors.cardBgHover,
            borderColor: 'primary.main',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default GlassCard;
