import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
  ) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // TODO: Implement actual API call for registration
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth.register.title')}
      subtitle={t('auth.register.subtitle')}
    >
      <RegisterForm onSubmit={handleSubmit} disabled={submitting} />

      {/* Login link */}
      <Typography
        sx={{
          textAlign: 'center',
          mt: 3,
          color: 'text.secondary',
          fontSize: 14,
        }}
      >
        {t('auth.register.hasAccount')}{' '}
        <Link
          component={RouterLink}
          to="/login"
          sx={{ fontWeight: 600, textDecoration: 'none' }}
        >
          {t('auth.register.login')}
        </Link>
      </Typography>
    </AuthLayout>
  );
}

export default RegisterPage;
