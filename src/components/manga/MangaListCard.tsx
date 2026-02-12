import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type { Manga } from '../../types/manga-types';
import { formatRelativeTime } from '../../utils/format-relative-time';
import { formatNumber } from '../../utils/format-number';
import { customColors } from '../../theme/theme';

interface MangaListCardProps {
  manga: Manga;
}

function MangaListCard({ manga }: MangaListCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
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
          src={manga.coverUrl}
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
          {manga.author}
        </Typography>

        {/* Genre Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {manga.genres.slice(0, 3).map((genre) => (
            <Chip
              key={genre}
              label={genre}
              size="small"
              sx={{
                fontSize: 10,
                textTransform: 'uppercase',
                fontWeight: 700,
                height: 20,
                bgcolor: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                color: 'primary.main',
              }}
            />
          ))}
        </Box>

        {/* Meta */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            ⏰ {formatRelativeTime(manga.updatedAt)}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            👁 {formatNumber(manga.views)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MangaListCard;
