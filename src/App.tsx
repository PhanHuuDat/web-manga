import { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Eager admin CRUD pages — small, admin-only, no need to split
import MangaCreatePage from './pages/manga/MangaCreatePage';
import MangaEditPage from './pages/manga/MangaEditPage';
import ChapterCreatePage from './pages/manga/ChapterCreatePage';
import ChapterEditPage from './pages/manga/ChapterEditPage';

// Lazy-loaded public pages — heavy, split for faster initial load
const MangaDetailPage = lazy(() => import('./pages/manga/MangaDetailPage'));
const ReaderPage = lazy(() => import('./pages/reader/ReaderPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const BookmarkListPage = lazy(() => import('./pages/bookmark/BookmarkListPage'));
const ReadingHistoryPage = lazy(() => import('./pages/reading-history/ReadingHistoryPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SearchResultsPage = lazy(() => import('./pages/search/SearchResultsPage'));

// Lazy-loaded admin bundle — kept out of main chunk for performance
const AdminRoute = lazy(() => import('./components/admin/AdminRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminMangaListPage = lazy(() => import('./pages/admin/AdminMangaListPage'));
const AdminChapterListPage = lazy(() => import('./pages/admin/AdminChapterListPage'));
const AdminUserListPage = lazy(() => import('./pages/admin/AdminUserListPage'));
const AdminCommentListPage = lazy(() => import('./pages/admin/AdminCommentListPage'));

// Redirects old public CRUD routes to their /admin/* equivalents
function RedirectToAdmin() {
  const location = useLocation();
  const adminPath = location.pathname.replace(/^\/(manga|chapters)/, '/admin/$1');
  return <Navigate to={adminPath} replace />;
}

// Shared full-page loading indicator for lazy route transitions
function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={32} />
    </Box>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Redirect old CRUD routes to admin */}
          <Route path="/manga/create" element={<ProtectedRoute><RedirectToAdmin /></ProtectedRoute>} />
          <Route
            path="/manga/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <MangaDetailPage />
              </Suspense>
            }
          />
          <Route path="/manga/:id/edit" element={<ProtectedRoute><RedirectToAdmin /></ProtectedRoute>} />
          <Route path="/manga/:id/chapters/create" element={<ProtectedRoute><RedirectToAdmin /></ProtectedRoute>} />
          <Route path="/chapters/:id/edit" element={<ProtectedRoute><RedirectToAdmin /></ProtectedRoute>} />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <BookmarkListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ReadingHistoryPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ProfilePage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<PageLoader />}>
                <SearchResultsPage />
              </Suspense>
            }
          />
        </Route>

        {/* Reader page without layout (fullscreen) */}
        <Route
          path="/read/:mangaSlug/:chapterSlug"
          element={
            <Suspense fallback={<PageLoader />}>
              <ReaderPage />
            </Suspense>
          }
        />

        {/* Auth pages without layout */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<PageLoader />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<PageLoader />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<PageLoader />}>
              <ResetPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Suspense fallback={<PageLoader />}>
              <VerifyEmailPage />
            </Suspense>
          }
        />

        {/* Admin routes — lazy loaded, role-gated */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminRoute />
            </Suspense>
          }
        >
          <Route
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboardPage />
                </Suspense>
              }
            />
            <Route
              path="manga"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminMangaListPage />
                </Suspense>
              }
            />
            <Route path="manga/create" element={<MangaCreatePage />} />
            <Route path="manga/:id/edit" element={<MangaEditPage />} />
            <Route
              path="manga/:id/chapters"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminChapterListPage />
                </Suspense>
              }
            />
            <Route path="manga/:id/chapters/create" element={<ChapterCreatePage />} />
            <Route path="chapters/:id/edit" element={<ChapterEditPage />} />
            <Route
              path="users"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminUserListPage />
                </Suspense>
              }
            />
            <Route
              path="comments"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminCommentListPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

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
