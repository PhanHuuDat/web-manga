import type { User } from '../types/user-types';

export const ACTIVE_USERS: User[] = [
  {
    id: 'u1',
    username: 'Alex_V',
    avatarUrl: 'https://placehold.co/48x48/3b82f6/ffffff?text=AV',
    level: 42,
    isOnline: true,
  },
  {
    id: 'u2',
    username: 'GhostReader',
    avatarUrl: 'https://placehold.co/48x48/a855f7/ffffff?text=GR',
    level: 38,
    isOnline: true,
  },
  {
    id: 'u3',
    username: 'Saturn_0',
    avatarUrl: 'https://placehold.co/48x48/22c55e/ffffff?text=S0',
    level: 35,
    isOnline: true,
  },
  {
    id: 'u4',
    username: 'V_Kpop',
    avatarUrl: 'https://placehold.co/48x48/f59e0b/ffffff?text=VK',
    level: 29,
    isOnline: false,
  },
];
