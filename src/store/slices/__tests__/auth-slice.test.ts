import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import authReducer, {
  setCredentials,
  clearAuth,
  clearError,
  loginThunk,
  logoutThunk,
  refreshTokenThunk,
  getCurrentUserThunk,
  selectIsAuthenticated,
  selectCurrentUser,
  selectAuthError,
  selectAuthLoading,
} from '../auth-slice';
import type { RootState } from '../../index';

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { auth: authReducer, comments: (state = {}) => state },
    preloadedState: preloadedState as RootState,
  });
}

describe('auth-slice reducers', () => {
  it('has correct initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
    });
  });

  it('setCredentials sets accessToken', () => {
    const state = authReducer(undefined, setCredentials({ accessToken: 'test-token' }));
    expect(state.accessToken).toBe('test-token');
  });

  it('clearAuth resets to initial state', () => {
    const prevState = {
      user: { id: '1', username: 'test', displayName: null, email: 'test@test.com', avatarUrl: null, roles: ['Reader'], emailConfirmed: true },
      accessToken: 'token',
      isLoading: false,
      error: 'some error',
    };
    const state = authReducer(prevState, clearAuth());
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.error).toBeNull();
  });

  it('clearError clears error', () => {
    const prevState = {
      user: null,
      accessToken: null,
      isLoading: false,
      error: 'some error',
    };
    const state = authReducer(prevState, clearError());
    expect(state.error).toBeNull();
  });
});

describe('auth-slice extraReducers', () => {
  it('loginThunk.pending sets isLoading true and clears error', () => {
    const state = authReducer(
      { user: null, accessToken: null, isLoading: false, error: 'old error' },
      { type: loginThunk.pending.type },
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loginThunk.fulfilled sets accessToken', () => {
    const state = authReducer(
      { user: null, accessToken: null, isLoading: true, error: null },
      {
        type: loginThunk.fulfilled.type,
        payload: { accessToken: 'jwt-token', expiresAt: '2026-01-01', userId: '1', username: 'test', displayName: null },
      },
    );
    expect(state.isLoading).toBe(false);
    expect(state.accessToken).toBe('jwt-token');
  });

  it('loginThunk.rejected sets error', () => {
    const state = authReducer(
      { user: null, accessToken: null, isLoading: true, error: null },
      { type: loginThunk.rejected.type, payload: 'Invalid credentials' },
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('logoutThunk.fulfilled resets state', () => {
    const state = authReducer(
      { user: { id: '1', username: 'test', displayName: null, email: 'a@b.com', avatarUrl: null, roles: [], emailConfirmed: true }, accessToken: 'token', isLoading: false, error: null },
      { type: logoutThunk.fulfilled.type },
    );
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('refreshTokenThunk.fulfilled updates accessToken', () => {
    const state = authReducer(
      { user: null, accessToken: 'old-token', isLoading: false, error: null },
      {
        type: refreshTokenThunk.fulfilled.type,
        payload: { accessToken: 'new-token', expiresAt: '2026-01-01', userId: '1', username: 'test', displayName: null },
      },
    );
    expect(state.accessToken).toBe('new-token');
  });

  it('refreshTokenThunk.rejected clears auth', () => {
    const state = authReducer(
      { user: { id: '1', username: 'test', displayName: null, email: 'a@b.com', avatarUrl: null, roles: [], emailConfirmed: true }, accessToken: 'token', isLoading: false, error: null },
      { type: refreshTokenThunk.rejected.type },
    );
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('getCurrentUserThunk.fulfilled sets user', () => {
    const profile = { id: '1', username: 'test', displayName: 'Test', email: 'a@b.com', avatarUrl: null, roles: ['Reader'], emailConfirmed: true };
    const state = authReducer(
      { user: null, accessToken: 'token', isLoading: false, error: null },
      { type: getCurrentUserThunk.fulfilled.type, payload: profile },
    );
    expect(state.user).toEqual(profile);
  });
});

describe('auth-slice selectors', () => {
  it('selectIsAuthenticated returns true when accessToken present', () => {
    const store = createStore({ auth: { user: null, accessToken: 'token', isLoading: false, error: null } });
    expect(selectIsAuthenticated(store.getState())).toBe(true);
  });

  it('selectIsAuthenticated returns false when no accessToken', () => {
    const store = createStore();
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });

  it('selectCurrentUser returns user', () => {
    const user = { id: '1', username: 'test', displayName: null, email: 'a@b.com', avatarUrl: null, roles: ['Reader'], emailConfirmed: true };
    const store = createStore({ auth: { user, accessToken: 'token', isLoading: false, error: null } });
    expect(selectCurrentUser(store.getState())).toEqual(user);
  });

  it('selectAuthError returns error', () => {
    const store = createStore({ auth: { user: null, accessToken: null, isLoading: false, error: 'test error' } });
    expect(selectAuthError(store.getState())).toBe('test error');
  });

  it('selectAuthLoading returns loading state', () => {
    const store = createStore({ auth: { user: null, accessToken: null, isLoading: true, error: null } });
    expect(selectAuthLoading(store.getState())).toBe(true);
  });
});
