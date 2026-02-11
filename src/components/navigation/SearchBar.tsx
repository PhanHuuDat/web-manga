import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import type { SearchBarProps } from '../../types/navigation-types';

function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const { t } = useTranslation('common');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        type="submit"
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
        placeholder={placeholder || t('nav.search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ 'aria-label': t('aria.searchManga') }}
        sx={{
          ml: 1,
          flex: 1,
          color: 'text.primary',
          '& ::placeholder': { color: 'text.secondary' },
        }}
      />
    </Box>
  );
}

export default SearchBar;
