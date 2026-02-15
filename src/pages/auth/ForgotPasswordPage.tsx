import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../services/api/auth-api-service';

function ForgotPasswordPage() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
    } catch {
      // Always show success to prevent enumeration
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <AuthLayout
      title={t('forgotPassword.title')}
      subtitle={t('forgotPassword.subtitle')}
    >
      {submitted ? (
        <>
          <Typography sx={{ textAlign: 'center', color: 'success.main', mb: 2 }}>
            {t('forgotPassword.success')}
          </Typography>
          <Link component={RouterLink} to="/login" sx={{ display: 'block', textAlign: 'center' }}>
            {t('forgotPassword.backToLogin')}
          </Link>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label={t('forgotPassword.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mb: 2 }}>
            {t('forgotPassword.submit')}
          </Button>
          <Link component={RouterLink} to="/login" sx={{ display: 'block', textAlign: 'center', fontSize: 14 }}>
            {t('forgotPassword.backToLogin')}
          </Link>
        </Box>
      )}
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
