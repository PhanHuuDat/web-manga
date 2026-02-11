import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GenreDropdownProps } from '../../types/navigation-types';

function GenreDropdown({ genres, onGenreSelect }: GenreDropdownProps) {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleGenreClick = (genreId: string) => {
    onGenreSelect(genreId);
    setAnchorEl(null);
  };

  return (
    <Box
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
    >
      <Button
        onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
        aria-expanded={open}
        aria-haspopup="true"
        endIcon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        sx={{
          color: 'text.primary',
          textTransform: 'none',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {t('nav.genres')}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            onMouseLeave: () => setAnchorEl(null),
          },
          paper: {
            sx: {
              bgcolor: 'background.paper',
              mt: 1,
              minWidth: 400,
              maxWidth: 600,
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0.5,
            p: 1,
          }}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              sx={{
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                {t(`genres.${genre.id}.name`, { defaultValue: genre.name })}
              </Typography>
              {genre.description && (
                <Typography variant="caption" color="text.secondary">
                  {t(`genres.${genre.id}.description`, { defaultValue: genre.description })}
                </Typography>
              )}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
}

export default GenreDropdown;
