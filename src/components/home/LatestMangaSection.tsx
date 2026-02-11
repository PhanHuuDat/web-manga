import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SectionHeader from '../common/SectionHeader';
import MangaListCard from '../manga/MangaListCard';
import { LATEST_MANGA } from '../../constants/mock-manga-data';

function LatestMangaSection() {
  const { t } = useTranslation('home');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const ViewAllButton = (
    <Button
      sx={{
        color: 'primary.main',
        fontSize: 12,
        fontWeight: 600,
        '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' },
      }}
    >
      {t('latest.viewAll')} →
    </Button>
  );

  return (
    <Box>
      <SectionHeader title={t('latest.title')} action={ViewAllButton} />

      {/* Manga List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {LATEST_MANGA.map((manga) => (
          <MangaListCard key={manga.id} manga={manga} />
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {[1, 2, 3].map((page) => (
          <IconButton
            key={page}
            onClick={() => setCurrentPage(page)}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 600,
              bgcolor: currentPage === page ? 'background.paper' : 'rgba(255,255,255,0.05)',
              color: currentPage === page ? 'primary.main' : 'text.secondary',
              border: '1px solid',
              borderColor: currentPage === page ? 'primary.main' : 'transparent',
              '&:hover': {
                bgcolor: 'background.paper',
                borderColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ mx: 1, display: 'flex', alignItems: 'center', color: 'text.disabled' }}>
          ...
        </Box>
        <IconButton
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            fontSize: 14,
            fontWeight: 600,
            bgcolor: 'rgba(255,255,255,0.05)',
            color: 'text.secondary',
          }}
        >
          {totalPages}
        </IconButton>
        <IconButton
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          →
        </IconButton>
      </Box>
    </Box>
  );
}

export default LatestMangaSection;
