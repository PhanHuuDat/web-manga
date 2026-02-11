import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
] as const;

function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label={t('aria.changeLanguage')}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: 'text.secondary',
          '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
        }}
      >
        <Typography component="span" sx={{ fontSize: '1.25rem' }}>
          {currentLang.flag}
        </Typography>
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'language-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === i18n.language}
            sx={{ gap: 1 }}
          >
            <Box component="span" sx={{ fontSize: '1.25rem' }}>
              {lang.flag}
            </Box>
            <Typography>{lang.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSwitcher;
