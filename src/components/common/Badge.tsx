import Chip from '@mui/material/Chip';
import type { SeriesStatus, MangaBadge } from '../../types/manga-api-types';
import { getStatusLabel, getBadgeLabel } from '../../utils/enum-display-helpers';

type BadgeType = 'hot' | 'top' | 'new' | 'ongoing' | 'completed' | 'hiatus';

interface BadgeProps {
  type: BadgeType | SeriesStatus | MangaBadge;
  size?: 'small' | 'medium';
}

const badgeConfig: Record<
  BadgeType,
  { label: string; color: string; bgcolor: string }
> = {
  hot: {
    label: 'HOT',
    color: '#ef4444',
    bgcolor: 'rgba(239, 68, 68, 0.1)',
  },
  top: {
    label: 'TOP',
    color: '#f59e0b',
    bgcolor: 'rgba(245, 158, 11, 0.1)',
  },
  new: {
    label: 'NEW',
    color: '#22c55e',
    bgcolor: 'rgba(34, 197, 94, 0.1)',
  },
  ongoing: {
    label: 'ONGOING',
    color: '#3b82f6',
    bgcolor: 'rgba(59, 130, 246, 0.1)',
  },
  completed: {
    label: 'COMPLETED',
    color: '#22c55e',
    bgcolor: 'rgba(34, 197, 94, 0.1)',
  },
  hiatus: {
    label: 'HIATUS',
    color: '#94a3b8',
    bgcolor: 'rgba(148, 163, 184, 0.1)',
  },
};

function Badge({ type, size = 'small' }: BadgeProps) {
  // Resolve int enums to string keys
  const resolvedType: BadgeType = typeof type === 'number'
    ? (getStatusLabel(type) ?? getBadgeLabel(type) ?? 'ongoing')
    : type;
  const config = badgeConfig[resolvedType];

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        fontSize: size === 'small' ? 10 : 12,
        fontWeight: 700,
        height: size === 'small' ? 20 : 24,
        bgcolor: config.bgcolor,
        border: `1px solid ${config.color}40`,
        color: config.color,
        textTransform: 'uppercase',
      }}
    />
  );
}

export default Badge;
