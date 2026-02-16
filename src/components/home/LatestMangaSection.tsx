import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import SectionHeader from '../common/SectionHeader';
import MangaListCard from '../manga/MangaListCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMangaList, selectMangaList } from '../../store/slices/manga-slice';

function LatestMangaSection() {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const { data, loading, page, pageSize, totalCount } = useAppSelector(selectMangaList);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchMangaList({ page: 1, pageSize: 10 }));
    }
  }, [dispatch, data.length]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMangaList({ page: newPage, pageSize: 10 }));
  };

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

  // Build visible page numbers
  const visiblePages: number[] = [];
  for (let i = 1; i <= Math.min(3, totalPages); i++) visiblePages.push(i);

  return (
    <Box>
      <SectionHeader title={t('latest.title')} action={ViewAllButton} />

      {/* Manga List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {loading && data.length === 0
          ? [...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            ))
          : data.map((manga) => (
              <MangaListCard key={manga.id} manga={manga} />
            ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {visiblePages.map((p) => (
            <IconButton
              key={p}
              onClick={() => handlePageChange(p)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                bgcolor: page === p ? 'background.paper' : 'rgba(255,255,255,0.05)',
                color: page === p ? 'primary.main' : 'text.secondary',
                border: '1px solid',
                borderColor: page === p ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: 'background.paper',
                  borderColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {p}
            </IconButton>
          ))}
          {totalPages > 3 && (
            <>
              <Box sx={{ mx: 1, display: 'flex', alignItems: 'center', color: 'text.disabled' }}>
                ...
              </Box>
              <IconButton
                onClick={() => handlePageChange(totalPages)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  fontSize: 14,
                  fontWeight: 600,
                  bgcolor: page === totalPages ? 'background.paper' : 'rgba(255,255,255,0.05)',
                  color: page === totalPages ? 'primary.main' : 'text.secondary',
                }}
              >
                {totalPages}
              </IconButton>
            </>
          )}
          <IconButton
            onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
            disabled={page >= totalPages}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { opacity: 0.4 },
            }}
          >
            →
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default LatestMangaSection;
