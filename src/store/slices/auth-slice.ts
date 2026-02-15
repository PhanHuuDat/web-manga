import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/api/auth-api-service';
import type { AuthResponse, UserProfile } from '../../types/auth-types';
import type { RootState } from '../index';

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// Extract error message from API ProblemDetails or fallback
function extractError(err: unknown): string {
  if (
    typeof err === 'object' &&
    err !== null &&
    'response' in err
  ) {
    const resp = (err as { response?: { data?: { detail?: string; errors?: string[] } } }).response;
    if (resp?.data?.detail) return resp.data.detail;
    if (resp?.data?.errors) return resp.data.errors.join('; ');
  }
  return 'Something went wrong. Please try again.';
}

export const loginThunk = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const registerThunk = createAsyncThunk<
  void,
  { username: string; email: string; password: string; confirmPassword: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    await authApi.register(data);
  } catch (err) {
    return rejectWithValue(extractError(err));
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

export const refreshTokenThunk = createAsyncThunk<AuthResponse>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.refreshToken();
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getCurrentUserThunk = createAsyncThunk<UserProfile>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser();
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
      })
      // Refresh
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      // Get current user
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setCredentials, clearAuth, clearError } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;
