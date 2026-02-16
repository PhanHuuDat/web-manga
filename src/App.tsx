import { Routes, Route, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MangaDetailPage from './pages/manga/MangaDetailPage';
import MangaCreatePage from './pages/manga/MangaCreatePage';
import MangaEditPage from './pages/manga/MangaEditPage';
import ChapterCreatePage from './pages/manga/ChapterCreatePage';
import ChapterEditPage from './pages/manga/ChapterEditPage';
import ReaderPage from './pages/reader/ReaderPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import BookmarkListPage from './pages/bookmark/BookmarkListPage';
import ReadingHistoryPage from './pages/reading-history/ReadingHistoryPage';
import ProfilePage from './pages/profile/ProfilePage';
import SearchResultsPage from './pages/search/SearchResultsPage';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/manga/create" element={<ProtectedRoute><MangaCreatePage /></ProtectedRoute>} />
          <Route path="/manga/:slug" element={<MangaDetailPage />} />
          <Route path="/manga/:id/edit" element={<ProtectedRoute><MangaEditPage /></ProtectedRoute>} />
          <Route path="/manga/:id/chapters/create" element={<ProtectedRoute><ChapterCreatePage /></ProtectedRoute>} />
          <Route path="/chapters/:id/edit" element={<ProtectedRoute><ChapterEditPage /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><BookmarkListPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><ReadingHistoryPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>

        {/* Reader page without layout (fullscreen) — ID-based route */}
        <Route path="/read/:mangaSlug/:chapterSlug" element={<ReaderPage />} />

        {/* Auth pages without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* 404 catch-all */}
        <Route
          path="*"
          element={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#0a0c14',
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#3b82f6',
                  mb: 2,
                }}
              >
                404
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#f1f5f9',
                  mb: 1,
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 14,
                  color: '#94a3b8',
                  mb: 3,
                }}
              >
                The page you are looking for does not exist
              </Typography>
              <Button
                component={Link}
                to="/"
                startIcon={<Home />}
                variant="contained"
                sx={{
                  bgcolor: '#3b82f6',
                  fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { bgcolor: '#2563eb' },
                }}
              >
                Back to Home
              </Button>
            </Box>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
