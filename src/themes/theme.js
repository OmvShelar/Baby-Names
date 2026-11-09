import { createTheme } from '@mui/material/styles';

const sharedPalette = {
  // Authentic PickBaby Name Logo Color System
  logoCyan: '#008CA8',
  logoCyanBright: '#00AEEF',
  logoCyanLight: '#E8F7FB',
  logoCyanDark: '#006B82',

  logoMagenta: '#E91E8E',
  logoMagentaBright: '#FF2E93',
  logoMagentaLight: '#FDF2F8',
  logoMagentaDark: '#BD106F',

  // Sacred Diya Gold & Warm Auspicious Tones
  gold: '#D97706',
  goldLight: '#FEF3C7',
  goldDark: '#B45309',
  goldGradient: 'linear-gradient(135deg, #00AEEF 0%, #E91E8E 100%)',
  goldGlow: '0 4px 18px rgba(0, 174, 239, 0.28)',

  // Sacred Peacock Feather Accent
  peacock: '#0D9488',
  peacockLight: '#CCFBF1',
  peacockDark: '#0F766E',

  // Primary Brand Accent (matching "Pick" and "Name" in Logo)
  coral: '#008CA8',
  coralDark: '#006B82',
  coralLight: '#E8F7FB',
  coralGradient: 'linear-gradient(135deg, #00AEEF 0%, #008CA8 100%)',

  // Secondary Brand Accent (matching "Baby" and Lotus in Logo)
  rose: '#E91E8E',
  roseDark: '#BD106F',
  roseLight: '#FDF2F8',
  roseGradient: 'linear-gradient(135deg, #FF2E93 0%, #E91E8E 100%)',

  // Boy Theme Colors - Radiant Royal Cyan (matches "Pick" & Footprint Top)
  boyBlue: '#008CA8',
  boyBlueLight: '#E8F7FB',
  boyBlueDark: '#00586B',
  boyGradient: 'linear-gradient(135deg, #00AEEF 0%, #008CA8 100%)',

  // Girl Theme Colors - Divine Lotus Magenta (matches "Baby" & Lotus)
  girlPink: '#E91E8E',
  girlPinkLight: '#FDF2F8',
  girlPinkDark: '#BD106F',
  girlGradient: 'linear-gradient(135deg, #FF2E93 0%, #E91E8E 100%)',

  // Neutrals - Luminous Alabaster & Clean Slate
  softCream: '#F8FAFC',
  cardWhite: '#FFFFFF',
  borderLight: '#E2E8F0',
  borderSubtle: '#F1F5F9',
  borderGold: 'rgba(0, 140, 168, 0.35)',
  borderCyan: 'rgba(0, 174, 239, 0.3)',
  borderMagenta: 'rgba(233, 30, 142, 0.3)',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',

  // Hero Gradients & Atmospheric Glows
  heroGradientStart: '#F0F9FC',
  heroGradientEnd: '#FFF5F9',
  sectionAlt: '#F8FAFC',
  searchBorder: '#CBD5E1',
};

const baseThemeOptions = {
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.005em' },
    h5: { fontFamily: '"Philosopher", "Marcellus", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Philosopher", "Marcellus", Georgia, serif', fontWeight: 600 },
    subtitle1: { fontFamily: '"Cormorant Garamond", "Philosopher", Georgia, serif', fontSize: '1.2rem', fontStyle: 'italic' },
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
          background: 'linear-gradient(135deg, #00AEEF 0%, #008CA8 100%)',
          color: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(0, 140, 168, 0.28)',
          '&:hover': {
            background: 'linear-gradient(135deg, #008CA8 0%, #006B82 100%)',
            boxShadow: '0 4px 16px rgba(0, 140, 168, 0.38)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: '#008CA8',
          color: '#008CA8',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#006B82',
            background: 'rgba(0, 140, 168, 0.06)',
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
          border: '1px solid #E2E8F0',
          transition: 'all 0.22s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': { borderColor: '#CBD5E1', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: '#008CA8' },
            '&.Mui-focused fieldset': { borderColor: '#008CA8', borderWidth: '1.5px' },
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
            background: 'linear-gradient(90deg, #00AEEF 0%, #E91E8E 100%)',
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
      main: sharedPalette.rose,
      light: sharedPalette.roseLight,
      dark: sharedPalette.roseDark,
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
    info: { main: '#008CA8' },
    warning: { main: '#D97706' },
    custom: sharedPalette,
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AEEF',
      light: '#E8F7FB',
      dark: '#008CA8',
    },
    secondary: {
      main: '#FF2E93',
      light: '#FDF2F8',
      dark: '#E91E8E',
    },
    background: {
      default: '#0A131C',
      paper: '#111F2D',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: 'rgba(226, 232, 240, 0.08)',
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    info: { main: '#38BDF8' },
    warning: { main: '#F59E0B' },
    custom: {
      ...sharedPalette,
      softCream: '#0A131C',
      backgroundWarm: '#0A131C',
      cardWhite: '#111F2D',
      heroGradientStart: '#0A131C',
      heroGradientEnd: '#132130',
      sectionAlt: '#0E1924',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textTertiary: '#64748B',
      borderLight: 'rgba(226, 232, 240, 0.1)',
      borderSubtle: 'rgba(226, 232, 240, 0.05)',
      searchBorder: 'rgba(0, 174, 239, 0.25)',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          border: '1px solid rgba(226, 232, 240, 0.08)',
          backgroundColor: '#111F2D',
          transition: 'all 0.22s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#111F2D',
            '& fieldset': { borderColor: 'rgba(226, 232, 240, 0.12)' },
            '&:hover fieldset': { borderColor: '#00AEEF' },
            '&.Mui-focused fieldset': { borderColor: '#00AEEF' },
          },
        },
      },
    },
  },
});
