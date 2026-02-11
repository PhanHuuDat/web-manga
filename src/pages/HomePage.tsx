import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FeaturedSection from '../components/home/FeaturedSection';
import LatestMangaSection from '../components/home/LatestMangaSection';
import HomeSidebar from '../components/home/HomeSidebar';

function HomePage() {
  return (
    <>
      {/* Featured Section */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <FeaturedSection />
      </Container>

      {/* Main Content - Two Columns */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 6,
          }}
        >
          {/* Left Column - Latest Manga */}
          <Box sx={{ width: { xs: '100%', lg: '65%' } }}>
            <LatestMangaSection />
          </Box>

          {/* Right Column - Sidebar */}
          <Box sx={{ width: { xs: '100%', lg: '35%' } }}>
            <HomeSidebar />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
