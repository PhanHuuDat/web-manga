import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ACTIVE_USERS } from '../../constants/mock-user-data';

function ActiveUsersSection() {
  const { t } = useTranslation('home');

  return (
    <Box
      sx={{
        bgcolor: 'rgba(26, 30, 46, 0.5)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.05)',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ width: 6, height: 24, bgcolor: 'success.main', borderRadius: 1 }} />
        <Typography sx={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>
          {t('activeUsers.title')}
        </Typography>
      </Box>

      {/* Users Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        {ACTIVE_USERS.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            {/* Avatar with status */}
            <Box sx={{ position: 'relative', mb: 1 }}>
              <Avatar src={user.avatarUrl} sx={{ width: 48, height: 48 }} />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  width: 14,
                  height: 14,
                  bgcolor: user.isOnline ? 'success.main' : 'text.disabled',
                  border: '2px solid #0a0c14',
                  borderRadius: '50%',
                }}
              />
            </Box>

            <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary' }}>
              {user.username}
            </Typography>
            <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>
              {t('activeUsers.level', { level: user.level })}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ActiveUsersSection;
