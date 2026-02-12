import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (email: string, password: string, rememberMe: boolean) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // TODO: Implement actual API call for login
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password flow
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // TODO: Implement social login API call
  };

  return (
    <AuthLayout
      title={t('auth.login.title')}
      subtitle={t('auth.login.subtitle')}
    >
      <LoginForm
        onSubmit={handleSubmit}
        onForgotPassword={handleForgotPassword}
        onSocialLogin={handleSocialLogin}
        disabled={submitting}
      />

      {/* Register link */}
      <Typography
        sx={{
          textAlign: 'center',
          mt: 3,
          color: 'text.secondary',
          fontSize: 14,
        }}
      >
        {t('auth.login.noAccount')}{' '}
        <Link
          component={RouterLink}
          to="/register"
          sx={{ fontWeight: 600, textDecoration: 'none' }}
        >
          {t('auth.login.register')}
        </Link>
      </Typography>
    </AuthLayout>
  );
}

export default LoginPage;
