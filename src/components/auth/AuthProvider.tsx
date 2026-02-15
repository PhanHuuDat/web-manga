import { useEffect, useState } from 'react';
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

    // Attempt silent refresh on mount
    const initAuth = async () => {
      try {
        const result = await dispatch(refreshTokenThunk()).unwrap();
        if (result.accessToken) {
          await dispatch(getCurrentUserThunk());
        }
      } catch {
        // Not logged in — that's fine
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
