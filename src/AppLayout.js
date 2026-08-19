import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Container, useMediaQuery, Divider,
} from '@mui/material';
import { useTheme as useMuiTheme, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon, Home as HomeIcon, Boy, Girl, Public, TrendingUp, Star,
  Favorite, LightMode, DarkMode, X,
} from '@mui/icons-material';
import { MessageCircle, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './themes/theme';
import Footer from './components/Footer';
import Home from './components/Home';
import BoyNames from './components/BoyNames';
import GirlNames from './components/GirlNames';
import IndianNames from './components/IndianNames';
import ModernNames from './components/ModernNames';
import ZodiacNames from './components/ZodiacNames';
import Favorites from './components/Favorites';
import { useFavorites } from './components/ui/FavoritesProvider';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: 20 }} /> },
  { label: 'Boy Names', path: '/boy-names', icon: <Boy sx={{ fontSize: 20 }} /> },
  { label: 'Girl Names', path: '/girl-names', icon: <Girl sx={{ fontSize: 20 }} /> },
  { label: 'Indian Names', path: '/indian-names', icon: <Public sx={{ fontSize: 20 }} /> },
  { label: 'Modern Names', path: '/modern-names', icon: <TrendingUp sx={{ fontSize: 20 }} /> },
  { label: 'Zodiac Names', path: '/zodiac-names', icon: <Star sx={{ fontSize: 20 }} /> },
];

const WhatsAppButton = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
  >
    <IconButton
      href="https://wa.me/+917796196502"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: 56, height: 56, borderRadius: 0,
        background: '#25D366', color: 'white',
        boxShadow: '0 4px 14px rgba(37,211,102,0.4)',
        '&:hover': { background: '#20BD5A', boxShadow: '0 6px 20px rgba(37,211,102,0.5)', transform: 'translateY(-2px)' },
        transition: 'all 0.2s ease',
      }}
    >
      <MessageCircle sx={{ fontSize: 26 }} />
    </IconButton>
  </motion.div>
);

export default function AppLayout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const custom = muiTheme.palette.custom;
  const { favorites } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', transition: 'background-color 0.3s ease' }}>
      {/* Top Bar */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: alpha(custom.cardWhite, isDarkMode ? 0.9 : 0.95), backdropFilter: 'blur(12px)', borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 60, display: 'flex', justifyContent: 'space-between' }}>
            <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1 }}>
              <Box sx={{ p: 0.8, borderRadius: 0, background: 'linear-gradient(135deg, #D08B7B, #E5B7A9)', display: 'flex', boxShadow: '0 2px 8px rgba(208,139,123,0.35)' }}>
                <Baby sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.1rem' }, color: 'text.primary' }}>
                Sweet Baby Names
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {NAV_ITEMS.map((item) => (
                  <Button key={item.path} onClick={() => navigate(item.path)} startIcon={item.icon}
                    sx={{
                      py: 0.7, px: 1.5, fontSize: '0.8rem', borderRadius: 0,
                      color: isActive(item.path) ? '#D08B7B' : 'text.secondary',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      borderBottom: isActive(item.path) ? '2px solid #D08B7B' : '2px solid transparent',
                      '&:hover': { color: '#D08B7B', background: 'transparent' },
                    }}
                  >{item.label}</Button>
                ))}

                <Button onClick={() => navigate('/favorites')} startIcon={<Favorite />} sx={{ ml: 2, color: favorites.length ? '#E11D48' : 'text.secondary' }}>
                  Favorites
                </Button>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} sx={{ p: 1, borderRadius: 0, color: 'text.secondary', '&:hover': { color: '#D08B7B' } }}>
                {isDarkMode ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
              </IconButton>
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ p: 1, borderRadius: 0, color: 'text.primary' }}>
                  <MenuIcon sx={{ fontSize: 22 }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: 280, bgcolor: custom.cardWhite } }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: '1rem' }}>Menu</Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ p: 0.5, borderRadius: 0 }}><X sx={{ fontSize: 20 }} /></IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} onClick={() => { navigate(item.path); setMobileOpen(false); }}
              sx={{
                mb: 0.5, cursor: 'pointer', py: 1.2,
                borderLeft: isActive(item.path) ? '3px solid #D08B7B' : '3px solid transparent',
                bgcolor: isActive(item.path) ? alpha('#D08B7B', 0.06) : 'transparent',
                '&:hover': { bgcolor: alpha('#D08B7B', 0.04) },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? '#D08B7B' : 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive(item.path) ? 600 : 400, color: isActive(item.path) ? '#D08B7B' : 'text.primary' }} />
            </ListItem>
          ))}

          <ListItem onClick={() => { navigate('/favorites'); setMobileOpen(false); }} sx={{ cursor: 'pointer', py: 1.2 }}>
            <ListItemIcon sx={{ minWidth: 36 }}><Favorite sx={{ color: favorites.length ? '#E11D48' : 'text.secondary' }} /></ListItemIcon>
            <ListItemText primary={`Favorites (${favorites.length})`} primaryTypographyProps={{ fontSize: '0.875rem' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, pt: '60px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boy-names" element={<BoyNames />} />
              <Route path="/girl-names" element={<GirlNames />} />
              <Route path="/indian-names" element={<IndianNames />} />
              <Route path="/modern-names" element={<ModernNames />} />
              <Route path="/zodiac-names" element={<ZodiacNames />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Footer />
      <WhatsAppButton />
    </Box>
  );
}
