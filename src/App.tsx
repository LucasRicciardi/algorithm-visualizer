import { ThemeProvider, CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import VisualizerPage from './pages/VisualizerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'algorithm/:type', element: <VisualizerPage /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
