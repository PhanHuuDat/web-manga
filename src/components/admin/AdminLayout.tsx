import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminSidebar, { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

// Re-export for consumers in other phases
export { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH };

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem('adminSidebarOpen') !== 'false';
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      localStorage.setItem('adminSidebarOpen', String(!prev));
      return !prev;
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0c14' }}>
      <AdminSidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: {
            md: sidebarOpen ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          },
          transition: 'margin-left 0.2s ease',
        }}
      >
        <AdminTopBar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
