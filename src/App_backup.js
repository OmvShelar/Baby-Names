import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme as useMuiTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  Baby as BabyIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Heart as HeartIcon,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  Crown as CrownIcon,
  Zap as ZapIcon
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Import custom theme and context
import { getTheme } from './themes/theme';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Import all components
import Home from './components/Home';
import BoyNames from './components/BoyNames';
import GirlNames from './components/GirlNames';
import IndianNames from './components/IndianNames';
import ModernNames from './components/ModernNames';
import ZodiacNames from './components/ZodiacNames';

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: isDarkMode ? '#fbbf24' : '#374151',
        backgroundColor: isDarkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(55, 65, 81, 0.1)',
        '&:hover': {
          backgroundColor: isDarkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(55, 65, 81, 0.2)',
          transform: 'scale(1.1)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </IconButton>
  );
};

// Navigation Component
const Navigation = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { label: 'Boy Names', path: '/boy-names', icon: <CrownIcon size={18} /> },
    { label: 'Girl Names', path: '/girl-names', icon: <SparklesIcon size={18} /> },
    { label: 'Indian Names', path: '/indian-names', icon: <StarIcon size={18} /> },
    { label: 'Modern Names', path: '/modern-names', icon: <ZapIcon size={18} /> },
    { label: 'Zodiac Names', path: '/zodiac-names', icon: <HeartIcon size={18} /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2 }}>
        <BabyIcon size={24} style={{ marginRight: 12, color: '#6366f1' }} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            color: isDarkMode ? '#ffffff' : '#111827',
          }}
        >
          Sweet Baby Names
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 2,
                backgroundColor: location.pathname === item.path
                  ? (isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)')
                  : 'transparent',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                },
                py: 1.5,
              }}
            >
              <Box sx={{ mr: 2, color: location.pathname === item.path ? '#6366f1' : (isDarkMode ? '#9ca3af' : '#6b7280') }}>
                {item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                    color: location.pathname === item.path
                      ? '#6366f1'
                      : (isDarkMode ? '#ffffff' : '#111827'),
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isDarkMode ? '#111827' : '#ffffff',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'}`,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
              transition: 'opacity 0.2s ease-in-out',
            }}
          >
            <BabyIcon size={28} style={{ marginRight: 12, color: '#6366f1' }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                color: isDarkMode ? '#ffffff' : '#111827',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Sweet Baby Names
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.path
                      ? '#6366f1'
                      : (isDarkMode ? '#d1d5db' : '#374151'),
                    backgroundColor: location.pathname === item.path
                      ? (isDarkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)')
                      : 'transparent',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                      color: '#6366f1',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <ThemeToggle />
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThemeToggle />
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: isDarkMode ? '#d1d5db' : '#374151',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(209, 213, 219, 0.1)' : 'rgba(55, 65, 81, 0.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderLeft: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

// Main App Component
function App() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boy-names" element={<BoyNames />} />
          <Route path="/girl-names" element={<GirlNames />} />
          <Route path="/indian-names" element={<IndianNames />} />
          <Route path="/modern-names" element={<ModernNames />} />
          <Route path="/zodiac-names" element={<ZodiacNames />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

// App with Theme Provider
function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithTheme;
