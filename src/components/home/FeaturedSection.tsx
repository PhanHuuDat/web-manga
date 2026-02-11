import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import SectionHeader from '../common/SectionHeader';
import MangaFeaturedCard from '../manga/MangaFeaturedCard';
import { FEATURED_MANGA } from '../../constants/mock-manga-data';

function FeaturedSection() {
  const { t } = useTranslation('home');

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
        {FEATURED_MANGA.map((manga) => (
          <MangaFeaturedCard key={manga.id} manga={manga} />
        ))}
      </Box>
    </Box>
  );
}

export default FeaturedSection;
