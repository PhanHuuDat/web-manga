import { memo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { customColors } from '../../theme/theme';
import type { MangaDto } from '../../types/manga-api-types';

interface MangaRankCardProps {
  manga: MangaDto & { rank: number; viewsFormatted: string };
}

// Static sx objects hoisted to module level to prevent recreation on each render
const cardSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 1.5,
  borderRadius: 2,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s',
  '&:hover': { bgcolor: customColors.cardBgHover },
} as const;

const rankBadgeBaseSx = {
  width: 28,
  height: 28,
  borderRadius: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const thumbnailSx = {
  width: 48,
  height: 64,
  borderRadius: 1,
  overflow: 'hidden',
  flexShrink: 0,
} as const;

const imgSx = { width: '100%', height: '100%', objectFit: 'cover' } as const;

const infoBoxSx = { flex: 1, minWidth: 0 } as const;

const titleSx = {
  fontSize: 13,
  fontWeight: 600,
  color: 'text.primary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const;

const viewsSx = { fontSize: 11, color: 'text.disabled' } as const;

function MangaRankCard({ manga }: MangaRankCardProps) {
  const isFirst = manga.rank === 1;

  const rankBadgeSx = {
    ...rankBadgeBaseSx,
    bgcolor: isFirst ? 'primary.main' : 'action.selected',
  };

  const rankTextSx = {
    fontSize: 12,
    fontWeight: 700,
    color: isFirst ? 'white' : 'text.secondary',
  };

  return (
    <Box component={Link} to={`/manga/${manga.id}`} sx={cardSx}>
      {/* Rank Badge */}
      <Box sx={rankBadgeSx}>
        <Typography sx={rankTextSx}>{String(manga.rank).padStart(2, '0')}</Typography>
      </Box>

      {/* Thumbnail */}
      <Box sx={thumbnailSx}>
        <Box
          component="img"
          src={manga.coverUrl ?? '/placeholder-cover.png'}
          alt={manga.title}
          sx={imgSx}
        />
      </Box>

      {/* Info */}
      <Box sx={infoBoxSx}>
        <Typography sx={titleSx}>{manga.title}</Typography>
        <Typography sx={viewsSx}>{manga.viewsFormatted}</Typography>
      </Box>
    </Box>
  );
}

export default memo(MangaRankCard);
