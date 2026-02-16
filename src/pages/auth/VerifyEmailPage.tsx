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

  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const hasParams = !!(token && userId);

  useEffect(() => {
    if (!hasParams) return;

    authApi
      .verifyEmail(token!, userId!)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [hasParams, token, userId]);

  // Derive error state from missing params without setState in effect
  const effectiveStatus = hasParams ? status : 'error';

  return (
    <AuthLayout
      title={t('verifyEmail.title')}
      subtitle=""
    >
      {effectiveStatus === 'loading' && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 3 }} />}
      {effectiveStatus === 'success' && (
        <>
          <Typography sx={{ textAlign: 'center', color: 'success.main', mb: 2 }}>
            {t('verifyEmail.success')}
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained" fullWidth>
            {t('verifyEmail.loginLink')}
          </Button>
        </>
      )}
      {effectiveStatus === 'error' && (
        <Typography sx={{ textAlign: 'center', color: 'error.main' }}>
          {t('verifyEmail.error')}
        </Typography>
      )}
    </AuthLayout>
  );
}

export default VerifyEmailPage;
