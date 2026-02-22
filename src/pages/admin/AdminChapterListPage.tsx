import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminDeleteConfirmDialog from '../../components/admin/AdminDeleteConfirmDialog';
import { mangaApi } from '../../services/api/manga-api-service';
import { chapterApi } from '../../services/api/chapter-api-service';
import type { ChapterDto } from '../../types/manga-api-types';

const PAGE_SIZE = 20;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function AdminChapterListPage() {
  const { id: mangaId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('admin');

  const [mangaTitle, setMangaTitle] = useState<string>('');
  const [chapters, setChapters] = useState<ChapterDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChapterDto | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch manga title once
  useEffect(() => {
    if (!mangaId) return;
    mangaApi.get(mangaId).then((m) => setMangaTitle(m.title)).catch(() => {});
  }, [mangaId]);

  const fetchChapters = useCallback(() => {
    if (!mangaId) return;
    setLoading(true);
    setError(null);
    mangaApi
      .getChapters(mangaId, { page: page + 1, pageSize: PAGE_SIZE })
      .then((res) => {
        setChapters(res.data);
        setTotalCount(res.totalCount);
      })
      .catch(() => setError('Failed to load chapters'))
      .finally(() => setLoading(false));
  }, [mangaId, page]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setDeleting(true);
    chapterApi
      .delete(deleteTarget.id)
      .then(() => {
        setDeleteTarget(null);
        fetchChapters();
      })
      .catch(() => setError('Failed to delete chapter'))
      .finally(() => setDeleting(false));
  };

  const headerAction = (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={() => navigate(`/admin/manga/${mangaId}/chapters/create`)}
      sx={{ bgcolor: '#3b82f6', textTransform: 'none', '&:hover': { bgcolor: '#2563eb' } }}
    >
      {t('manga.addChapter')}
    </Button>
  );

  return (
    <Box>
      <AdminPageHeader
        title={mangaTitle ? `${mangaTitle} — ${t('manga.chapterList')}` : t('manga.chapterList')}
        action={headerAction}
        backPath="/admin/manga"
      />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer sx={{ bgcolor: '#1a1e2e', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.chapterNumber')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.title')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.pages')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.views')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.publishedAt')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }} align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              : chapters.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography sx={{ color: '#94a3b8', py: 4 }}>{t('manga.noChapters')}</Typography>
                    </TableCell>
                  </TableRow>
                )
              : chapters.map((ch) => (
                  <TableRow key={ch.id} hover>
                    <TableCell sx={{ color: '#f1f5f9', fontWeight: 700 }}>
                      {ch.chapterNumber}
                    </TableCell>
                    <TableCell sx={{ color: '#f1f5f9', maxWidth: 280 }}>
                      <Typography noWrap>{ch.title ?? `Chapter ${ch.chapterNumber}`}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#94a3b8' }}>{ch.pages}</TableCell>
                    <TableCell sx={{ color: '#94a3b8' }}>{ch.views.toLocaleString()}</TableCell>
                    <TableCell sx={{ color: '#94a3b8' }}>{formatDate(ch.publishedAt)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/chapters/${ch.id}/edit`)}
                        sx={{ color: '#3b82f6' }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setDeleteTarget(ch)}
                        sx={{ color: '#ef4444' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          onPageChange={(_, newPage) => setPage(newPage)}
          sx={{ color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        />
      </TableContainer>

      <AdminDeleteConfirmDialog
        open={!!deleteTarget}
        title={t('manga.deleteChapterTitle')}
        message={t('manga.deleteChapterMessage')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Box>
  );
}

export default AdminChapterListPage;
