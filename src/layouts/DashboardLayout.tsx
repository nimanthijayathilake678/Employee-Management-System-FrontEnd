import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // <-- import useLocation
import {
  Box,
  Drawer,
  AppBar,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const DRAWER_WIDTH = 240;

const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation(); // <-- get current location

  // Check if current route is dashboard root
  const isDashboardPage = location.pathname === '/dashboard';

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: !isDashboardPage && open
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : '100%',
          },
          ml: {
            md: !isDashboardPage && open
              ? `${DRAWER_WIDTH}px`
              : 0,
          },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* <Header onMenuClick={handleDrawerToggle} /> */}
      </AppBar>

      {!isDashboardPage && (
        <Drawer
          variant={isMobile ? 'temporary' : 'persistent'}
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {/* <Sidebar onClose={isMobile ? handleDrawerToggle : undefined} /> */}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: !isDashboardPage && open
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : '100%',
          },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;