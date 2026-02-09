import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="section"
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 6 },
          mb: 6,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontFamily: '"Righteous", sans-serif',
            color: 'primary.main',
            mb: 2,
          }}
        >
          Discover Your Next Manga
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Explore thousands of manga series from popular genres
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontFamily: '"Righteous", sans-serif' }}
        >
          Featured Manga
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            Manga cards will be displayed here
          </Typography>
        </Paper>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontFamily: '"Righteous", sans-serif' }}
        >
          Popular Genres
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            Genre categories will be displayed here
          </Typography>
        </Paper>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontFamily: '"Righteous", sans-serif' }}
        >
          Latest Updates
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            Recently updated manga will be displayed here
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;
