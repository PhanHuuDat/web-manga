import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { customColors } from '../../theme/theme';

type Provider = 'google' | 'facebook';

interface SocialLoginButtonProps extends Omit<ButtonProps, 'variant'> {
  provider: Provider;
}

const PROVIDER_CONFIG: Record<Provider, { label: string; icon: string; hoverColor: string }> = {
  google: {
    label: 'Google',
    icon: 'G',
    hoverColor: 'rgba(219, 68, 55, 0.1)',
  },
  facebook: {
    label: 'Facebook',
    icon: 'f',
    hoverColor: 'rgba(66, 103, 178, 0.1)',
  },
};

function SocialLoginButton({ provider, sx, ...props }: SocialLoginButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      sx={{
        py: 1.5,
        borderColor: customColors.glassBorder,
        color: 'text.primary',
        fontWeight: 600,
        gap: 1.5,
        '&:hover': {
          borderColor: 'text.secondary',
          bgcolor: config.hoverColor,
        },
        ...sx,
      }}
      {...props}
    >
      <span style={{ fontWeight: 700, fontSize: 18 }}>{config.icon}</span>
      {config.label}
    </Button>
  );
}

export default SocialLoginButton;
