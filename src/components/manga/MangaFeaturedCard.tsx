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

function MangaFeaturedCard({ manga }: MangaFeaturedCardProps) {
  const { t } = useTranslation('common');
  const badge = getBadgeLabel(manga.badge);

  return (
    <Box
      component={Link}
      to={`/manga/${manga.id}`}
      sx={{
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
      }}
    >
      {/* Cover Image */}
      <Box
        component="img"
        src={manga.coverUrl ?? '/placeholder-cover.png'}
        alt={manga.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Badge */}
      {badge && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: badgeColors[badge],
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            backdropFilter: 'blur(4px)',
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'white',
            }}
          >
            {badge}
          </Typography>
        </Box>
      )}

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0c14 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: 'white',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {manga.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: 'text.secondary',
          }}
        >
          {t('chapter_other', { count: manga.totalChapters })}
        </Typography>
      </Box>
    </Box>
  );
}

export default MangaFeaturedCard;
