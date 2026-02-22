import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import UserRoleEditDialog from '../../components/admin/UserRoleEditDialog';
import { adminApi } from '../../services/api/admin-api-service';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/auth-slice';
import type { AdminUserDto } from '../../types/admin-api-types';

const ROLE_COLORS: Record<string, string> = {
  Admin: '#ef4444',
  Moderator: '#f59e0b',
  Uploader: '#3b82f6',
  Reader: '#94a3b8',
};

const PAGE_SIZE = 20;

const cellSx = { color: '#f1f5f9', borderColor: 'rgba(255,255,255,0.08)' };
const headCellSx = { color: '#94a3b8', borderColor: 'rgba(255,255,255,0.08)', fontWeight: 600 };

function AdminUserListPage() {
  const { t } = useTranslation('admin');
  const currentUser = useAppSelector(selectCurrentUser);
  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<AdminUserDto | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    adminApi
      .listUsers({ page: page + 1, pageSize: PAGE_SIZE, search: search || undefined, role: roleFilter || undefined })
      .then((res) => { setUsers(res.data); setTotalCount(res.totalCount); })
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, [page, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(0);
  }, []);

  const handleStatusToggle = async (user: AdminUserDto) => {
    // Optimistic update
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
    try {
      await adminApi.updateUserStatus(user.id, { isActive: !user.isActive });
    } catch {
      // Revert on failure
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: user.isActive } : u));
    }
  };

  const handleRoleSave = async (userId: string, changes: { role: string; grant: boolean }[]) => {
    setSaving(true);
    try {
      await Promise.all(changes.map((c) => adminApi.updateUserRole(userId, c)));
      setEditTarget(null);
      fetchUsers();
    } catch {
      // keep dialog open on error
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AdminPageHeader title={t('users.title')} backPath="/admin" />

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <AdminSearchBar value={search} onChange={handleSearchChange} placeholder={t('common.search')} />
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <Select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }}
            displayEmpty
            sx={{ color: '#f1f5f9', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' } }}
          >
            <MenuItem value="">{t('users.allRoles')}</MenuItem>
            <MenuItem value="Reader">Reader</MenuItem>
            <MenuItem value="Uploader">Uploader</MenuItem>
            <MenuItem value="Moderator">Moderator</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer sx={{ bgcolor: '#1a1e2e', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={headCellSx}>{t('table.username')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.email')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.roles')}</TableCell>
              <TableCell sx={headCellSx}>{t('common.status')}</TableCell>
              <TableCell sx={headCellSx}>{t('table.joined')}</TableCell>
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
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ ...cellSx, textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#94a3b8' }}>{t('users.noUsers')}</Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading && users.map((user) => {
              const isSelf = user.id === currentUser?.id;
              return (
                <TableRow key={user.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                  <TableCell sx={cellSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatarUrl ?? undefined} sx={{ width: 32, height: 32, fontSize: 13 }}>
                        {user.username[0].toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontSize: 14, color: '#f1f5f9' }}>{user.username}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ ...cellSx, fontSize: 13, color: '#94a3b8' }}>{user.email}</TableCell>
                  <TableCell sx={cellSx}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {user.roles.map((r) => (
                        <Chip key={r} label={r} size="small" sx={{ bgcolor: ROLE_COLORS[r] ?? '#94a3b8', color: '#fff', fontSize: 11 }} />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Switch
                      checked={user.isActive}
                      onChange={() => handleStatusToggle(user)}
                      disabled={isSelf}
                      size="small"
                      sx={{ '& .Mui-checked .MuiSwitch-thumb': { color: '#22c55e' }, '& .Mui-checked + .MuiSwitch-track': { bgcolor: '#22c55e' } }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...cellSx, fontSize: 13, color: '#94a3b8' }}>
                    {new Date(user.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={cellSx} align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setEditTarget(user)}
                      disabled={isSelf}
                      sx={{ fontSize: 12, borderColor: 'rgba(255,255,255,0.2)', color: '#94a3b8', textTransform: 'none' }}
                    >
                      {t('users.editRoles')}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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

      <UserRoleEditDialog
        open={editTarget !== null}
        user={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleRoleSave}
        loading={saving}
      />
    </Box>
  );
}

export default AdminUserListPage;
