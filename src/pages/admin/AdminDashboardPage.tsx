import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { MenuBook, Layers, People, Comment, TrendingUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatCard from '../../components/admin/AdminStatCard';
import { adminApi } from '../../services/api/admin-api-service';
import type { AdminStatsDto } from '../../types/admin-api-types';

// Stat key type derived from AdminStatsDto keys mapped by dashboard
type StatKey = 'totalManga' | 'totalChapters' | 'totalUsers' | 'totalComments' | 'newUsersLast7Days';

function AdminDashboardPage() {
  const { t } = useTranslation('admin');
  const [stats, setStats] = useState<AdminStatsDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getStats().then(setStats).catch(() => setError('Failed to load stats'));
  }, []);

  // Build stat cards inside the component so t() is available for labels
  const statCards: Array<{ key: StatKey; icon: ReactNode; label: string; color: string }> = [
    { key: 'totalManga', icon: <MenuBook />, label: t('dashboard.totalManga'), color: '#3b82f6' },
    { key: 'totalChapters', icon: <Layers />, label: t('dashboard.totalChapters'), color: '#a855f7' },
    { key: 'totalUsers', icon: <People />, label: t('dashboard.totalUsers'), color: '#22c55e' },
    { key: 'totalComments', icon: <Comment />, label: t('dashboard.totalComments'), color: '#f59e0b' },
    { key: 'newUsersLast7Days', icon: <TrendingUp />, label: t('dashboard.newUsers7d'), color: '#ef4444' },
  ];

  return (
    <Box>
      <AdminPageHeader title={t('dashboard.title')} />
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {statCards.map((card) => (
          <Box
            key={card.key}
            sx={{
              flex: '1 1 200px',
              minWidth: 0,
            }}
          >
            <AdminStatCard
              icon={card.icon}
              label={card.label}
              value={stats ? stats[card.key] : null}
              color={card.color}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AdminDashboardPage;
