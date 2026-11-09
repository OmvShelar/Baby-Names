import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Container, useMediaQuery, Divider, Badge, Chip,
} from '@mui/material';
import { useTheme as useMuiTheme, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon, LightMode, DarkMode, Close,
} from '@mui/icons-material';
import { MessageCircle } from 'lucide-react';
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
import BrandLogo from './components/ui/BrandLogo';
import {
  ManorHomeIcon,
  CrownPrinceIcon,
  PrincessTiaraIcon,
  VedicLotusIcon,
  ModernSparkleIcon,
  AstrologyCompassIcon,
  FeatherQuillIcon,
  FiligreeHeartIcon,
} from './components/icons/CustomIcons';

const NAV_ITEMS = [
  { label: 'Home', path: '/', renderIcon: (active) => <ManorHomeIcon size={18} color={active ? '#FFFFFF' : 'currentColor'} /> },
  { label: 'Boy Names', path: '/boy-names', renderIcon: (active) => <CrownPrinceIcon size={18} color={active ? '#FFFFFF' : '#008CA8'} /> },
  { label: 'Girl Names', path: '/girl-names', renderIcon: (active) => <PrincessTiaraIcon size={18} color={active ? '#FFFFFF' : '#E91E8E'} /> },
  { label: 'Indian Heritage', path: '/indian-names', renderIcon: (active) => <VedicLotusIcon size={18} color={active ? '#FFFFFF' : '#0D9488'} /> },
  { label: 'Modern & Trendy', path: '/modern-names', renderIcon: (active) => <ModernSparkleIcon size={18} color={active ? '#FFFFFF' : '#00AEEF'} /> },
  { label: 'Zodiac (Rashi)', path: '/zodiac-names', renderIcon: (active) => <AstrologyCompassIcon size={18} color={active ? '#FFFFFF' : '#D97706'} /> },
  { label: 'Editorial Blogs', path: '/blogs', renderIcon: (active) => <FeatherQuillIcon size={18} color={active ? '#FFFFFF' : '#E91E8E'} />, isNew: true },
];

const WhatsAppButton = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
  >
    <Box title="Speak with a Baby Naming Specialist on WhatsApp">
      <IconButton
        href="https://wa.me/+917796196502?text=Hello%2C%20I%20would%20like%20guidance%20on%20choosing%20a%20baby%20name"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2, // Sharp architectural profile
          background: 'linear-gradient(135deg, #1E7E34 0%, #125E27 100%)',
          color: '#FFFFFF',
          border: '1.5px solid rgba(0, 174, 239, 0.65)', // Cyan hairline rim
          boxShadow: '0 8px 24px rgba(18, 94, 39, 0.4), 0 2px 8px rgba(0, 174, 239, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #23923D 0%, #156B2D 100%)',
            borderColor: '#00AEEF',
            boxShadow: '0 12px 28px rgba(18, 94, 39, 0.55), 0 4px 12px rgba(0, 174, 239, 0.45)',
            transform: 'scale(1.05) translateY(-2px)',
          },
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <MessageCircle size={26} />
      </IconButton>
    </Box>
  </motion.div>
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
      {/* Top Navbar with Prestige Announcement Ribbon */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isDarkMode ? alpha('#0A131C', 0.94) : alpha('#F8FAFC', 0.96),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${custom.borderLight}`,
          zIndex: 1100,
        }}
      >
        {/* Prestige Announcement Ribbon */}
        <Box
          sx={{
            background: isDarkMode
              ? 'linear-gradient(90deg, #09121B 0%, #102130 50%, #09121B 100%)'
              : 'linear-gradient(90deg, #071724 0%, #0A263D 50%, #071724 100%)',
            color: '#FFFFFF',
            py: 0.5,
            px: 2,
            borderBottom: '1px solid rgba(0, 174, 239, 0.3)',
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.2,
            fontSize: '0.68rem',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          <Box component="span" sx={{ color: '#00AEEF' }}>✦</Box>
          <span>PickBaby Name Atelier • Over 50,000 Verified Vedic, Modern &amp; Astrological Names</span>
          <Box component="span" sx={{ color: '#E91E8E' }}>✦</Box>
        </Box>

        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 68, display: 'flex', justifyContent: 'space-between' }}>
            {/* Authentic Brand Logo */}
            <BrandLogo size="navbar" onClick={() => navigate('/')} />

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      startIcon={item.renderIcon(active)}
                      sx={{
                        py: 0.75,
                        px: 1.6,
                        fontSize: '0.84rem',
                        letterSpacing: '0.02em',
                        borderRadius: '2px', // Sharp
                        color: active ? '#FFFFFF' : 'text.primary',
                        background: active
                          ? 'linear-gradient(135deg, #00AEEF 0%, #008CA8 100%)'
                          : 'transparent',
                        fontWeight: active ? 700 : 500,
                        border: active ? '1px solid #006B82' : '1px solid transparent',
                        boxShadow: active ? '0 2px 10px rgba(0, 140, 168, 0.3)' : 'none',
                        '&:hover': {
                          bgcolor: active ? '#006B82' : alpha('#008CA8', 0.08),
                          color: active ? '#FFFFFF' : '#008CA8',
                          borderColor: active ? '#006B82' : alpha('#008CA8', 0.25),
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item.label}
                      {item.isNew && (
                        <Box
                          component="span"
                          sx={{
                            ml: 0.8,
                            px: 0.6,
                            py: 0.1,
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            borderRadius: '2px',
                            bgcolor: active ? '#FFFFFF' : '#E91E8E',
                            color: active ? '#008CA8' : '#FFFFFF',
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
                    <Badge badgeContent={favorites.length} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.68rem', minWidth: 16, height: 16, bgcolor: '#E91E8E', color: '#fff' } }}>
                      <FiligreeHeartIcon size={18} color={isActive('/favorites') ? '#FFFFFF' : favorites.length ? '#E91E8E' : 'currentColor'} filled={favorites.length > 0} />
                    </Badge>
                  }
                  sx={{
                    ml: 0.8,
                    py: 0.75,
                    px: 1.8,
                    fontSize: '0.84rem',
                    letterSpacing: '0.02em',
                    borderRadius: '2px',
                    color: isActive('/favorites') ? '#FFFFFF' : favorites.length ? '#E91E8E' : 'text.secondary',
                    bgcolor: isActive('/favorites') ? '#E91E8E' : alpha('#E91E8E', 0.08),
                    border: isActive('/favorites') ? '1px solid #BD106F' : `1px solid ${alpha('#E91E8E', 0.25)}`,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: isActive('/favorites') ? '#BD106F' : alpha('#E91E8E', 0.15),
                    },
                    transition: 'all 0.2s ease',
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
                  p: 1,
                  borderRadius: '2px',
                  bgcolor: alpha(custom.coral, 0.07),
                  border: `1px solid ${custom.borderLight}`,
                  color: isDarkMode ? custom.gold : 'text.secondary',
                  '&:hover': {
                    bgcolor: alpha(custom.coral, 0.15),
                    borderColor: custom.gold,
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {isDarkMode ? <LightMode sx={{ fontSize: 19 }} /> : <DarkMode sx={{ fontSize: 19 }} />}
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open mobile navigation"
                  sx={{
                    p: 1,
                    borderRadius: '2px',
                    bgcolor: alpha(custom.coral, 0.07),
                    border: `1px solid ${custom.borderLight}`,
                    color: 'text.primary',
                  }}
                >
                  <MenuIcon sx={{ fontSize: 22 }} />
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
            width: 320,
            bgcolor: custom.cardWhite,
            p: 3,
            borderLeft: `1px solid ${custom.borderLight}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <BrandLogo size="small" onClick={() => { navigate('/'); setMobileOpen(false); }} />
          <IconButton onClick={() => setMobileOpen(false)} sx={{ borderRadius: '2px', border: `1px solid ${custom.borderLight}` }}>
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2.5, borderColor: custom.borderLight }} />

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
                  px: 1.8,
                  borderRadius: '2px',
                  bgcolor: active ? alpha(custom.coral, 0.1) : 'transparent',
                  border: active ? `1px solid ${alpha(custom.coral, 0.35)}` : '1px solid transparent',
                  '&:hover': { bgcolor: alpha(custom.coral, 0.06) },
                  transition: 'all 0.18s ease',
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: active ? custom.coral : 'text.secondary' }}>
                  {item.renderIcon(active)}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#008CA8' : 'text.primary',
                  }}
                />
                {item.isNew && (
                  <Chip label="NEW" size="small" sx={{ borderRadius: '2px', bgcolor: '#E91E8E', color: '#fff', height: 18, fontSize: '0.62rem', fontWeight: 800 }} />
                )}
              </ListItem>
            );
          })}

          <ListItem
            onClick={() => { navigate('/favorites'); setMobileOpen(false); }}
            sx={{
              cursor: 'pointer',
              py: 1.2,
              px: 1.8,
              borderRadius: '2px',
              mt: 1.5,
              bgcolor: isActive('/favorites') ? alpha('#E91E8E', 0.14) : alpha('#E91E8E', 0.05),
              border: `1px solid ${alpha('#E91E8E', 0.25)}`,
              '&:hover': { bgcolor: alpha('#E91E8E', 0.12) },
            }}
          >
            <ListItemIcon sx={{ minWidth: 34 }}>
              <FiligreeHeartIcon size={18} color="#E91E8E" filled={favorites.length > 0} />
            </ListItemIcon>
            <ListItemText
              primary={`Favorites Shortlist (${favorites.length})`}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#E91E8E',
              }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, pt: { xs: '68px', sm: '96px' } }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
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

      {/* Footer & WhatsApp Floating Button */}
      <Footer />
      <WhatsAppButton />
    </Box>
  );
}
