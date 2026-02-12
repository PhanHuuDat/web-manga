import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MangaRanked } from '../../types/manga-types';
import { customColors } from '../../theme/theme';

interface MangaRankCardProps {
  manga: MangaRanked;
}

function MangaRankCard({ manga }: MangaRankCardProps) {
  const isFirst = manga.rank === 1;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { bgcolor: customColors.cardBgHover },
      }}
    >
      {/* Rank Badge */}
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          bgcolor: isFirst ? 'primary.main' : 'action.selected',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: isFirst ? 'white' : 'text.secondary',
          }}
        >
          {String(manga.rank).padStart(2, '0')}
        </Typography>
      </Box>

      {/* Thumbnail */}
      <Box
        sx={{
          width: 48,
          height: 64,
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={manga.coverUrl}
          alt={manga.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {manga.title}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
          {manga.viewsFormatted}
        </Typography>
      </Box>
    </Box>
  );
}

export default MangaRankCard;
