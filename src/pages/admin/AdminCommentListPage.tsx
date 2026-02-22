import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Visibility, Delete } from '@mui/icons-material';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import AdminDeleteConfirmDialog from '../../components/admin/AdminDeleteConfirmDialog';
import CommentDetailDialog from '../../components/admin/CommentDetailDialog';
import { adminApi } from '../../services/api/admin-api-service';
import { commentApi } from '../../services/api/comment-api-service';
import type { AdminCommentDto } from '../../types/admin-api-types';

const PAGE_SIZE = 20;
const TRUNCATE_LEN = 100;

const cellSx = { color: '#f1f5f9', borderColor: 'rgba(255,255,255,0.08)' };
const headCellSx = { color: '#94a3b8', borderColor: 'rgba(255,255,255,0.08)', fontWeight: 600 };

function truncate(text: string, len: number) {
  return text.length > len ? text.slice(0, len) + '…' : text;
}

function AdminCommentListPage() {
  const { t } = useTranslation('admin');
  const [comments, setComments] = useState<AdminCommentDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewTarget, setViewTarget] = useState<AdminCommentDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCommentDto | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchComments = useCallback(() => {
    setLoading(true);
    setError(null);
    adminApi
      .listComments({ page: page + 1, pageSize: PAGE_SIZE, search: search || undefined })
      .then((res) => { setComments(res.data); setTotalCount(res.totalCount); })
      .catch(() => setError('Failed to load comments.'))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(0);
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await commentApi.remove(deleteTarget.id);
      setDeleteTarget(null);
      fetchComments();
    } catch {
      setError('Failed to delete comment.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AdminPageHeader title={t('comments.title')} backPath="/admin" />

      <Box sx={{ mb: 3 }}>
        <AdminSearchBar value={search} onChange={handleSearchChange} placeholder={t('common.search')} />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer sx={{ bgcolor: '#1a1e2e', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={headCellSx}>{t('table.content')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.author')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.mangaTitle')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.createdDate')}</TableCell>
              <TableCell sx={headCellSx}>{t('common.status')}</TableCell>
              <TableCell sx={headCellSx} align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} sx={{ ...cellSx, textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#94a3b8' }}>Loading...</Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading && comments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ ...cellSx, textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#94a3b8' }}>{t('comments.noComments')}</Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading && comments.map((comment) => (
              <TableRow
                key={comment.id}
                hover
                sx={{
                  opacity: comment.isDeleted ? 0.5 : 1,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
                }}
              >
                <TableCell sx={{ ...cellSx, maxWidth: 260, cursor: 'pointer' }} onClick={() => setViewTarget(comment)}>
                  <Tooltip title={t('comments.viewFull')}>
                    <Typography sx={{ fontSize: 13, color: '#f1f5f9' }}>
                      {truncate(comment.content, TRUNCATE_LEN)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ ...cellSx, fontSize: 13, color: '#94a3b8' }}>{comment.username}</TableCell>
                <TableCell sx={{ ...cellSx, fontSize: 13, color: '#94a3b8' }}>
                  {comment.mangaTitle ?? '—'}
                </TableCell>
                <TableCell sx={{ ...cellSx, fontSize: 13, color: '#94a3b8' }}>
                  {new Date(comment.createdDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={cellSx}>
                  {comment.isDeleted
                    ? <Chip label={t('comments.deleted')} size="small" color="error" />
                    : <Chip label={t('comments.active')} size="small" sx={{ bgcolor: '#22c55e', color: '#fff' }} />}
                </TableCell>
                <TableCell sx={cellSx} align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <Tooltip title={t('comments.viewFull')}>
                      <IconButton size="small" onClick={() => setViewTarget(comment)} sx={{ color: '#94a3b8' }}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {!comment.isDeleted && (
                      <Tooltip title={t('common.delete')}>
                        <IconButton size="small" onClick={() => setDeleteTarget(comment)} sx={{ color: '#ef4444' }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
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
          onPageChange={(_, p) => setPage(p)}
          sx={{ color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        />
      </TableContainer>

      <CommentDetailDialog
        open={viewTarget !== null}
        comment={viewTarget}
        onClose={() => setViewTarget(null)}
      />

      <AdminDeleteConfirmDialog
        open={deleteTarget !== null}
        title={t('comments.deleteTitle')}
        message={t('comments.deleteMessage')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Box>
  );
}

export default AdminCommentListPage;
