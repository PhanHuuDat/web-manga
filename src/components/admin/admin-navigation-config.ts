import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import type { SvgIconComponent } from '@mui/icons-material';

export interface AdminNavItem {
  labelKey: string; // i18n key under 'admin' namespace
  path: string;
  icon: SvgIconComponent;
  requiredRoles?: string[]; // if empty/undefined = all admin roles can see
}

export const ADMIN_ROLES = ['Admin', 'Moderator', 'Uploader'];

export const adminNavItems: AdminNavItem[] = [
  { labelKey: 'sidebar.dashboard', path: '/admin', icon: DashboardIcon },
  { labelKey: 'sidebar.manga', path: '/admin/manga', icon: MenuBookIcon },
  {
    labelKey: 'sidebar.users',
    path: '/admin/users',
    icon: PeopleIcon,
    requiredRoles: ['Admin'],
  },
  {
    labelKey: 'sidebar.comments',
    path: '/admin/comments',
    icon: CommentIcon,
    requiredRoles: ['Admin', 'Moderator'],
  },
];

export const backToSiteItem: AdminNavItem = {
  labelKey: 'sidebar.backToSite',
  path: '/',
  icon: HomeIcon,
};
