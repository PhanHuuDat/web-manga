import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

type BadgeVariant = 'hot' | 'new' | 'top' | 'ongoing' | 'completed' | 'hiatus';

interface StatusBadgeProps extends Omit<ChipProps, 'variant'> {
  variant: BadgeVariant;
}

const BADGE_STYLES: Record<BadgeVariant, { bgcolor: string; color: string; borderColor?: string }> = {
  hot: { bgcolor: 'rgba(168, 85, 247, 0.8)', color: '#fff' },
  new: { bgcolor: 'rgba(34, 197, 94, 0.8)', color: '#fff' },
  top: { bgcolor: 'rgba(37, 99, 235, 0.8)', color: '#fff' },
  ongoing: { bgcolor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' },
  completed: { bgcolor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.3)' },
  hiatus: { bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' },
};

const BADGE_LABELS: Record<BadgeVariant, string> = {
  hot: 'HOT',
  new: 'NEW',
  top: 'TOP',
  ongoing: 'Ongoing',
  completed: 'Completed',
  hiatus: 'Hiatus',
};

function StatusBadge({ variant, label, sx, ...props }: StatusBadgeProps) {
  const styles = BADGE_STYLES[variant];

  return (
    <Chip
      label={label || BADGE_LABELS[variant]}
      size="small"
      sx={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        height: 22,
        bgcolor: styles.bgcolor,
        color: styles.color,
        border: styles.borderColor ? `1px solid ${styles.borderColor}` : 'none',
        ...sx,
      }}
      {...props}
    />
  );
}

export default StatusBadge;
