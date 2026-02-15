import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from '../auth/AuthModal';

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <AuthModal />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
