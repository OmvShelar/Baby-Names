import { createTheme } from '@mui/material/styles';

const sharedPalette = {
  // Brand luxury accents - Atelier Terracotta & Imperial Gold
  coral: '#B65A3F', // Warm Atelier Terracotta
  coralDark: '#8E3E28',
  coralLight: '#FBF1ED',
  rose: '#9F2241', // Imperial Velvet Ruby
  gold: '#C59B27', // Champagne Gold
  goldLight: '#FBF5E2',
  goldDark: '#8F6E13',
  goldGradient: 'linear-gradient(135deg, #DFB956 0%, #C59B27 50%, #9E7A16 100%)',
  goldGlow: '0 4px 18px rgba(197, 155, 39, 0.28)',

  // Boy theme colors - Noble French Sapphire & Celestial Platinum
  boyBlue: '#0F4C81',
  boyBlueLight: '#EEF6FC',
  boyBlueDark: '#0A3156',
  boyGradient: 'linear-gradient(135deg, #1A5A96 0%, #0F4C81 100%)',

  // Girl theme colors - Empress Ruby & Dusty Rose Gold
  girlPink: '#9F2241',
  girlPinkLight: '#FDF1F4',
  girlPinkDark: '#78152D',
  girlGradient: 'linear-gradient(135deg, #B72B4E 0%, #9F2241 100%)',

  // Neutrals - Warm Editorial Alabaster, Cashmere & Linen
  softCream: '#FAF8F4',
  cardWhite: '#FFFFFF',
  borderLight: '#E8E1D5',
  borderSubtle: '#F2EDE4',
  borderGold: 'rgba(197, 155, 39, 0.35)',
  textPrimary: '#1A1615',
  textSecondary: '#5C544E',
  textTertiary: '#8E857C',

  // Hero Gradients & atmospheric glows
  heroGradientStart: '#FCFBF8',
  heroGradientEnd: '#F4ECE0',
  sectionAlt: '#F6F1E7',
  searchBorder: '#DED5C5',
};

const baseThemeOptions = {
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontFamily: '"Playfair Display", "Cinzel", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Playfair Display", "Cinzel", Georgia, serif', fontWeight: 600, letterSpacing: '-0.005em' },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    subtitle1: { fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontSize: '1.2rem', fontStyle: 'italic' },
    overline: { fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '0.18em', fontWeight: 700 },
    button: { fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'none', fontWeight: 600, letterSpacing: '0.03em' },
  },
  // Sharp architectural geometry requested by user
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
          background: 'linear-gradient(135deg, #B65A3F 0%, #8E3E28 100%)',
          color: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(142, 62, 40, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8E3E28 0%, #742D19 100%)',
            boxShadow: '0 4px 16px rgba(142, 62, 40, 0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: '#B65A3F',
          color: '#B65A3F',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#8E3E28',
            background: 'rgba(182, 90, 63, 0.05)',
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
            '& fieldset': { borderColor: '#DED5C5', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: '#B65A3F' },
            '&.Mui-focused fieldset': { borderColor: '#B65A3F', borderWidth: '1.5px' },
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
          letterSpacing: '0.03em',
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
            background: '#B65A3F',
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
    info: { main: '#0F4C81' },
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
      dark: '#B65A3F',
    },
    secondary: {
      main: '#DFB956',
      light: '#FEF9E7',
      dark: '#C59B27',
    },
    background: {
      default: '#0C0A09',
      paper: '#161311',
    },
    text: {
      primary: '#F6F3EE',
      secondary: '#A39B92',
    },
    divider: 'rgba(232, 225, 213, 0.08)',
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    info: { main: '#38BDF8' },
    warning: { main: '#F59E0B' },
    custom: {
      ...sharedPalette,
      softCream: '#0C0A09',
      backgroundWarm: '#0C0A09',
      cardWhite: '#161311',
      heroGradientStart: '#0C0A09',
      heroGradientEnd: '#14110E',
      sectionAlt: '#110F0D',
      textPrimary: '#F6F3EE',
      textSecondary: '#A39B92',
      textTertiary: '#736B63',
      borderLight: 'rgba(232, 225, 213, 0.08)',
      borderSubtle: 'rgba(232, 225, 213, 0.04)',
      searchBorder: 'rgba(232, 225, 213, 0.12)',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          border: '1px solid rgba(232, 225, 213, 0.08)',
          backgroundColor: '#161311',
          transition: 'all 0.22s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#161311',
            '& fieldset': { borderColor: 'rgba(232, 225, 213, 0.12)' },
            '&:hover fieldset': { borderColor: '#DF8A71' },
            '&.Mui-focused fieldset': { borderColor: '#DF8A71' },
          },
        },
      },
    },
  },
});
