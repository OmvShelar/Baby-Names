import { createTheme } from '@mui/material/styles';

// Modern color palette
export const colors = {
  // Primary colors
  primary: {
    main: '#6366f1', // Indigo
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#ec4899', // Pink
    light: '#f472b6',
    dark: '#db2777',
    contrastText: '#ffffff',
  },
  // Category colors
  boy: {
    main: '#3b82f6', // Blue
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  girl: {
    main: '#ec4899', // Pink
    light: '#f472b6',
    dark: '#db2777',
  },
  indian: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
  },
  modern: {
    main: '#8b5cf6', // Violet
    light: '#a78bfa',
    dark: '#7c3aed',
  },
  zodiac: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
  },
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Semantic colors
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
};

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: mode === 'dark' ? colors.neutral[900] : colors.neutral[50],
      paper: mode === 'dark' ? colors.neutral[800] : '#ffffff',
      card: mode === 'dark' ? colors.neutral[800] : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? colors.neutral[50] : colors.neutral[900],
      secondary: mode === 'dark' ? colors.neutral[300] : colors.neutral[600],
    },
    divider: mode === 'dark' ? colors.neutral[700] : colors.neutral[200],
    ...colors,
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#6b7280 #374151' : '#9ca3af #f3f4f6',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: mode === 'dark' ? colors.neutral[800] : colors.neutral[100],
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? colors.neutral[600] : colors.neutral[400],
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: mode === 'dark' ? colors.neutral[500] : colors.neutral[500],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${mode === 'dark' ? colors.neutral[700] : colors.neutral[200]}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark'
              ? '0 8px 30px rgba(0,0,0,0.4)'
              : '0 8px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? colors.neutral[900] : '#ffffff',
          color: mode === 'dark' ? colors.neutral[50] : colors.neutral[900],
          boxShadow: mode === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: `1px solid ${mode === 'dark' ? colors.neutral[700] : colors.neutral[200]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? colors.neutral[800] : '#ffffff',
          borderRight: `1px solid ${mode === 'dark' ? colors.neutral[700] : colors.neutral[200]}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: mode === 'dark' ? colors.neutral[800] : colors.neutral[50],
            '& fieldset': {
              borderColor: mode === 'dark' ? colors.neutral[600] : colors.neutral[300],
            },
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
