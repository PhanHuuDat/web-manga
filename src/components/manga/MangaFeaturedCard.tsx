import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MangaDto } from '../../types/manga-api-types';
import { getBadgeLabel } from '../../utils/enum-display-helpers';

interface MangaFeaturedCardProps {
  manga: MangaDto;
}

const badgeColors: Record<string, string> = {
  hot: 'rgba(168, 85, 247, 0.9)',
  top: 'rgba(37, 99, 235, 0.9)',
  new: 'rgba(34, 197, 94, 0.9)',
};

// Static sx objects hoisted to module level to prevent recreation on each render
const cardSx = {
  position: 'relative',
  aspectRatio: '3 / 4.5',
  borderRadius: 3,
  overflow: 'hidden',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 20px rgba(59,130,246,0.2)',
    outline: '2px solid rgba(59,130,246,0.5)',
  },
} as const;

const coverImgSx = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as const;

const badgeContainerSx = {
  position: 'absolute',
  top: 12,
  left: 12,
  px: 1.5,
  py: 0.5,
  borderRadius: 1,
  backdropFilter: 'blur(4px)',
} as const;

const badgeTextSx = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: 'white',
} as const;

const gradientOverlaySx = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, #0a0c14 0%, transparent 60%)',
} as const;

const contentBoxSx = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  p: 2,
} as const;

const titleSx = {
  fontWeight: 600,
  fontSize: 14,
  color: 'white',
  mb: 0.5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const;

const chapterCountSx = {
  fontSize: 12,
  color: 'text.secondary',
} as const;

function MangaFeaturedCard({ manga }: MangaFeaturedCardProps) {
  const { t } = useTranslation('common');
  const badge = getBadgeLabel(manga.badge);

  return (
    <Box component={Link} to={`/manga/${manga.id}`} sx={cardSx}>
      {/* Cover Image */}
      <Box
        component="img"
        src={manga.coverUrl ?? '/placeholder-cover.png'}
        alt={manga.title}
        loading="lazy"
        sx={coverImgSx}
      />

      {/* Badge */}
      {badge && (
        <Box sx={{ ...badgeContainerSx, bgcolor: badgeColors[badge] }}>
          <Typography sx={badgeTextSx}>{badge}</Typography>
        </Box>
      )}

      {/* Gradient Overlay */}
      <Box sx={gradientOverlaySx} />

      {/* Content */}
      <Box sx={contentBoxSx}>
        <Typography sx={titleSx}>{manga.title}</Typography>
        <Typography sx={chapterCountSx}>
          {t('chapter_other', { count: manga.totalChapters })}
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(MangaFeaturedCard);
