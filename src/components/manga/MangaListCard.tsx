import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MangaDto } from '../../types/manga-api-types';
import { formatNumber } from '../../utils/format-number';
import { getStatusLabel } from '../../utils/enum-display-helpers';
import Badge from '../common/Badge';
import { customColors } from '../../theme/theme';

interface MangaListCardProps {
  manga: MangaDto;
}

function MangaListCard({ manga }: MangaListCardProps) {
  const statusLabel = getStatusLabel(manga.status);

  return (
    <Box
      component={Link}
      to={`/manga/${manga.id}`}
      sx={{
        display: 'flex',
        gap: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: customColors.cardBgHover,
          borderColor: 'primary.main',
        },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: { xs: 80, sm: 100 },
          flexShrink: 0,
          aspectRatio: '3 / 4',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={manga.coverUrl ?? '/placeholder-cover.png'}
          alt={manga.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 14, sm: 16 },
            color: 'text.primary',
          }}
        >
          {manga.title}
        </Typography>

        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          {manga.authorName}
        </Typography>

        <Badge type={statusLabel} size="small" />

        {/* Meta */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            Ch. {manga.totalChapters}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            {formatNumber(manga.views)} views
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MangaListCard;
