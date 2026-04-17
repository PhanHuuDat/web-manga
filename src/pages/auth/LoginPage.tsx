import { useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginThunk,
  getCurrentUserThunk,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  clearError,
} from '../../store/slices/auth-slice';

function LoginPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUserThunk());
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, dispatch]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleSubmit = async (email: string, password: string, _rememberMe: boolean) => {
    dispatch(loginThunk({ email, password }));
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSocialLogin = (_provider: 'google' | 'facebook') => {
    // TODO: Implement social login
  };

  return (
    <AuthLayout title={t('login.title')} subtitle={t('login.subtitle')}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <LoginForm
        onSubmit={handleSubmit}
        onForgotPassword={handleForgotPassword}
        onSocialLogin={handleSocialLogin}
        disabled={isLoading}
      />

      <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary', fontSize: 14 }}>
        {t('login.noAccount')}{' '}
        <Link component={RouterLink} to="/register" sx={{ fontWeight: 600, textDecoration: 'none' }}>
          {t('login.register')}
        </Link>
      </Typography>
    </AuthLayout>
  );
}

export default LoginPage;
