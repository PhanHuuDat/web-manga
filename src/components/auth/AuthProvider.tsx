import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import {
  refreshTokenThunk,
  getCurrentUserThunk,
  setCredentials,
  clearAuth,
} from '../../store/slices/auth-slice';
import { setAuthInterceptorCallbacks } from '../../services/api/axios-instance';
import { store } from '../../store';

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const initCalled = useRef(false);

  useEffect(() => {
    // Wire up axios interceptor callbacks
    setAuthInterceptorCallbacks({
      getAccessToken: () => store.getState().auth.accessToken,
      onTokenRefreshed: (token: string) => {
        dispatch(setCredentials({ accessToken: token }));
      },
      onRefreshFailed: () => {
        dispatch(clearAuth());
      },
    });

    // Guard against StrictMode double-mount in dev
    if (initCalled.current) return;
    initCalled.current = true;

    // Only attempt refresh if user has logged in before
    if (!localStorage.getItem('isLoggedIn')) {
      setIsInitialized(true);
      return;
    }

    const initAuth = async () => {
      try {
        const result = await dispatch(refreshTokenThunk()).unwrap();
        if (result.accessToken) {
          await dispatch(getCurrentUserThunk());
        }
      } catch {
        // Refresh failed — clear the flag
        localStorage.removeItem('isLoggedIn');
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#0a0c14',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}

export default AuthProvider;
