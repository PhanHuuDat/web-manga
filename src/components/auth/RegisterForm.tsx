import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import PasswordField from '../common/PasswordField';

interface RegisterFormProps {
  onSubmit: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
  ) => void;
  disabled?: boolean;
}

function RegisterForm({ onSubmit, disabled = false }: RegisterFormProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};

    if (username.length < 3) {
      newErrors.username = t('auth.validation.usernameMin');
    }

    if (password.length < 8) {
      newErrors.password = t('auth.validation.passwordMin');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.validation.passwordMismatch');
    }

    if (!acceptTerms) {
      newErrors.terms = t('auth.validation.termsRequired');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(username, email, password, confirmPassword, acceptTerms);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Username field */}
      <TextField
        label={t('auth.register.username')}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
        required
        disabled={disabled}
        sx={{ mb: 2 }}
      />

      {/* Email field */}
      <TextField
        label={t('auth.register.email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
        disabled={disabled}
        sx={{ mb: 2 }}
      />

      {/* Password field */}
      <PasswordField
        label={t('auth.register.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        required
        disabled={disabled}
        sx={{ mb: 2 }}
      />

      {/* Confirm password field */}
      <PasswordField
        label={t('auth.register.confirmPassword')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        fullWidth
        required
        disabled={disabled}
      />

      {/* Terms checkbox */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              size="small"
              disabled={disabled}
            />
          }
          label={
            <Typography sx={{ fontSize: 14 }}>
              {t('auth.register.terms')}
            </Typography>
          }
        />
        {errors.terms && (
          <Typography sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>
            {errors.terms}
          </Typography>
        )}
      </Box>

      {/* Submit button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={disabled}
        sx={{ fontWeight: 600 }}
      >
        {t('auth.register.submit')}
      </Button>
    </Box>
  );
}

export default RegisterForm;
