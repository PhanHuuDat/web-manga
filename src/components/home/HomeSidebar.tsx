import Box from '@mui/material/Box';
import TopViewsSection from './TopViewsSection';
import TopCommentsSection from './TopCommentsSection';
import ActiveUsersSection from './ActiveUsersSection';

function HomeSidebar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TopViewsSection />
      <TopCommentsSection />
      <ActiveUsersSection />
    </Box>
  );
}

export default HomeSidebar;
