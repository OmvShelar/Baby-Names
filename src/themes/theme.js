import { createTheme } from '@mui/material/styles';

const sharedPalette = {
  // Brand accents
  coral: '#FF7E67',
  coralDark: '#E05D45',
  coralLight: '#FFE8E4',
  rose: '#F43F5E',
  blush: '#FFF1F2',
  
  // Boy theme colors
  boyBlue: '#0284C7',
  boyBlueLight: '#E0F2FE',
  boyBlueDark: '#0369A1',
  boyGradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',

  // Girl theme colors
  girlPink: '#E11D48',
  girlPinkLight: '#FFE4E6',
  girlPinkDark: '#BE123C',
  girlGradient: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',

  // Neutrals
  warmGold: '#F59E0B',
  softCream: '#FAF7F2',
  borderLight: '#ECE5DB',
  borderSubtle: '#F0EBE3',
  textPrimary: '#1E1B18',
  textSecondary: '#645D56',
  textTertiary: '#9E958C',
  cardWhite: '#FFFFFF',

  // Hero Gradients
  heroGradientStart: '#FFFBF7',
  heroGradientEnd: '#F7EFE7',
  sectionAlt: '#F9F5EF',
  searchBorder: '#E4DDD4',
};

const baseThemeOptions = {
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.015em' },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    subtitle1: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 },
    button: { fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 16 },
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
          borderRadius: 50,
          fontWeight: 600,
          padding: '10px 24px',
          fontSize: '0.9rem',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #FF7E67 0%, #F43F5E 100%)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px -4px rgba(255, 126, 103, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
            boxShadow: '0 12px 26px -4px rgba(255, 126, 103, 0.45)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 126, 103, 0.4)',
          color: '#FF7E67',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#FF7E67',
            background: 'rgba(255, 126, 103, 0.06)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 18 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid #ECE5DB',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 50,
            '& fieldset': { borderColor: '#E4DDD4', borderWidth: '1.5px' },
            '&:hover fieldset': { borderColor: '#FF7E67' },
            '&.Mui-focused fieldset': { borderColor: '#FF7E67', borderWidth: '2px' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          fontWeight: 600,
          fontSize: '0.78rem',
          letterSpacing: '0.01em',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: '24px 0 0 24px' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 24 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44,
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #FF7E67, #F43F5E)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 44,
          borderRadius: 20,
          fontWeight: 600,
          fontSize: '0.9rem',
          padding: '8px 20px',
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
      light: sharedPalette.blush,
      dark: '#BE123C',
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
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    info: { main: '#0EA5E9' },
    warning: { main: '#F59E0B' },
    custom: sharedPalette,
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF8F7A',
      light: '#FFD3CB',
      dark: '#E05D45',
    },
    secondary: {
      main: '#FB7185',
      light: '#FFE4E6',
      dark: '#E11D48',
    },
    background: {
      default: '#0F1218',
      paper: '#181C24',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    success: { main: '#34D399' },
    error: { main: '#F87171' },
    info: { main: '#38BDF8' },
    warning: { main: '#FBBF24' },
    custom: {
      ...sharedPalette,
      softCream: '#0F1218',
      backgroundWarm: '#0F1218',
      cardWhite: '#181C24',
      heroGradientStart: '#0F1218',
      heroGradientEnd: '#161B22',
      sectionAlt: '#141820',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textTertiary: '#64748B',
      borderLight: 'rgba(255, 255, 255, 0.09)',
      borderSubtle: 'rgba(255, 255, 255, 0.05)',
      searchBorder: 'rgba(255, 255, 255, 0.14)',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.09)',
          backgroundColor: '#181C24',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 50,
            backgroundColor: '#181C24',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.14)' },
            '&:hover fieldset': { borderColor: '#FF8F7A' },
            '&.Mui-focused fieldset': { borderColor: '#FF8F7A' },
          },
        },
      },
    },
  },
});
