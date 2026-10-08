import { createTheme } from '@mui/material/styles';

const sharedPalette = {
  // Brand luxury accents
  coral: '#C86D51', // Warm Terracotta Rose
  coralDark: '#A85238',
  coralLight: '#FCEFEA',
  rose: '#BE123C', // Deep Imperial Rose
  gold: '#C59B27', // Champagne Gold
  goldLight: '#FEF9E7',
  goldDark: '#9A7611',
  
  // Boy theme colors (Noble Sapphire & Platinum)
  boyBlue: '#0369A1',
  boyBlueLight: '#E0F2FE',
  boyBlueDark: '#0C4A6E',
  boyGradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',

  // Girl theme colors (Empress Ruby & Rose Gold)
  girlPink: '#BE123C',
  girlPinkLight: '#FFE4E6',
  girlPinkDark: '#881337',
  girlGradient: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',

  // Neutrals - Warm Editorial Ivory & Parchment
  softCream: '#FAF8F5',
  cardWhite: '#FFFFFF',
  borderLight: '#E8E1D5',
  borderSubtle: '#F2ECE1',
  textPrimary: '#1C1917',
  textSecondary: '#57534E',
  textTertiary: '#8D857E',

  // Hero Gradients
  heroGradientStart: '#FCFAF7',
  heroGradientEnd: '#F5EFE6',
  sectionAlt: '#F7F3EB',
  searchBorder: '#DFD7CA',
};

const baseThemeOptions = {
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.025em' },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.015em' },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    overline: { fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '0.16em', fontWeight: 700 },
    button: { fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },
  // Sharp architectural geometry
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        body: { scrollBehavior: 'smooth' },
        button: { cursor: 'pointer' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          fontWeight: 600,
          padding: '10px 24px',
          fontSize: '0.86rem',
          letterSpacing: '0.03em',
          transition: 'all 0.22s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #C86D51 0%, #A85238 100%)',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(168, 82, 56, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #A85238 0%, #8C3E28 100%)',
            boxShadow: '0 4px 14px rgba(168, 82, 56, 0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: '#C86D51',
          color: '#C86D51',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#A85238',
            background: 'rgba(200, 109, 81, 0.05)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          border: '1px solid #E8E1D5',
          transition: 'all 0.22s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': { borderColor: '#DFD7CA', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: '#C86D51' },
            '&.Mui-focused fieldset': { borderColor: '#C86D51', borderWidth: '1.5px' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '0.74rem',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: 0 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 2 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 42,
          '& .MuiTabs-indicator': {
            height: 2,
            borderRadius: 0,
            background: '#C86D51',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 42,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '0.86rem',
          padding: '8px 18px',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: sharedPalette.coral,
      light: sharedPalette.coralLight,
      dark: sharedPalette.coralDark,
    },
    secondary: {
      main: sharedPalette.gold,
      light: sharedPalette.goldLight,
      dark: sharedPalette.goldDark,
    },
    background: {
      default: sharedPalette.softCream,
      paper: sharedPalette.cardWhite,
    },
    text: {
      primary: sharedPalette.textPrimary,
      secondary: sharedPalette.textSecondary,
    },
    divider: sharedPalette.borderLight,
    success: { main: '#059669' },
    error: { main: '#DC2626' },
    info: { main: '#0284C7' },
    warning: { main: '#D97706' },
    custom: sharedPalette,
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#DF8A71',
      light: '#FCEFEA',
      dark: '#C86D51',
    },
    secondary: {
      main: '#E5C158',
      light: '#FEF9E7',
      dark: '#C59B27',
    },
    background: {
      default: '#0B0E14',
      paper: '#141822',
    },
    text: {
      primary: '#F5F5F4',
      secondary: '#A8A29E',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    info: { main: '#38BDF8' },
    warning: { main: '#F59E0B' },
    custom: {
      ...sharedPalette,
      softCream: '#0B0E14',
      backgroundWarm: '#0B0E14',
      cardWhite: '#141822',
      heroGradientStart: '#0B0E14',
      heroGradientEnd: '#11151F',
      sectionAlt: '#0F1219',
      textPrimary: '#F5F5F4',
      textSecondary: '#A8A29E',
      textTertiary: '#78716C',
      borderLight: 'rgba(255, 255, 255, 0.08)',
      borderSubtle: 'rgba(255, 255, 255, 0.05)',
      searchBorder: 'rgba(255, 255, 255, 0.12)',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#141822',
          transition: 'all 0.22s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#141822',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.12)' },
            '&:hover fieldset': { borderColor: '#DF8A71' },
            '&.Mui-focused fieldset': { borderColor: '#DF8A71' },
          },
        },
      },
    },
  },
});
