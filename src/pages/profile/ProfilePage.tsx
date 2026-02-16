import { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Avatar, TextField, IconButton, Chip,
  Card, CardContent, Skeleton, Snackbar, Alert,
} from '@mui/material';
import {
  Edit, Save, Close, CameraAlt,
  Bookmark, History, ChatBubbleOutline, VerifiedUser,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser, getCurrentUserThunk } from '../../store/slices/auth-slice';
import { userApi, type UserStatsResponse } from '../../services/api/user-api-service';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [stats, setStats] = useState<UserStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({
    open: false, msg: '', severity: 'success',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userApi.getStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user?.displayName]);

  const handleSaveDisplayName = async () => {
    setSaving(true);
    try {
      await userApi.updateProfile({ displayName: displayName || undefined });
      await dispatch(getCurrentUserThunk());
      setEditing(false);
      setSnackbar({ open: true, msg: 'Profile updated', severity: 'success' });
    } catch {
      setSnackbar({ open: true, msg: 'Failed to update profile', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await userApi.uploadAvatar(file);
      await dispatch(getCurrentUserThunk());
      setSnackbar({ open: true, msg: 'Avatar updated', severity: 'success' });
    } catch {
      setSnackbar({ open: true, msg: 'Failed to upload avatar', severity: 'error' });
    }
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={200} sx={{ mx: 'auto' }} />
      </Box>
    );
  }

  const statCards = [
    { icon: <Bookmark sx={{ fontSize: 20 }} />, label: 'Bookmarks', value: stats?.bookmarkCount ?? 0 },
    { icon: <History sx={{ fontSize: 20 }} />, label: 'Read', value: stats?.historyCount ?? 0 },
    { icon: <ChatBubbleOutline sx={{ fontSize: 20 }} />, label: 'Comments', value: stats?.commentCount ?? 0 },
  ];

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 4 } }}>
      {/* Profile Card */}
      <Card sx={{ bgcolor: '#1a1e2e', borderRadius: 4, overflow: 'visible', mb: 3 }}>
        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {/* Avatar with upload */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.avatarUrl || undefined}
              sx={{ width: 100, height: 100, bgcolor: '#3b82f6', fontSize: 36, fontWeight: 700 }}
            >
              {(user.displayName || user.username).charAt(0).toUpperCase()}
            </Avatar>
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              sx={{
                position: 'absolute', bottom: 0, right: -4,
                bgcolor: '#3b82f6', width: 32, height: 32,
                '&:hover': { bgcolor: '#2563eb' },
              }}
            >
              <CameraAlt sx={{ fontSize: 16, color: '#fff' }} />
            </IconButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={handleAvatarUpload}
            />
          </Box>

          {/* Username */}
          <Typography sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: '#f1f5f9' }}>
            {user.username}
          </Typography>

          {/* Display Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {editing ? (
              <>
                <TextField
                  size="small"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display name"
                  inputProps={{ maxLength: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#121520', borderRadius: 2,
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                  }}
                />
                <IconButton onClick={handleSaveDisplayName} disabled={saving} size="small" sx={{ color: '#22c55e' }}>
                  <Save fontSize="small" />
                </IconButton>
                <IconButton onClick={() => { setEditing(false); setDisplayName(user.displayName || ''); }} size="small" sx={{ color: '#94a3b8' }}>
                  <Close fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#94a3b8' }}>
                  {user.displayName || 'No display name set'}
                </Typography>
                <IconButton onClick={() => setEditing(true)} size="small" sx={{ color: '#94a3b8' }}>
                  <Edit sx={{ fontSize: 16 }} />
                </IconButton>
              </>
            )}
          </Box>

          {/* Info chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label={`Level ${user.level}`}
              size="small"
              sx={{ bgcolor: '#3b82f6', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            />
            {user.emailConfirmed && (
              <Chip
                icon={<VerifiedUser sx={{ fontSize: 14, color: '#22c55e !important' }} />}
                label="Verified"
                size="small"
                sx={{ bgcolor: 'rgba(34,197,94,0.1)', color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}
              />
            )}
            {user.roles.map((role) => (
              <Chip
                key={role}
                label={role}
                size="small"
                sx={{ bgcolor: 'rgba(168,85,247,0.15)', color: '#a855f7', fontFamily: 'JetBrains Mono, monospace' }}
              />
            ))}
          </Box>

          {/* Email */}
          <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#64748b' }}>
            {user.email}
          </Typography>
        </CardContent>
      </Card>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {statCards.map((s) => (
          <Card key={s.label} sx={{ bgcolor: '#1a1e2e', borderRadius: 3, textAlign: 'center' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ color: '#3b82f6', mb: 1 }}>{s.icon}</Box>
              {statsLoading ? (
                <Skeleton width={40} sx={{ mx: 'auto' }} />
              ) : (
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 20, color: '#f1f5f9' }}>
                  {s.value}
                </Typography>
              )}
              <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b' }}>
                {s.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
