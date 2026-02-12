import MuiIconButton from '@mui/material/IconButton';
import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  size?: 'small' | 'medium' | 'large';
}

function IconButton({
  children,
  onClick,
  ariaLabel,
  size = 'medium',
}: IconButtonProps) {
  return (
    <MuiIconButton
      onClick={onClick}
      aria-label={ariaLabel}
      size={size}
      sx={{
        color: 'text.secondary',
        transition: 'all 0.2s',
        '&:hover': {
          color: 'primary.main',
          bgcolor: 'rgba(59, 130, 246, 0.1)',
        },
      }}
    >
      {children}
    </MuiIconButton>
  );
}

export default IconButton;
