import React, { useState, useMemo, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, InputAdornment, Grid, Chip,
  Tab, Tabs, IconButton, Button, alpha, useTheme, Paper,
} from '@mui/material';
import {
  Search, Star, Boy, Girl, ArrowBack, Close, FilterList, AutoAwesome,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import NameCard from './NameCard';
import { namesDatabase, genderCategories } from '../data/data';
import { useFavorites } from './ui/FavoritesProvider';
import SEO from './SEO';

const ZODIAC_SIGNS = [
  'All', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export default function ZodiacNames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('All');
  const [genderFilter, setGenderFilter] = useState('all');
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
      confetti({ particleCount: 75, spread: 55, origin: { y: 0.7 }, colors: ['#8B5CF6', '#A78BFA', '#FF7E67'] });
    }
  };

  const zodiacNames = useMemo(() => {
    const names = [];
    const zodiacCategories = genderCategories.zodiac || [];
    zodiacCategories.forEach((category) => {
      const categoryNames = namesDatabase[category.name] || [];
      categoryNames.forEach((item) => {
        if (item.boy) {
          names.push({
            name: item.boy, meaning: item.boy_meaning, gender: 'Boy',
            origin: category.name, zodiac: category.name, popularity: item.boy_popularity,
          });
        }
        if (item.girl) {
          names.push({
            name: item.girl, meaning: item.girl_meaning, gender: 'Girl',
            origin: category.name, zodiac: category.name, popularity: item.girl_popularity,
          });
        }
      });
    });
    return names;
  }, []);

  const filteredNames = useMemo(() => {
    let names = zodiacNames;
    if (selectedZodiac !== 'All') {
      names = names.filter((name) => name.zodiac === selectedZodiac);
    }
    if (genderFilter !== 'all') {
      names = names.filter((name) => name.gender.toLowerCase() === genderFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      names = names.filter(
        (name) =>
          name.name.toLowerCase().includes(query) ||
          (name.meaning && name.meaning.toLowerCase().includes(query)) ||
          (name.zodiac && name.zodiac.toLowerCase().includes(query))
      );
    }
    return names;
  }, [zodiacNames, selectedZodiac, genderFilter, searchQuery]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <SEO
        title="Zodiac & Rashi Baby Names 2026 | Astrological Nakshatra Syllables for Boys & Girls"
        description="Choose auspicious baby names based on Vedic Moon Signs (Rashi) and Nakshatras. Complete guide to lucky letters for Aries, Taurus, Gemini, and all 12 rashis."
        keywords="zodiac baby names, rashi baby names, nakshatra baby names, astrology names 2026, lucky letter baby names"
        canonical="https://sweetbabynames.com/zodiac-names"
      />

      {/* Header Banner */}
      <Box
        sx={{
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          background: `linear-gradient(180deg, ${alpha('#8B5CF6', 0.08)} 0%, transparent 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
        }}
      >
        <Container maxWidth="lg">
          <Button startIcon={<ArrowBack sx={{ fontSize: 18 }} />} onClick={() => navigate('/')} sx={{ mb: 2, color: 'text.secondary', fontSize: '0.85rem' }}>
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha('#8B5CF6', 0.15), display: 'flex', color: '#8B5CF6' }}>
              <Star sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="h1" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2rem', md: '2.6rem' } }}>
              Zodiac (Rashi) Baby Names
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3.5, maxWidth: 600 }}>
            Align your child's name with cosmic energies. Discover lucky starting letters and auspicious Nakshatras.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              placeholder="Search by zodiac sign or name..."
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
              sx={{ height: 42, px: 1, bgcolor: alpha('#8B5CF6', 0.1), color: '#8B5CF6', fontWeight: 700, border: `1px solid ${alpha('#8B5CF6', 0.25)}` }}
            />
          </Box>
        </Container>
      </Box>

      {/* Zodiac Sign Filter Chips */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 1.5 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
            {ZODIAC_SIGNS.map((sign) => {
              const active = selectedZodiac === sign;
              return (
                <Chip
                  key={sign}
                  label={sign}
                  clickable
                  onClick={() => setSelectedZodiac(sign)}
                  sx={{
                    bgcolor: active ? '#8B5CF6' : 'transparent',
                    color: active ? '#FFFFFF' : 'text.primary',
                    fontWeight: active ? 700 : 500,
                    border: `1px solid ${active ? '#8B5CF6' : custom.borderLight}`,
                    fontSize: '0.85rem',
                    '&:hover': { bgcolor: active ? '#7C3AED' : alpha('#8B5CF6', 0.08) },
                  }}
                />
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Names Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {filteredNames.length === 0 ? (
          <Paper sx={{ textAlign: 'center', py: 8, px: 3, borderRadius: 4, bgcolor: custom.cardWhite }}>
            <Star sx={{ fontSize: 56, color: alpha('#8B5CF6', 0.3), mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 1 }}>
              No astrological names found
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedZodiac('All'); setSearchQuery(''); }}>Reset Search</Button>
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
