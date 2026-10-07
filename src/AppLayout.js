import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Container, useMediaQuery, Divider, Badge, Chip,
} from '@mui/material';
import { useTheme as useMuiTheme, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon, Home as HomeIcon, Boy, Girl, Public, TrendingUp, Star,
  Favorite, LightMode, DarkMode, Close, MenuBook,
} from '@mui/icons-material';
import { MessageCircle, Baby, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from './contexts/ThemeContext';
import Footer from './components/Footer';
import Home from './components/Home';
import BoyNames from './components/BoyNames';
import GirlNames from './components/GirlNames';
import IndianNames from './components/IndianNames';
import ModernNames from './components/ModernNames';
import ZodiacNames from './components/ZodiacNames';
import Favorites from './components/Favorites';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost';
import { useFavorites } from './components/ui/FavoritesProvider';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: 19 }} /> },
  { label: 'Boy Names', path: '/boy-names', icon: <Boy sx={{ fontSize: 20 }} />, color: '#0284C7' },
  { label: 'Girl Names', path: '/girl-names', icon: <Girl sx={{ fontSize: 20 }} />, color: '#E11D48' },
  { label: 'Indian Names', path: '/indian-names', icon: <Public sx={{ fontSize: 19 }} /> },
  { label: 'Modern Names', path: '/modern-names', icon: <TrendingUp sx={{ fontSize: 19 }} /> },
  { label: 'Zodiac Names', path: '/zodiac-names', icon: <Star sx={{ fontSize: 19 }} /> },
  { label: 'Blogs', path: '/blogs', icon: <MenuBook sx={{ fontSize: 19 }} />, isNew: true },
];

const WhatsAppButton = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
  >
    <TooltipWrapper title="Ask Baby Naming Expert on WhatsApp">
      <IconButton
        href="https://wa.me/+917796196502?text=Hello%2C%20I%20would%20like%20guidance%20on%20choosing%20a%20baby%20name"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        sx={{
          width: 58,
          height: 58,
          borderRadius: 50,
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: 'white',
          boxShadow: '0 8px 24px rgba(37,211,102,0.45)',
          '&:hover': {
            background: 'linear-gradient(135deg, #20BD5A 0%, #0E7367 100%)',
            boxShadow: '0 12px 28px rgba(37,211,102,0.6)',
            transform: 'scale(1.08) translateY(-2px)',
          },
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <MessageCircle size={28} />
      </IconButton>
    </TooltipWrapper>
  </motion.div>
);

const TooltipWrapper = ({ children, title }) => (
  <Box title={title}>{children}</Box>
);

export default function AppLayout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const custom = muiTheme.palette.custom;
  const { favorites } = useFavorites();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', transition: 'background-color 0.3s ease' }}>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isDarkMode ? alpha('#0F1218', 0.88) : alpha('#FFFFFF', 0.92),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${custom.borderLight}`,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 68, display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: 1.2,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF7E67 0%, #F43F5E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(255, 126, 103, 0.4)',
                }}
              >
                <Baby size={22} style={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.05rem', sm: '1.25rem' },
                    lineHeight: 1.1,
                    color: 'text.primary',
                  }}
                >
                  Sweet Baby Names
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: custom.coral,
                    fontWeight: 700,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Pure Love • Verified Meanings
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      startIcon={item.icon}
                      sx={{
                        py: 0.8,
                        px: 1.8,
                        fontSize: '0.86rem',
                        borderRadius: 50,
                        color: active ? '#FFFFFF' : 'text.primary',
                        bgcolor: active ? custom.coral : 'transparent',
                        fontWeight: active ? 700 : 500,
                        boxShadow: active ? '0 4px 14px rgba(255, 126, 103, 0.35)' : 'none',
                        '&:hover': {
                          bgcolor: active ? custom.coralDark : alpha(custom.coral, 0.1),
                          color: active ? '#FFFFFF' : custom.coral,
                        },
                      }}
                    >
                      {item.label}
                      {item.isNew && (
                        <Box
                          component="span"
                          sx={{
                            ml: 0.8,
                            px: 0.7,
                            py: 0.1,
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            borderRadius: 10,
                            bgcolor: active ? '#FFFFFF' : '#EC4899',
                            color: active ? '#EC4899' : '#FFFFFF',
                          }}
                        >
                          NEW
                        </Box>
                      )}
                    </Button>
                  );
                })}

                {/* Favorites Button with Counter */}
                <Button
                  onClick={() => navigate('/favorites')}
                  startIcon={
                    <Badge badgeContent={favorites.length} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}>
                      <Favorite sx={{ fontSize: 19, color: favorites.length ? '#E11D48' : 'text.secondary' }} />
                    </Badge>
                  }
                  sx={{
                    ml: 1,
                    py: 0.8,
                    px: 2,
                    fontSize: '0.86rem',
                    borderRadius: 50,
                    color: isActive('/favorites') ? '#FFFFFF' : favorites.length ? '#E11D48' : 'text.secondary',
                    bgcolor: isActive('/favorites') ? '#E11D48' : alpha('#E11D48', 0.08),
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: isActive('/favorites') ? '#BE123C' : alpha('#E11D48', 0.15),
                    },
                  }}
                >
                  Favorites
                </Button>
              </Box>
            )}

            {/* Actions: Theme Toggle & Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                sx={{
                  p: 1.1,
                  borderRadius: 50,
                  bgcolor: alpha(custom.coral, 0.08),
                  color: isDarkMode ? '#F59E0B' : '#645D56',
                  '&:hover': {
                    bgcolor: alpha(custom.coral, 0.16),
                    transform: 'rotate(15deg)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                {isDarkMode ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open mobile menu"
                  sx={{
                    p: 1.1,
                    borderRadius: 50,
                    bgcolor: alpha(custom.coral, 0.08),
                    color: 'text.primary',
                  }}
                >
                  <MenuIcon sx={{ fontSize: 24 }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: custom.cardWhite,
            p: 2.5,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ p: 0.8, borderRadius: 2.5, background: 'linear-gradient(135deg, #FF7E67, #F43F5E)', display: 'flex' }}>
              <Baby size={18} style={{ color: '#fff' }} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '1.05rem' }}>
              Menu
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ borderRadius: 50 }}>
            <Close sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <List sx={{ px: 0 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem
                key={item.path}
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  py: 1.2,
                  px: 2,
                  borderRadius: 3,
                  bgcolor: active ? alpha(custom.coral, 0.12) : 'transparent',
                  border: active ? `1px solid ${alpha(custom.coral, 0.3)}` : '1px solid transparent',
                  '&:hover': { bgcolor: alpha(custom.coral, 0.08) },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: active ? custom.coral : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.92rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? custom.coral : 'text.primary',
                  }}
                />
                {item.isNew && (
                  <Chip label="NEW" size="small" sx={{ bgcolor: '#EC4899', color: '#fff', height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                )}
              </ListItem>
            );
          })}

          <ListItem
            onClick={() => { navigate('/favorites'); setMobileOpen(false); }}
            sx={{
              cursor: 'pointer',
              py: 1.2,
              px: 2,
              borderRadius: 3,
              mt: 1,
              bgcolor: isActive('/favorites') ? alpha('#E11D48', 0.12) : alpha('#E11D48', 0.05),
              '&:hover': { bgcolor: alpha('#E11D48', 0.15) },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Favorite sx={{ color: '#E11D48' }} />
            </ListItemIcon>
            <ListItemText
              primary={`Favorites (${favorites.length})`}
              primaryTypographyProps={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#E11D48',
              }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, pt: '68px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boy-names" element={<BoyNames />} />
              <Route path="/girl-names" element={<GirlNames />} />
              <Route path="/indian-names" element={<IndianNames />} />
              <Route path="/modern-names" element={<ModernNames />} />
              <Route path="/zodiac-names" element={<ZodiacNames />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Footer & WhatsApp */}
      <Footer />
      <WhatsAppButton />
    </Box>
  );
}
