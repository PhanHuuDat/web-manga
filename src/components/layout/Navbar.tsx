import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchBar from '../navigation/SearchBar';
import GenreDropdown from '../navigation/GenreDropdown';
import UserMenu from '../navigation/UserMenu';
import { GENRES } from '../../constants/genres';

function Navbar() {
  const handleSearch = (query: string) => {
    // TODO: Implement search navigation
    console.log('Searching for:', query);
  };

  const handleGenreSelect = (genreId: string) => {
    // TODO: Navigate to genre page
    console.log('Selected genre:', genreId);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Righteous", sans-serif',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { color: 'primary.light' },
            }}
          >
            MangaVerse
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchBar onSearch={handleSearch} placeholder="Search manga..." />
            <GenreDropdown genres={GENRES} onGenreSelect={handleGenreSelect} />
            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
