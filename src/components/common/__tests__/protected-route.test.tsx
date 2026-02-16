import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import authReducer from '../../../store/slices/auth-slice';
import commentReducer from '../../../store/slices/comment-slice';
import mangaReducer from '../../../store/slices/manga-slice';
import chapterReducer from '../../../store/slices/chapter-slice';
import genreReducer from '../../../store/slices/genre-slice';
import ProtectedRoute from '../ProtectedRoute';

function renderWithAuth(accessToken: string | null, initialRoute = '/protected') {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      comments: commentReducer,
      manga: mangaReducer,
      chapter: chapterReducer,
      genre: genreReducer,
    },
    preloadedState: {
      auth: {
        user: accessToken ? { id: '1', username: 'test', displayName: null, email: 'a@b.com', avatarUrl: null, level: 1, roles: ['Reader'], emailConfirmed: true } : null,
        accessToken,
        isLoading: false,
        error: null,
        authModalOpen: false,
        authModalView: 'login' as const,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects to /login when not authenticated', () => {
    renderWithAuth(null);
    expect(screen.getByText('Login Page')).toBeDefined();
    expect(screen.queryByText('Protected Content')).toBeNull();
  });

  it('renders children when authenticated', () => {
    renderWithAuth('valid-token');
    expect(screen.getByText('Protected Content')).toBeDefined();
    expect(screen.queryByText('Login Page')).toBeNull();
  });
});
