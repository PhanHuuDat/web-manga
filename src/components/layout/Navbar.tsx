import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SearchBar from '../navigation/SearchBar';
import LanguageSwitcher from '../common/LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation('common');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'rgba(10, 12, 20, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 80, gap: 4 }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(59,130,246,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 18 }}>
                M
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                color: 'white',
                textShadow: '0 0 10px rgba(59,130,246,0.5)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              MANGAVOID
            </Typography>
          </Box>

          {/* SearchBar - hidden on mobile */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, maxWidth: 500 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Nav Links - hidden on mobile */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
            <Button
              color="inherit"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { color: 'white' },
              }}
            >
              {t('navbar.browse')}
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { color: 'white' },
              }}
            >
              {t('navbar.popular')}
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { color: 'white' },
              }}
            >
              {t('navbar.schedule')}
            </Button>
          </Box>

          {/* Language + Login */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSwitcher />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                fontWeight: 700,
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.3)',
                },
              }}
            >
              {t('navbar.login')}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
