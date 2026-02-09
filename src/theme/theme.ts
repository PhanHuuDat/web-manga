import { createTheme } from '@mui/material/styles';

// Deep Ocean Blue theme - mapped from _variables.scss
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0EA5E9', // accent-primary
      light: '#38BDF8', // accent-secondary
      dark: '#0284C7', // accent-tertiary
    },
    secondary: {
      main: '#38BDF8', // accent-secondary
    },
    background: {
      default: '#0F172A', // bg-primary
      paper: '#1E293B', // bg-secondary
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      disabled: '#64748B', // text-tertiary
    },
    divider: '#334155', // border-primary
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
    info: {
      main: '#3B82F6',
    },
    action: {
      hover: '#475569', // hover-bg
      selected: '#64748B', // active-bg
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontFamily: '"Righteous", sans-serif' },
    h2: { fontFamily: '"Righteous", sans-serif' },
    h3: { fontFamily: '"Righteous", sans-serif' },
    h4: { fontFamily: '"Righteous", sans-serif' },
    h5: { fontFamily: '"Righteous", sans-serif' },
    h6: { fontFamily: '"Righteous", sans-serif' },
  },
  shape: {
    borderRadius: 8, // 0.5rem default
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#475569 #1E293B',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1E293B',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#475569',
            borderRadius: '4px',
          },
        },
      },
    },
  },
});

export default theme;
