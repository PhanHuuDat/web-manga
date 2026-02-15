import { useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import PasswordField from '../../components/common/PasswordField';
import { authApi } from '../../services/api/auth-api-service';

function ResetPasswordPage() {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (!token || !userId) {
      setStatus('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('validation.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, userId, newPassword, confirmPassword });
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('resetPassword.title')}
      subtitle={t('resetPassword.subtitle')}
    >
      {status === 'success' && (
        <>
          <Typography sx={{ textAlign: 'center', color: 'success.main', mb: 2 }}>
            {t('resetPassword.success')}
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained" fullWidth>
            {t('resetPassword.loginLink')}
          </Button>
        </>
      )}
      {status === 'error' && (
        <Typography sx={{ textAlign: 'center', color: 'error.main' }}>
          {t('resetPassword.error')}
        </Typography>
      )}
      {status === 'form' && (
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <PasswordField
            label={t('resetPassword.newPassword')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <PasswordField
            label={t('resetPassword.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {t('resetPassword.submit')}
          </Button>
        </Box>
      )}
    </AuthLayout>
  );
}

export default ResetPasswordPage;
