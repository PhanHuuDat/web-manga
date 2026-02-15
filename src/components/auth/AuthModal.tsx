import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginThunk,
  registerThunk,
  getCurrentUserThunk,
  selectAuthError,
  selectAuthLoading,
  selectAuthModalOpen,
  selectAuthModalView,
  closeAuthModal,
  switchAuthModalView,
} from '../../store/slices/auth-slice';

function AuthModal() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectAuthModalOpen);
  const view = useAppSelector(selectAuthModalView);
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);

  const handleClose = () => dispatch(closeAuthModal());

  const handleLogin = async (email: string, password: string, _rememberMe: boolean) => {
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      dispatch(getCurrentUserThunk());
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    _acceptTerms: boolean,
  ) => {
    const result = await dispatch(registerThunk({ username, email, password, confirmPassword }));
    if (registerThunk.fulfilled.match(result)) {
      dispatch(switchAuthModalView('login'));
    }
  };

  const handleForgotPassword = () => {
    handleClose();
    navigate('/forgot-password');
  };

  const handleSocialLogin = (_provider: 'google' | 'facebook') => {
    // TODO: Implement social login
  };

  const isLogin = view === 'login';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <DialogContent sx={{ p: 4, position: 'relative' }}>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
            MangaVoid
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t(isLogin ? 'login.title' : 'register.title')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {t(isLogin ? 'login.subtitle' : 'register.subtitle')}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSocialLogin={handleSocialLogin}
            disabled={isLoading}
          />
        ) : (
          <RegisterForm onSubmit={handleRegister} disabled={isLoading} />
        )}

        {/* Switch between login/register */}
        <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary', fontSize: 14 }}>
          {t(isLogin ? 'login.noAccount' : 'register.hasAccount')}{' '}
          <Link
            component="button"
            onClick={() => dispatch(switchAuthModalView(isLogin ? 'register' : 'login'))}
            sx={{ fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
          >
            {t(isLogin ? 'login.register' : 'register.login')}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
