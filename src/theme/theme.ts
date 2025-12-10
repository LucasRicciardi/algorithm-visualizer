import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5FF', // Neon Cyan
      light: '#5FFFFF',
      dark: '#00B2CC',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00E676', // Neon Green
      light: '#66FFA6',
      dark: '#00B248',
      contrastText: '#000000',
    },
    background: {
      default: '#0A1929', // Deep dark blue
      paper: 'rgba(10, 25, 41, 0.7)', // Semi-transparent for glassmorphism
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(0, 229, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600, letterSpacing: '0.02em' },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#00E5FF #0A1929",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 8,
            height: 8,
            backgroundColor: "rgba(0, 229, 255, 0.1)",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#00E5FF",
            minHeight: 24,
            border: "2px solid #0A1929",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          '&.MuiPaper-elevation0': {
             border: '1px solid rgba(0, 229, 255, 0.1)',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
           background: 'linear-gradient(45deg, #00E5FF 30%, #00B2CC 90%)',
           color: '#000000',
        },
        outlined: {
            borderWidth: 2,
            '&:hover': {
                borderWidth: 2,
            }
        }
      },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(0, 229, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(0, 229, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#00E5FF',
                        boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
                    },
                },
            }
        }
    },
    MuiSlider: {
        styleOverrides: {
            root: {
                color: '#00E5FF',
                height: 8,
            },
            thumb: {
                height: 24,
                width: 24,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
                },
            },
            track: {
                height: 8,
                borderRadius: 4,
                 background: 'linear-gradient(90deg, #00E5FF, #00E676)',
                 border: 'none' // Remove default border
            },
            rail: {
                height: 8,
                borderRadius: 4,
                opacity: 0.3,
            }
        }
    }
  },
});

export default theme;
