import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import MangaRankCard from '../manga/MangaRankCard';
import { useAppSelector } from '../../store/hooks';
import { selectTrendingManga } from '../../store/slices/manga-slice';
import type { MangaDto } from '../../types/manga-api-types';
import { formatNumber } from '../../utils/format-number';

type ViewPeriod = 'daily' | 'weekly' | 'monthly';

/** Adapts MangaDto to the shape MangaRankCard expects (rank + viewsFormatted). */
function toRanked(manga: MangaDto, index: number) {
  return { ...manga, rank: index + 1, viewsFormatted: `${formatNumber(manga.views)} views` };
}

function TopViewsSection() {
  const { t } = useTranslation('home');
  const [activeTab, setActiveTab] = useState<ViewPeriod>('daily');
  const { data, loading } = useAppSelector(selectTrendingManga);

  // Use trending data for all tabs (backend doesn't support period filtering yet)
  const rankedData = data.slice(0, 3).map(toRanked);

  const tabs: ViewPeriod[] = ['daily', 'weekly', 'monthly'];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 6,
            height: 24,
            bgcolor: 'secondary.main',
            borderRadius: 1,
          }}
        />
        <Typography
          sx={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}
        >
          {t('topViews.title')}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {tabs.map((key) => (
          <Button
            key={key}
            onClick={() => setActiveTab(key)}
            sx={{
              flex: 1,
              py: 0.75,
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 1,
              minWidth: 0,
              bgcolor: activeTab === key ? 'primary.main' : 'transparent',
              color: activeTab === key ? 'white' : 'text.secondary',
              '&:hover': {
                color: 'white',
                bgcolor:
                  activeTab === key ? 'primary.main' : 'rgba(255,255,255,0.05)',
              },
            }}
          >
            {t(`topViews.${key}`)}
          </Button>
        ))}
      </Box>

      {/* List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {loading && rankedData.length === 0
          ? [...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
            ))
          : rankedData.map((manga) => (
              <MangaRankCard key={manga.id} manga={manga} />
            ))}
      </Box>
    </Box>
  );
}

export default TopViewsSection;
