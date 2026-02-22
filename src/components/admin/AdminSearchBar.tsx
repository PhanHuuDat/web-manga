import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';
import { useDebounce } from '../../hooks/use-debounce';

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function AdminSearchBar({ value, onChange, placeholder = 'Search...' }: AdminSearchBarProps) {
  const [input, setInput] = useState(value);
  const debouncedInput = useDebounce(input, 300);

  // Fire onChange after debounce settles
  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  // Sync when external value is reset (e.g. clear filter)
  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <TextField
      size="small"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: '#94a3b8' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        minWidth: 250,
        '& .MuiOutlinedInput-root': {
          color: '#f1f5f9',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
          '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
        },
      }}
    />
  );
}

export default AdminSearchBar;
