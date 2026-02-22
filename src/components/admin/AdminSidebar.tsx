import { useLocation, NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/auth-slice';
import {
  adminNavItems,
  backToSiteItem,
  ADMIN_ROLES,
  type AdminNavItem,
} from './admin-navigation-config';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 64;

const SIDEBAR_BG = '#111827';
const ACTIVE_COLOR = '#3b82f6';
const TEXT_COLOR = '#94a3b8';
const TEXT_ACTIVE_COLOR = '#f1f5f9';

interface AdminSidebarProps {
  open: boolean;
  onToggle: () => void;
}

function NavItemButton({ item, collapsed, active }: { item: AdminNavItem; collapsed: boolean; active: boolean }) {
  const Icon = item.icon;
  const { t } = useTranslation('admin');
  // labelKey is a dynamic string from config — cast to any to bypass strict i18next key types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const label = t(item.labelKey as any);

  const button = (
    <ListItemButton
      component={NavLink}
      to={item.path}
      end={item.path === '/admin'}
      sx={{
        minHeight: 48,
        px: collapsed ? 1.5 : 2,
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 1,
        mx: 0.5,
        mb: 0.5,
        bgcolor: active ? 'rgba(59,130,246,0.15)' : 'transparent',
        '&:hover': { bgcolor: active ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)' },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: collapsed ? 0 : 1.5,
          justifyContent: 'center',
          color: active ? ACTIVE_COLOR : TEXT_COLOR,
        }}
      >
        <Icon fontSize="small" />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: 14,
            fontFamily: 'Outfit, sans-serif',
            fontWeight: active ? 600 : 400,
            color: active ? TEXT_ACTIVE_COLOR : TEXT_COLOR,
            textTransform: 'capitalize',
          }}
        />
      )}
    </ListItemButton>
  );

  if (collapsed) {
    return (
      <Tooltip title={label} placement="right">
        <ListItem disablePadding sx={{ display: 'block' }}>
          {button}
        </ListItem>
      </Tooltip>
    );
  }

  return <ListItem disablePadding sx={{ display: 'block' }}>{button}</ListItem>;
}

function SidebarContent({ open, onToggle }: AdminSidebarProps) {
  const { pathname } = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const userRoles = user?.roles ?? [];

  const visibleItems = adminNavItems.filter((item) => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
    return item.requiredRoles.some((r) => userRoles.includes(r));
  });

  // Show back-to-site only if user has admin role
  const canSeeAdmin = userRoles.some((r) => ADMIN_ROLES.includes(r));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: SIDEBAR_BG,
        overflowX: 'hidden',
        transition: 'width 0.2s ease',
        width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
      }}
    >
      {/* Logo / branding area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-start' : 'center',
          px: open ? 2 : 1,
          py: 2,
          minHeight: 64,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {open && (
          <Box
            sx={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 18,
              color: '#f1f5f9',
              letterSpacing: '-0.5px',
              userSelect: 'none',
            }}
          >
            Admin
          </Box>
        )}
        {!open && (
          <Box sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: ACTIVE_COLOR }}>
            A
          </Box>
        )}
      </Box>

      {/* Main nav items */}
      <List sx={{ flex: 1, pt: 1, px: 0 }}>
        {visibleItems.map((item) => (
          <NavItemButton
            key={item.path}
            item={item}
            collapsed={!open}
            active={item.path === '/admin' ? pathname === '/admin' : pathname.startsWith(item.path)}
          />
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      {/* Back to site + toggle */}
      <List sx={{ pt: 1, pb: 1 }}>
        {canSeeAdmin && (
          <NavItemButton
            item={backToSiteItem}
            collapsed={!open}
            active={false}
          />
        )}
        <ListItem disablePadding sx={{ display: 'block', mt: 0.5 }}>
          <ListItemButton
            onClick={onToggle}
            sx={{
              minHeight: 40,
              px: !open ? 1.5 : 2,
              justifyContent: !open ? 'center' : 'flex-end',
              borderRadius: 1,
              mx: 0.5,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            <IconButton size="small" sx={{ color: TEXT_COLOR, p: 0 }}>
              {open ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </IconButton>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

function AdminSidebar({ open, onToggle }: AdminSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            bgcolor: SIDEBAR_BG,
            border: 'none',
          },
        }}
      >
        <SidebarContent open={true} onToggle={onToggle} />
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          bgcolor: SIDEBAR_BG,
          border: 'none',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <SidebarContent open={open} onToggle={onToggle} />
    </Drawer>
  );
}

export default AdminSidebar;
