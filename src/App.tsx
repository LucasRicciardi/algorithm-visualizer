import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import AppContent from './AppContent'; // We'll move the current content or create a layout

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
