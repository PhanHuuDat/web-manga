import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SectionHeader from '../common/SectionHeader';
import MangaFeaturedCard from '../manga/MangaFeaturedCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrendingManga, selectTrendingManga } from '../../store/slices/manga-slice';

function FeaturedSection() {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(selectTrendingManga);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchTrendingManga({ days: 7 }));
    }
  }, [dispatch, data.length]);

  return (
    <Box>
      <SectionHeader title={t('featured.title')} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: 3,
        }}
      >
        {loading && data.length === 0
          ? [...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                sx={{ aspectRatio: '3 / 4.5', borderRadius: 3 }}
              />
            ))
          : data.slice(0, 6).map((manga) => (
              <MangaFeaturedCard key={manga.id} manga={manga} />
            ))}
      </Box>
    </Box>
  );
}

export default FeaturedSection;
