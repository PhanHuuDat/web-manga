import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  registerThunk,
  selectAuthError,
  selectAuthLoading,
  clearError,
} from '../../store/slices/auth-slice';

function RegisterPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleSubmit = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _acceptTerms: boolean,
  ) => {
    const result = await dispatch(registerThunk({ username, email, password, confirmPassword }));
    if (registerThunk.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <AuthLayout title={t('register.title')} subtitle={t('register.subtitle')}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <RegisterForm onSubmit={handleSubmit} disabled={isLoading} />

      <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary', fontSize: 14 }}>
        {t('register.hasAccount')}{' '}
        <Link component={RouterLink} to="/login" sx={{ fontWeight: 600, textDecoration: 'none' }}>
          {t('register.login')}
        </Link>
      </Typography>
    </AuthLayout>
  );
}

export default RegisterPage;
