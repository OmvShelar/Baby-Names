import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  Tab,
  Tabs,
  IconButton,
  Badge,
  Button,
  Fab,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search,
  Boy,
  Girl,
  Star,
  AutoAwesome,
  Favorite,
  ArrowBack,
  Close,
  FilterList,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import NameCard from './NameCard';
import { namesDatabase, genderCategories } from '../data/data';

const TABS = [
  { label: 'All', value: 'all', icon: <FilterList sx={{ fontSize: 16 }} /> },
  ...genderCategories.boy.map((cat) => ({
    label: cat.name,
    value: cat.name,
    icon: cat.name === 'Indian' ? <Star sx={{ fontSize: 16 }} /> : cat.name === 'Zodiac' ? <Star sx={{ fontSize: 16 }} /> : <AutoAwesome sx={{ fontSize: 16 }} />,
  })),
];
import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NameGrid from './ui/NameGrid';
import NameDetails from './ui/NameDetails';
import { boyNamesData } from '../data/names';

const subcategories = [
  { key: 'indian', label: 'Indian Names' },
  { key: 'god', label: 'God Names' },
  { key: 'modern', label: 'Modern Names' },
  { key: 'zodiac', label: 'Zodiac Names' },
];

const BoyNames = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteNames');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('favoriteNames', JSON.stringify(favorites));
  }, [favorites]);
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
    if (!favorites.includes(name)) {
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.7 }, colors: ['#D08B7B', '#E5B7A9', '#6B8FAD'] });
    }
  };

  const allBoyNames = useMemo(() => {
    const names = [];
    genderCategories.boy.forEach((category) => {
      const categoryNames = namesDatabase[category.name] || [];
      categoryNames.forEach((item) => {
        if (item.boy) {
          names.push({
            name: item.boy,
            meaning: item.boy_meaning,
            gender: 'Boy',
            origin: category.name,
            zodiac: item.zodiac,
            popularity: item.boy_popularity,
          });
        }
      });
    });
    return names;
  }, []);

  const filteredNames = useMemo(() => {
    let names = allBoyNames;
    if (selectedTab !== 'all') {
      names = names.filter((name) => name.origin === selectedTab);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      names = names.filter(
        (name) =>
          name.name.toLowerCase().includes(query) ||
          (name.meaning && name.meaning.toLowerCase().includes(query)) ||
          (name.origin && name.origin.toLowerCase().includes(query))
      );
    }
    return names;
  }, [allBoyNames, selectedTab, searchQuery]);
  const handleOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const currentKey = subcategories[activeTab].key;
  let items = boyNamesData[currentKey] || [];
  // Normalize zodiac entries (they may use label/name)
  items = items.map((it) => {
    if (it.label) return { ...it, name: it.name || it.label.split(': ').pop() };
    return it;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 3, md: 4 }, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            onClick={() => navigate('/')}
            sx={{ mb: 2, color: 'text.secondary', fontSize: '0.8rem' }}
          >
            Back to Home
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ p: 0.8, bgcolor: alpha('#6B8FAD', 0.1), display: 'flex' }}>
              <Boy sx={{ fontSize: 20, color: '#6B8FAD' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E3F2FD', pt: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/')} sx={{ backgroundColor: '#3b82f6', color: 'white', '&:hover': { backgroundColor: '#2563eb' } }}>
            <BackIcon />
          </IconButton>

          <Box>
            <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, color: '#075985' }}>
              Boy Names
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.9rem' }}>
            Strong and timeless names for boys from diverse cultures and traditions.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              placeholder="Search boy names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>,
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}>
                      <Close sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${custom.borderLight}`,
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <Chip
              label={`${filteredNames.length} names`}
              sx={{
                height: 36,
                bgcolor: alpha('#6B8FAD', 0.08),
                color: '#6B8FAD',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: `1px solid ${alpha('#6B8FAD', 0.15)}`,
              }}
            />
            <Typography variant="body1" sx={{ color: '#075985', mt: 1 }}>
              Discover strong and meaningful names for your baby boy
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Tabs
            value={selectedTab}
            onChange={(e, v) => setSelectedTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    {tab.icon}
                    {tab.label}
                  </Box>
                }
                sx={{
                  minHeight: 48,
                  textTransform: 'none',
                  fontWeight: selectedTab === tab.value ? 600 : 400,
                  color: selectedTab === tab.value ? '#D08B7B' : 'text.secondary',
                  borderBottom: selectedTab === tab.value ? '2px solid #D08B7B' : '2px solid transparent',
                  fontSize: '0.825rem',
                  '&:hover': { color: '#D08B7B' },
                }}
              />
        <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} variant={isMobile ? 'scrollable' : 'standard'} scrollButtons="auto" sx={{ backgroundColor: 'transparent' }}>
            {subcategories.map((s, i) => (
              <Tab key={s.key} label={s.label} sx={{ color: activeTab === i ? '#075985' : '#07598599', fontWeight: 600 }} />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Names Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {filteredNames.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Boy sx={{ fontSize: 48, color: alpha('#6B8FAD', 0.2), mb: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: 1 }}>
              No names found
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Try a different search term or category.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredNames.map((name, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={name.name + name.origin}>
                <NameCard
                  name={name.name}
                  meaning={name.meaning}
                  gender={name.gender}
                  origin={name.origin}
                  zodiac={name.zodiac}
                  popularity={name.popularity}
                  isFavorite={favorites.includes(name.name)}
                  onToggleFavorite={toggleFavorite}
                  index={i}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ backgroundColor: 'transparent', borderRadius: 1, p: 0, mb: 4 }}>
          <NameGrid names={items} onOpen={handleOpen} />
        </Box>

        <NameDetails open={open} onClose={handleClose} item={selected} />
      </Container>

      {/* Favorites FAB */}
      <AnimatePresence>
        {favorites.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ position: 'fixed', bottom: 88, right: 24, zIndex: 1200 }}
          >
            <Badge badgeContent={favorites.length} color="error">
              <Fab
                sx={{
                  bgcolor: '#D08B7B',
                  color: '#fff',
                  boxShadow: '0 4px 14px rgba(208,139,123,0.4)',
                  '&:hover': { bgcolor: '#B57364' },
                }}
              >
                <Favorite sx={{ fontSize: 22 }} />
              </Fab>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default BoyNames;
