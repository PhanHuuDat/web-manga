import { createTheme } from '@mui/material/styles';

// LuvManga Dark Theme - Reference design colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // neon-blue
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#a855f7', // neon-purple
      light: '#c084fc',
      dark: '#9333ea',
    },
    background: {
      default: '#0a0c14', // dark-navy
      paper: '#1a1e2e', // card-bg
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    divider: 'rgba(255, 255, 255, 0.05)',
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#22c55e',
    },
    info: {
      main: '#3b82f6',
    },
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(255, 255, 255, 0.1)',
    },
  },
  typography: {
    fontFamily: '"Spline Sans", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#1a1e2e #0a0c14',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0a0c14',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#1a1e2e',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Custom colors for easy access throughout the app
export const customColors = {
  darkNavy: '#0a0c14',
  deepCharcoal: '#121520',
  cardBg: '#1a1e2e',
  cardBgHover: '#242938',
  neonBlue: '#3b82f6',
  neonPurple: '#a855f7',
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export default theme;
