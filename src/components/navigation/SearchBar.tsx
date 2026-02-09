import { useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import type { SearchBarProps } from '../../types/navigation-types';

function SearchBar({
  onSearch,
  placeholder = 'Search manga...',
}: SearchBarProps) {
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
        bgcolor: 'background.default',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
        border: 1,
        borderColor: 'divider',
        '&:focus-within': {
          borderColor: 'primary.main',
        },
      }}
    >
      <IconButton type="submit" size="small" sx={{ color: 'text.secondary' }} aria-label="Search">
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
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ 'aria-label': 'Search manga' }}
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
