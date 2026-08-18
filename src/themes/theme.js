import { createTheme } from '@mui/material/styles';

const sharedPalette = {
  terracotta: '#D08B7B',
  terracottaDark: '#B57364',
  terracottaLight: '#F0D9CF',
  backgroundWarm: '#FAF9F6',
  borderLight: '#E7E2DA',
  textPrimary: '#2D2A26',
  textSecondary: '#6B6560',
  textTertiary: '#9B9590',
  cardWhite: '#FFFFFF',
  heroGradientStart: '#FAF9F6',
  heroGradientEnd: '#F3EDE7',
  sectionAlt: '#F5F3F0',
  searchBorder: '#D5CFC8',
};

const baseThemeOptions = {
  typography: {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
    button: { fontFamily: '"Outfit", sans-serif', textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        body: { scrollBehavior: 'smooth' },
        'button': { cursor: 'pointer' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0, fontWeight: 500, padding: '10px 28px', fontSize: '0.875rem', letterSpacing: '0.01em' },
        contained: {
          background: '#D08B7B',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(208,139,123,0.3)',
          '&:hover': { background: '#B57364', boxShadow: '0 4px 14px rgba(208,139,123,0.4)' },
        },
        outlined: {
          borderColor: '#D08B7B',
          color: '#D08B7B',
          '&:hover': { borderColor: '#B57364', background: 'rgba(208,139,123,0.05)' },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 0, border: '1px solid #E7E2DA' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: '#D5CFC8' },
            '&:hover fieldset': { borderColor: '#B57364' },
            '&.Mui-focused fieldset': { borderColor: '#D08B7B' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontWeight: 500, fontSize: '0.75rem' },
      },
    },
    MuiDrawer: { styleOverrides: { paper: { borderRadius: 0 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 0 } } },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
          '& .MuiTabs-indicator': { display: 'none' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 40,
          borderRadius: 0,
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: sharedPalette.terracotta, light: sharedPalette.terracottaLight, dark: sharedPalette.terracottaDark },
    secondary: { main: '#8A6A5B', light: '#A68A7B', dark: '#6B5040' },
    background: { default: sharedPalette.backgroundWarm, paper: sharedPalette.cardWhite },
    text: { primary: sharedPalette.textPrimary, secondary: sharedPalette.textSecondary },
    divider: sharedPalette.borderLight,
    success: { main: '#4CAF50' },
    error: { main: '#E57373' },
    info: { main: '#64B5F6' },
    custom: sharedPalette,
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#D9A99B', light: '#F0D9CF', dark: '#D08B7B' },
    secondary: { main: '#B5A090', light: '#CDBFB5', dark: '#8A7565' },
    background: { default: '#1A1715', paper: '#2A2520' },
    text: { primary: '#F5F3F0', secondary: '#B5AFA8' },
    divider: 'rgba(208,139,123,0.15)',
    custom: {
      ...sharedPalette,
      backgroundWarm: '#1A1715',
      cardWhite: '#2A2520',
      heroGradientStart: '#1A1715',
      heroGradientEnd: '#221E1A',
      sectionAlt: '#221E1A',
      textPrimary: '#F5F3F0',
      textSecondary: '#B5AFA8',
      textTertiary: '#8A8580',
      borderLight: 'rgba(208,139,123,0.15)',
      searchBorder: 'rgba(208,139,123,0.2)',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCssBaseline: baseThemeOptions.components.MuiCssBaseline,
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0, fontWeight: 500, padding: '10px 28px', fontSize: '0.875rem', letterSpacing: '0.01em' },
        contained: {
          background: '#D9A99B',
          color: '#1A1715',
          boxShadow: '0 2px 8px rgba(217,169,155,0.25)',
          '&:hover': { background: '#D08B7B', boxShadow: '0 4px 14px rgba(217,169,155,0.35)' },
        },
        outlined: {
          borderColor: '#D9A99B',
          color: '#D9A99B',
          '&:hover': { borderColor: '#D08B7B', background: 'rgba(217,169,155,0.08)' },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 0, border: '1px solid rgba(208,139,123,0.15)' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: 'rgba(208,139,123,0.2)' },
            '&:hover fieldset': { borderColor: '#D9A99B' },
            '&.Mui-focused fieldset': { borderColor: '#D9A99B' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontWeight: 500, fontSize: '0.75rem' },
      },
    },
    MuiDrawer: { styleOverrides: { paper: { borderRadius: 0 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 0 } } },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
          '& .MuiTabs-indicator': { display: 'none' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 40,
          borderRadius: 0,
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
  },
});
