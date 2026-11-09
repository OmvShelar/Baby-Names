import React, { useState, useMemo, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, InputAdornment, Grid, Chip,
  Tab, Tabs, IconButton, Button, alpha, useTheme, Paper,
} from '@mui/material';
import {
  Search, ArrowBack, Close, FilterList,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import NameCard from './NameCard';
import { namesDatabase, genderCategories } from '../data/data';
import { useFavorites } from './ui/FavoritesProvider';
import SEO from './SEO';
import {
  VedicLotusIcon,
  CrownPrinceIcon,
  PrincessTiaraIcon,
} from './icons/CustomIcons';

const TABS = [
  { label: 'All', value: 'all', icon: <FilterList sx={{ fontSize: 16 }} /> },
  { label: 'Boy', value: 'boy', icon: <CrownPrinceIcon size={15} color="currentColor" /> },
  { label: 'Girl', value: 'girl', icon: <PrincessTiaraIcon size={15} color="currentColor" /> },
];

export default function IndianNames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const custom = theme.palette.custom;

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleToggleFavorite = (name) => {
    toggleFavorite(name);
    if (!isFavorite(name)) {
      confetti({ particleCount: 75, spread: 55, origin: { y: 0.7 }, colors: ['#F59E0B', '#FF7E67', '#E11D48'] });
    }
  };

  const indianNames = useMemo(() => {
    const names = [];
    const indianCategories = genderCategories.indian || [];
    indianCategories.forEach((category) => {
      const categoryNames = namesDatabase[category.name] || [];
      categoryNames.forEach((item) => {
        if (item.boy) {
          names.push({
            name: item.boy, meaning: item.boy_meaning, gender: 'Boy',
            origin: category.name, zodiac: item.zodiac, popularity: item.boy_popularity,
          });
        }
        if (item.girl) {
          names.push({
            name: item.girl, meaning: item.girl_meaning, gender: 'Girl',
            origin: category.name, zodiac: item.zodiac, popularity: item.girl_popularity,
          });
        }
      });
    });
    return names;
  }, []);

  const filteredNames = useMemo(() => {
    let names = indianNames;
    if (selectedTab !== 'all') {
      names = names.filter((name) => name.gender.toLowerCase() === selectedTab);
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
  }, [indianNames, selectedTab, searchQuery]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <SEO
        title="18,000+ Indian & Sanskrit Baby Names (2026) | Vedic, Hindu & Cultural Heritage Names with Meanings"
        description="Discover traditional and cultural Indian and Sanskrit baby names for boys and girls. Revered Vedic meanings, deity names, and Nakshatra connections."
        keywords="indian baby names, sanskrit baby names, hindu baby names 2026, vedic baby names, traditional indian names"
        canonical="https://sweetbabynames.com/indian-names"
      />

      {/* Header Banner */}
      <Box
        sx={{
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          background: `linear-gradient(180deg, ${alpha('#F59E0B', 0.08)} 0%, transparent 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
        }}
      >
        <Container maxWidth="lg">
          <Button startIcon={<ArrowBack sx={{ fontSize: 18 }} />} onClick={() => navigate('/')} sx={{ mb: 2, color: 'text.secondary', fontSize: '0.85rem' }}>
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: '2px', bgcolor: alpha('#0D9488', 0.1), border: '1px solid rgba(13, 148, 136, 0.4)', display: 'flex', color: '#0D9488' }}>
              <VedicLotusIcon size={26} color="#0D9488" />
            </Box>
            <Typography variant="h1" sx={{ fontWeight: 700, fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif', fontSize: { xs: '2rem', md: '2.6rem' }, letterSpacing: '-0.01em' }}>
              Indian &amp; Sanskrit Baby Names
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3.5, maxWidth: 620, fontSize: '0.98rem' }}>
            Rooted in timeless Vedic philosophy, ancient Sanskrit epics, and sacred cultural lineages.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              placeholder="Search Indian names by letter or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: 'text.secondary' }} /></InputAdornment>,
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}><Close sx={{ fontSize: 18 }} /></IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1, minWidth: 260, '& .MuiOutlinedInput-root': { bgcolor: custom.cardWhite } }}
            />
            <Chip
              label={`${filteredNames.length} names found`}
              sx={{ height: 42, px: 1, bgcolor: alpha('#F59E0B', 0.1), color: '#D97706', fontWeight: 700, border: `1px solid ${alpha('#F59E0B', 0.25)}` }}
            />
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 1 }}>
        <Container maxWidth="lg">
          <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} variant="scrollable" scrollButtons="auto">
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>{tab.icon}{tab.label}</Box>}
                sx={{ minHeight: 44, fontWeight: selectedTab === tab.value ? 700 : 500, color: selectedTab === tab.value ? '#D97706' : 'text.secondary' }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Names Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {filteredNames.length === 0 ? (
          <Paper sx={{ textAlign: 'center', py: 8, px: 3, borderRadius: 4, bgcolor: custom.cardWhite }}>
            <Public sx={{ fontSize: 56, color: alpha('#F59E0B', 0.3), mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 1 }}>
              No Indian names match your search
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedTab('all'); setSearchQuery(''); }}>Reset Search</Button>
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
