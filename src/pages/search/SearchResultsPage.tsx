import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Typography, Chip, Select, MenuItem, Skeleton, Pagination,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMangaList, selectMangaList } from '../../store/slices/manga-slice';
import { fetchGenres, selectGenres } from '../../store/slices/genre-slice';
import MangaListCard from '../../components/manga/MangaListCard';
import { SeriesStatus, MangaSortBy } from '../../types/manga-api-types';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: String(SeriesStatus.Ongoing), label: 'Ongoing' },
  { value: String(SeriesStatus.Completed), label: 'Completed' },
  { value: String(SeriesStatus.Hiatus), label: 'Hiatus' },
] as const;

const SORT_OPTIONS = [
  { value: String(MangaSortBy.Latest), label: 'Latest' },
  { value: String(MangaSortBy.Rating), label: 'Rating' },
  { value: String(MangaSortBy.Views), label: 'Views' },
  { value: String(MangaSortBy.Title), label: 'Title' },
] as const;

export default function SearchResultsPage() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: genres, loaded: genresLoaded } = useAppSelector(selectGenres);
  const { data: results, loading, totalCount, pageSize } = useAppSelector(selectMangaList);

  // Read filters from URL
  const q = searchParams.get('q') || '';
  const genreId = searchParams.get('genre') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sort') || String(MangaSortBy.Latest);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!genresLoaded) dispatch(fetchGenres());
  }, [dispatch, genresLoaded]);

  useEffect(() => {
    dispatch(fetchMangaList({
      search: q || undefined,
      genreId: genreId || undefined,
      status: status ? (Number(status) as typeof SeriesStatus[keyof typeof SeriesStatus]) : undefined,
      sortBy: Number(sortBy) as typeof MangaSortBy[keyof typeof MangaSortBy],
      page: currentPage,
      pageSize: 20,
    }));
  }, [dispatch, q, genreId, status, sortBy, currentPage]);

  const totalPages = useMemo(() => Math.ceil(totalCount / (pageSize || 20)), [totalCount, pageSize]);

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete('page'); // Reset page on filter change
      return next;
    });
  };

  const handlePageChange = (_: unknown, page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page > 1) next.set('page', String(page));
      else next.delete('page');
      return next;
    });
  };

  const selectSx = {
    height: 36, bgcolor: '#1a1e2e', borderRadius: 2,
    fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f1f5f9', mb: 3 }}
      >
        {q ? `Search: "${q}"` : t('nav.search', 'Browse Manga')}
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Genre */}
        <Select
          value={genreId}
          onChange={(e: SelectChangeEvent) => updateParam('genre', e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 140, ...selectSx }}
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
          ))}
        </Select>

        {/* Status chips */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {STATUS_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              clickable
              onClick={() => updateParam('status', opt.value)}
              sx={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                bgcolor: status === opt.value ? '#3b82f6' : '#1a1e2e',
                color: status === opt.value ? '#fff' : '#94a3b8',
                '&:hover': { bgcolor: status === opt.value ? '#2563eb' : '#242938' },
              }}
            />
          ))}
        </Box>

        {/* Sort */}
        <Select
          value={sortBy}
          onChange={(e: SelectChangeEvent) => updateParam('sort', e.target.value)}
          size="small"
          sx={{ minWidth: 120, ...selectSx }}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>

        {/* Result count */}
        <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#64748b', ml: 'auto' }}>
          {totalCount} results
        </Typography>
      </Box>

      {/* Results Grid */}
      {loading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={280} sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3 }} />
          ))}
        </Box>
      ) : results.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#64748b' }}>
            No manga found. Try adjusting your filters.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {results.map((manga) => (
            <MangaListCard key={manga.id} manga={manga} />
          ))}
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#94a3b8',
                fontFamily: 'JetBrains Mono, monospace',
                '&.Mui-selected': { bgcolor: '#3b82f6', color: '#fff' },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
