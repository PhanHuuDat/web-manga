import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { Add, Edit, ListAlt, Delete } from '@mui/icons-material';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import AdminDeleteConfirmDialog from '../../components/admin/AdminDeleteConfirmDialog';
import { mangaApi } from '../../services/api/manga-api-service';
import { SeriesStatus } from '../../types/manga-api-types';
import type { MangaDto } from '../../types/manga-api-types';

const STATUS_COLOR: Record<number, string> = { 0: '#22c55e', 1: '#3b82f6', 2: '#f59e0b' };
const PAGE_SIZE = 20;

function AdminMangaListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('admin');
  const [manga, setManga] = useState<MangaDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SeriesStatus | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MangaDto | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchManga = useCallback(() => {
    setLoading(true);
    setError(null);
    mangaApi
      .list({
        page: page + 1,
        pageSize: PAGE_SIZE,
        search: search || undefined,
        status: statusFilter !== '' ? statusFilter : undefined,
      })
      .then((res) => {
        setManga(res.data);
        setTotalCount(res.totalCount);
      })
      .catch(() => setError('Failed to load manga'))
      .finally(() => setLoading(false));
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchManga();
  }, [fetchManga]);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(0);
  }, []);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setDeleting(true);
    mangaApi
      .delete(deleteTarget.id)
      .then(() => {
        setDeleteTarget(null);
        fetchManga();
      })
      .catch(() => setError('Failed to delete manga'))
      .finally(() => setDeleting(false));
  };

  const STATUS_LABEL: Record<number, string> = {
    0: t('common.ongoing'),
    1: t('common.completed'),
    2: t('common.hiatus'),
  };

  const headerAction = (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={() => navigate('/admin/manga/create')}
      sx={{ bgcolor: '#3b82f6', textTransform: 'none', '&:hover': { bgcolor: '#2563eb' } }}
    >
      {t('manga.createNew')}
    </Button>
  );

  return (
    <Box>
      <AdminPageHeader title={t('manga.title')} action={headerAction} />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <AdminSearchBar value={search} onChange={handleSearchChange} placeholder={t('common.search')} />
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as SeriesStatus | ''); setPage(0); }}
          displayEmpty
          sx={{
            minWidth: 140,
            color: '#f1f5f9',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <MenuItem value="">{t('common.allStatuses')}</MenuItem>
          <MenuItem value={SeriesStatus.Ongoing}>{t('common.ongoing')}</MenuItem>
          <MenuItem value={SeriesStatus.Completed}>{t('common.completed')}</MenuItem>
          <MenuItem value={SeriesStatus.Hiatus}>{t('common.hiatus')}</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer sx={{ bgcolor: '#1a1e2e', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.cover')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.title')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('common.status')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>{t('table.chapters')}</TableCell>
              <TableCell sx={{ color: '#94a3b8' }}>Year</TableCell>
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
              : manga.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography sx={{ color: '#94a3b8', py: 4 }}>{t('manga.noManga')}</Typography>
                    </TableCell>
                  </TableRow>
                )
              : manga.map((m) => (
                  <TableRow key={m.id} hover>
                    <TableCell>
                      {m.coverUrl ? (
                        <Box
                          component="img"
                          src={m.coverUrl}
                          alt={m.title}
                          sx={{ width: 43, height: 64, objectFit: 'cover', borderRadius: 1 }}
                        />
                      ) : (
                        <Box sx={{ width: 43, height: 64, bgcolor: '#242938', borderRadius: 1 }} />
                      )}
                    </TableCell>
                    <TableCell sx={{ color: '#f1f5f9', maxWidth: 240 }}>
                      <Typography noWrap sx={{ fontWeight: 600 }}>{m.title}</Typography>
                      <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{m.authorName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_LABEL[m.status]}
                        size="small"
                        sx={{ bgcolor: `${STATUS_COLOR[m.status]}20`, color: STATUS_COLOR[m.status], fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#f1f5f9' }}>{m.totalChapters}</TableCell>
                    <TableCell sx={{ color: '#94a3b8' }}>{m.publishedYear ?? '—'}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(`/admin/manga/${m.id}/edit`)} sx={{ color: '#3b82f6' }}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/admin/manga/${m.id}/chapters`)} sx={{ color: '#a855f7' }}>
                        <ListAlt fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => setDeleteTarget(m)} sx={{ color: '#ef4444' }}>
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
        title={t('manga.deleteTitle')}
        message={t('manga.deleteMessage')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Box>
  );
}

export default AdminMangaListPage;
