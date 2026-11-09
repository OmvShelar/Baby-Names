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
  Paper,
} from '@mui/material';
import {
  Search,
  ArrowBack,
  Close,
  FilterList,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import NameCard from './NameCard';
import { namesDatabase, genderCategories } from '../data/data';
import { useFavorites } from './ui/FavoritesProvider';
import SEO from './SEO';
import {
  CrownPrinceIcon,
  VedicLotusIcon,
  AstrologyCompassIcon,
  ModernSparkleIcon,
} from './icons/CustomIcons';

const TABS = [
  { label: 'All', value: 'all', icon: <FilterList sx={{ fontSize: 16 }} /> },
  ...genderCategories.boy.map((cat) => ({
    label: cat.name,
    value: cat.name,
    icon: cat.name === 'Indian' ? <VedicLotusIcon size={15} color="currentColor" /> : cat.name === 'Zodiac' ? <AstrologyCompassIcon size={15} color="currentColor" /> : <ModernSparkleIcon size={15} color="currentColor" />,
  })),
];

export default function BoyNames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleToggleFavorite = (name) => {
    toggleFavorite(name);
    if (!isFavorite(name)) {
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.7 }, colors: ['#0284C7', '#38BDF8', '#FF7E67'] });
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <SEO
        title="PickBaby Name | 25,000+ Baby Boy Names (2026) | Unique & Vedic Boy Names"
        description="Discover the perfect baby boy name with PickBaby Name. Strong, meaningful, Vedic, and contemporary boy names with meanings and zodiac insights."
        keywords="PickBaby Name, baby boy names, boy names 2026, sanskrit boy names, modern boy names, hindu boy names, unique boy names"
        canonical="https://sweetbabynames.com/boy-names"
      />

      {/* Header Banner */}
      <Box
        sx={{
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          background: `linear-gradient(180deg, ${alpha('#00AEEF', 0.08)} 0%, transparent 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
            onClick={() => navigate('/')}
            sx={{ mb: 2, color: 'text.secondary', fontSize: '0.85rem' }}
          >
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: '2px', bgcolor: alpha('#008CA8', 0.1), border: '1px solid rgba(0, 174, 239, 0.4)', display: 'flex', color: '#008CA8' }}>
              <CrownPrinceIcon size={26} color="#008CA8" />
            </Box>
            <Typography variant="h1" sx={{ fontWeight: 700, fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontSize: { xs: '2rem', md: '2.6rem' }, letterSpacing: '-0.01em' }}>
              Baby Boy Names
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3.5, maxWidth: 620, fontSize: '0.98rem' }}>
            Noble, handsome, and meaningful names for your little prince. Filter by Sanskrit heritage, modern brevity, and astrological Nakshatra signs.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              placeholder="Search boy names by letter, origin, or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}>
                      <Close sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: 260,
                '& .MuiOutlinedInput-root': {
                  bgcolor: custom.cardWhite,
                  borderRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                },
              }}
            />
            <Chip
              label={`${filteredNames.length} names found`}
              sx={{
                height: 42,
                px: 1,
                borderRadius: '3px',
                bgcolor: alpha('#0284C7', 0.1),
                color: '#0284C7',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: `1px solid ${alpha('#0284C7', 0.25)}`,
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 1 }}>
        <Container maxWidth="lg">
          <Tabs
            value={selectedTab}
            onChange={(e, v) => setSelectedTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    {tab.icon}
                    {tab.label}
                  </Box>
                }
                sx={{
                  minHeight: 44,
                  textTransform: 'none',
                  fontWeight: selectedTab === tab.value ? 700 : 500,
                  color: selectedTab === tab.value ? '#0284C7' : 'text.secondary',
                  fontSize: '0.9rem',
                }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Names Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {filteredNames.length === 0 ? (
          <Paper sx={{ textAlign: 'center', py: 8, px: 3, borderRadius: 4, bgcolor: custom.cardWhite }}>
            <Boy sx={{ fontSize: 56, color: alpha('#0284C7', 0.3), mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 1 }}>
              No boy names found
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Try searching with another spelling, letter, or reset the category filter.
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedTab('all'); setSearchQuery(''); }}>
              Clear Search
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredNames.map((name, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={name.name + name.origin + i}>
                <NameCard
                  name={name.name}
                  meaning={name.meaning}
                  gender={name.gender}
                  origin={name.origin}
                  zodiac={name.zodiac}
                  popularity={name.popularity}
                  isFavorite={isFavorite(name.name)}
                  onToggleFavorite={handleToggleFavorite}
                  index={i}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
