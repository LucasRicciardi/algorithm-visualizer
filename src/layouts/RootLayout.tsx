import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

export default function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                color: 'primary.main', 
                textDecoration: 'none' 
            }}
          >
            Algorithm Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>

        <Box component="footer" sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
                Built with React, Vite & MUI
            </Typography>
        </Box>
    </Box>
  );
}
