import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import PasswordField from '../common/PasswordField';
import SocialLoginButton from '../common/SocialLoginButton';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword: () => void;
  onSocialLogin: (provider: 'google' | 'facebook') => void;
  disabled?: boolean;
}

function LoginForm({
  onSubmit,
  onForgotPassword,
  onSocialLogin,
  disabled = false,
}: LoginFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Email field */}
      <TextField
        label={t('auth.login.email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        disabled={disabled}
        sx={{ mb: 2 }}
      />

      {/* Password field */}
      <PasswordField
        label={t('auth.login.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        disabled={disabled}
        sx={{ mb: 1 }}
      />

      {/* Remember me & Forgot password */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          mb: 3,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography sx={{ fontSize: 14 }}>
              {t('auth.login.rememberMe')}
            </Typography>
          }
        />
        <Link
          component="button"
          type="button"
          onClick={onForgotPassword}
          sx={{ fontSize: 14, cursor: 'pointer' }}
        >
          {t('auth.login.forgotPassword')}
        </Link>
      </Box>

      {/* Submit button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={disabled}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        {t('auth.login.submit')}
      </Button>

      {/* Divider */}
      <Divider sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          {t('auth.login.or')}
        </Typography>
      </Divider>

      {/* Social login buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SocialLoginButton
          provider="google"
          onClick={() => onSocialLogin('google')}
          disabled={disabled}
        />
        <SocialLoginButton
          provider="facebook"
          onClick={() => onSocialLogin('facebook')}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
}

export default LoginForm;
