import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import Badge from '../common/Badge';
import { formatNumber } from '../../utils/format-number';
import { getStatusLabel, getBadgeLabel } from '../../utils/enum-display-helpers';
import type { MangaDetailDto } from '../../types/manga-api-types';

interface MangaInfoProps {
  manga: MangaDetailDto;
  onReadClick: () => void;
  onBookmarkClick: () => void;
}

function MangaInfo({ manga, onReadClick, onBookmarkClick }: MangaInfoProps) {
  const { t } = useTranslation();
  const badge = getBadgeLabel(manga.badge);
  const statusLabel = getStatusLabel(manga.status);

  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Cover Image */}
      <Box
        sx={{
          width: { xs: '100%', sm: 250 },
          flexShrink: 0,
          aspectRatio: '3 / 4',
          borderRadius: 2,
          overflow: 'hidden',
          mx: { xs: 'auto', md: 0 },
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
      <Box sx={{ flex: 1 }}>
        {/* Title and badges */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {manga.title}
            </Typography>
            {badge && <Badge type={badge} size="medium" />}
          </Box>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {t('manga.by')} {manga.author.name}
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 18, color: 'warning.main' }} />
            <Typography sx={{ fontWeight: 600 }}>
              {manga.rating.toFixed(1)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography sx={{ fontWeight: 600 }}>
              {formatNumber(manga.views)}
            </Typography>
          </Box>
          <Badge type={statusLabel} size="medium" />
        </Box>

        {/* Genres */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {manga.genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              sx={{
                bgcolor: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                color: 'primary.main',
                fontWeight: 600,
              }}
            />
          ))}
        </Box>

        {/* Synopsis */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {t('manga.synopsis')}
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            {manga.synopsis}
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onReadClick}
            sx={{ flex: 1, maxWidth: 200, fontWeight: 600 }}
          >
            {t('manga.readNow')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={onBookmarkClick}
            sx={{ flex: 1, maxWidth: 200, fontWeight: 600 }}
          >
            {t('manga.bookmark')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MangaInfo;
