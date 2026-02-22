import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import GlassCard from '../common/GlassCard';

interface AdminStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | null; // null = loading
  color?: string;
}

function AdminStatCard({ icon, label, value, color = '#3b82f6' }: AdminStatCardProps) {
  return (
    <GlassCard hover={false} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        {value !== null ? (
          <Typography
            sx={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 28,
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1,
            }}
          >
            {value.toLocaleString()}
          </Typography>
        ) : (
          <Skeleton width={60} height={36} />
        )}
        <Typography
          sx={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            color: '#94a3b8',
            mt: 0.5,
          }}
        >
          {label}
        </Typography>
      </Box>
    </GlassCard>
  );
}

export default AdminStatCard;
