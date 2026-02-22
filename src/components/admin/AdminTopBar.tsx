import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/auth-slice';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './AdminSidebar';

interface AdminTopBarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

function AdminTopBar({ onMenuClick, sidebarOpen }: AdminTopBarProps) {
  const user = useAppSelector(selectCurrentUser);

  const displayName = user?.displayName ?? user?.username ?? 'Admin';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#111827',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        width: {
          xs: '100%',
          md: `calc(100% - ${sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}px)`,
        },
        ml: {
          xs: 0,
          md: `${sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}px`,
        },
        transition: 'width 0.2s ease, margin-left 0.2s ease',
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 } }}>
        {/* Mobile: hamburger to open temporary drawer */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ color: '#94a3b8', mr: 1, display: { md: 'none' } }}
          aria-label="toggle sidebar"
        >
          <MenuIcon />
        </IconButton>

        {/* Page title area */}
        <Typography
          sx={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: '#f1f5f9',
            flexGrow: 1,
          }}
        >
          Admin
        </Typography>

        {/* User info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              color: '#94a3b8',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {displayName}
          </Typography>
          <Avatar
            src={user?.avatarUrl ?? undefined}
            alt={displayName}
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#3b82f6',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {!user?.avatarUrl && avatarLetter}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminTopBar;
