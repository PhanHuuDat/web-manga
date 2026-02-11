import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MangaRankCard from '../manga/MangaRankCard';
import { TOP_MANGA_DAILY, TOP_MANGA_WEEKLY, TOP_MANGA_MONTHLY } from '../../constants/mock-manga-data';
import type { ViewPeriod } from '../../types/manga-types';

const tabData: { key: ViewPeriod; data: typeof TOP_MANGA_DAILY }[] = [
  { key: 'daily', data: TOP_MANGA_DAILY },
  { key: 'weekly', data: TOP_MANGA_WEEKLY },
  { key: 'monthly', data: TOP_MANGA_MONTHLY },
];

function TopViewsSection() {
  const { t } = useTranslation('home');
  const [activeTab, setActiveTab] = useState<ViewPeriod>('daily');

  const currentData = tabData.find((tab) => tab.key === activeTab)?.data || TOP_MANGA_DAILY;

  return (
    <Box
      sx={{
        bgcolor: 'rgba(26, 30, 46, 0.5)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.05)',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ width: 6, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }} />
        <Typography sx={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>
          {t('topViews.title')}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {tabData.map(({ key }) => (
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
              '&:hover': { color: 'white', bgcolor: activeTab === key ? 'primary.main' : 'rgba(255,255,255,0.05)' },
            }}
          >
            {t(`topViews.${key}`)}
          </Button>
        ))}
      </Box>

      {/* List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {currentData.map((manga) => (
          <MangaRankCard key={manga.id} manga={manga} />
        ))}
      </Box>
    </Box>
  );
}

export default TopViewsSection;
