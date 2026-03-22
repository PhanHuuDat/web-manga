import { memo } from 'react';
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

// Static sx objects hoisted to module level to prevent recreation on each render
const cardSx = {
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
} as const;

const thumbnailContainerSx = {
  width: { xs: 80, sm: 100 },
  flexShrink: 0,
  aspectRatio: '3 / 4',
  borderRadius: 2,
  overflow: 'hidden',
} as const;

const imgSx = { width: '100%', height: '100%', objectFit: 'cover' } as const;

const infoBoxSx = { flex: 1, display: 'flex', flexDirection: 'column', gap: 1 } as const;

const titleSx = {
  fontWeight: 600,
  fontSize: { xs: 14, sm: 16 },
  color: 'text.primary',
} as const;

const authorSx = { fontSize: 12, color: 'text.secondary' } as const;

const metaBoxSx = { display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' } as const;

const metaTextSx = { fontSize: 11, color: 'text.disabled' } as const;

function MangaListCard({ manga }: MangaListCardProps) {
  const statusLabel = getStatusLabel(manga.status);

  return (
    <Box component={Link} to={`/manga/${manga.id}`} sx={cardSx}>
      {/* Thumbnail */}
      <Box sx={thumbnailContainerSx}>
        <Box
          component="img"
          src={manga.coverUrl ?? '/placeholder-cover.png'}
          alt={manga.title}
          loading="lazy"
          sx={imgSx}
        />
      </Box>

      {/* Info */}
      <Box sx={infoBoxSx}>
        <Typography sx={titleSx}>{manga.title}</Typography>

        <Typography sx={authorSx}>{manga.authorName}</Typography>

        <Badge type={statusLabel} size="small" />

        {/* Meta */}
        <Box sx={metaBoxSx}>
          <Typography sx={metaTextSx}>Ch. {manga.totalChapters}</Typography>
          <Typography sx={metaTextSx}>{formatNumber(manga.views)} views</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(MangaListCard);
