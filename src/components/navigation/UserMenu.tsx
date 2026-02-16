import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/auth-slice';
import { logoutThunk } from '../../store/slices/auth-slice';

function UserMenu() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const displayName = user?.displayName || user?.username || 'User';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutThunk());
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={handleOpen} aria-label={t('nav.userMenu')} sx={{ p: 0.5 }}>
        <Avatar
          src={user?.avatarUrl || undefined}
          sx={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {avatarLetter}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              bgcolor: 'rgba(20, 22, 35, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'white' }}>
            {displayName}
          </Typography>
          {user?.email && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user.email}
            </Typography>
          )}
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <MenuItem onClick={handleProfile}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('navbar.profile')}</ListItemText>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
          <ListItemText sx={{ '& .MuiTypography-root': { color: '#ef4444' } }}>
            {t('navbar.logout')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
