import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { genreApi } from '../../services/api/genre-api-service';
import type { GenreWithCountDto } from '../../types/genre-api-types';

interface GenreSelectorProps {
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

function GenreSelector({ value, onChange, disabled = false }: GenreSelectorProps) {
  const [genres, setGenres] = useState<GenreWithCountDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    genreApi
      .list()
      .then(setGenres)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const selectedGenres = genres.filter((g) => value.includes(g.id));

  return (
    <Autocomplete
      multiple
      options={genres}
      value={selectedGenres}
      loading={loading}
      disabled={disabled}
      getOptionLabel={(opt) => opt.name}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      onChange={(_, newVal) => onChange(newVal.map((g) => g.id))}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...rest } = getTagProps({ index });
          return (
            <Chip key={key} label={option.name} size="small" {...rest} />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Genres" placeholder="Select genres" size="small" />
      )}
    />
  );
}

export default GenreSelector;
