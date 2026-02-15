import { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Typography, CircularProgress, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../services/api/auth-api-service';

function VerifyEmailPage() {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (!token || !userId) {
      setStatus('error');
      return;
    }

    authApi
      .verifyEmail(token, userId)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [searchParams]);

  return (
    <AuthLayout
      title={t('verifyEmail.title')}
      subtitle=""
    >
      {status === 'loading' && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 3 }} />}
      {status === 'success' && (
        <>
          <Typography sx={{ textAlign: 'center', color: 'success.main', mb: 2 }}>
            {t('verifyEmail.success')}
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained" fullWidth>
            {t('verifyEmail.loginLink')}
          </Button>
        </>
      )}
      {status === 'error' && (
        <Typography sx={{ textAlign: 'center', color: 'error.main' }}>
          {t('verifyEmail.error')}
        </Typography>
      )}
    </AuthLayout>
  );
}

export default VerifyEmailPage;
