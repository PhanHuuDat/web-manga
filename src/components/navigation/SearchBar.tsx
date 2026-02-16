import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchManga, clearSearch, selectMangaSearch } from '../../store/slices/manga-slice';
import { useDebounce } from '../../hooks/use-debounce';
import type { SearchBarProps } from '../../types/navigation-types';

function SearchBar({ placeholder }: SearchBarProps) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: results, loading } = useAppSelector(selectMangaSearch);
  const [query, setQuery] = useState('');
  const [dismissed, setDismissed] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      dispatch(searchManga({ query: debouncedQuery, pageSize: 5 }));
    } else {
      dispatch(clearSearch());
    }
  }, [debouncedQuery, dispatch]);

  // Show results when query is long enough and not manually dismissed
  const showResults = debouncedQuery.length >= 2 && !dismissed;

  const handleClose = () => {
    setDismissed(true);
  };

  const handleSelect = (mangaId: string) => {
    setQuery('');
    setDismissed(true);
    dispatch(clearSearch());
    navigate(`/manga/${mangaId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('');
      setDismissed(true);
      dispatch(clearSearch());
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      setDismissed(true);
      dispatch(clearSearch());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      inputRef.current?.blur();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            px: 2,
            py: 1,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:focus-within': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <IconButton
            size="small"
            sx={{ color: 'text.secondary' }}
            aria-label={t('aria.search')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>

          <InputBase
            inputRef={inputRef}
            placeholder={placeholder || t('nav.search')}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setDismissed(false); }}
            onFocus={() => { if (results.length > 0) setDismissed(false); }}
            onKeyDown={handleKeyDown}
            inputProps={{ 'aria-label': t('aria.searchManga') }}
            sx={{
              ml: 1,
              flex: 1,
              color: 'text.primary',
              '& ::placeholder': { color: 'text.secondary' },
            }}
          />

          {loading && <CircularProgress size={16} sx={{ ml: 1 }} />}
        </Box>

        {/* Search Results Dropdown */}
        {showResults && results.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 1,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
              zIndex: 1300,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {results.map((manga) => (
              <Box
                key={manga.id}
                onClick={() => handleSelect(manga.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Box
                  component="img"
                  src={manga.coverUrl ?? '/placeholder-cover.png'}
                  alt={manga.title}
                  sx={{ width: 36, height: 48, objectFit: 'cover', borderRadius: 1 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {manga.title}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                    {manga.authorName}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}

export default SearchBar;
