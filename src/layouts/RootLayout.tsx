import { AppBar, Box, Toolbar, Typography, Link, Stack, IconButton } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function RootLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {!isDashboard && (
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
      )}
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>

        <Box component="footer" sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Stack direction="column" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    Author: <strong>Lucas Ricciardi de Salles</strong>
                </Typography>
                <Stack direction="row" spacing={2}>
                    <IconButton component={Link} href="mailto:lucas.ricciardi@outlook.com" target="_blank" color="inherit" aria-label="email">
                        <EmailIcon />
                    </IconButton>
                    <IconButton component={Link} href="https://www.linkedin.com/in/lucas-ricciardi-de-salles-a59724149/" target="_blank" color="inherit" aria-label="linkedin">
                        <LinkedInIcon />
                    </IconButton>
                     <IconButton component={Link} href="https://github.com/LucasRicciardi" target="_blank" color="inherit" aria-label="github">
                        <GitHubIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    </Box>
  );
}
