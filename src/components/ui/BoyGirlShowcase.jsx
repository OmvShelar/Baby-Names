import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  IconButton,
  Grid,
  Paper,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  Boy,
  Girl,
  AutoAwesome,
  Favorite,
  FavoriteBorder,
  ArrowForward,
  Star,
  Sparkles,
  VolumeUp,
  Share,
  Check,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useFavorites } from './FavoritesProvider';

const BOY_NAMES_SAMPLE = [
  { name: 'Aarav', meaning: 'Peaceful, calm & wisdom', origin: 'Sanskrit', zodiac: 'Libra', luckyNumber: 7, popularRank: '#1 Trending' },
  { name: 'Vihaan', meaning: 'First ray of the morning sun', origin: 'Sanskrit', zodiac: 'Aries', luckyNumber: 1, popularRank: '#2 Trending' },
  { name: 'Leo', meaning: 'Courageous lion, inner strength', origin: 'Latin', zodiac: 'Leo', luckyNumber: 5, popularRank: '#3 Trending' },
  { name: 'Arjun', meaning: 'Bright, shining & victorious', origin: 'Indian', zodiac: 'Leo', luckyNumber: 9, popularRank: '#4 Trending' },
  { name: 'Reyansh', meaning: 'A ray of celestial divine light', origin: 'Sanskrit', zodiac: 'Sagittarius', luckyNumber: 3, popularRank: '#5 Trending' },
];

const GIRL_NAMES_SAMPLE = [
  { name: 'Saanvi', meaning: 'Goddess Lakshmi, auspicious fortune', origin: 'Sanskrit', zodiac: 'Aries', luckyNumber: 6, popularRank: '#1 Trending' },
  { name: 'Myra', meaning: 'Sweet nectar, admirable wonder', origin: 'Modern', zodiac: 'Leo', luckyNumber: 4, popularRank: '#2 Trending' },
  { name: 'Diya', meaning: 'Radiant lamp, eternal light', origin: 'Indian', zodiac: 'Leo', luckyNumber: 2, popularRank: '#3 Trending' },
  { name: 'Ananya', meaning: 'Matchless, one-of-a-kind beauty', origin: 'Sanskrit', zodiac: 'Libra', luckyNumber: 8, popularRank: '#4 Trending' },
  { name: 'Kiara', meaning: 'Precious, sparkling & clear', origin: 'Modern', zodiac: 'Leo', luckyNumber: 7, popularRank: '#5 Trending' },
];

const TWIN_PAIRS = [
  { boy: 'Aarav', boyMeaning: 'Peaceful', girl: 'Aanya', girlMeaning: 'Gracious', bond: 'Peace & Grace' },
  { boy: 'Vihaan', boyMeaning: 'Morning Dawn', girl: 'Diya', girlMeaning: 'Radiant Light', bond: 'Dawn & Radiance' },
  { boy: 'Kabir', boyMeaning: 'Great & Noble', girl: 'Kiara', girlMeaning: 'Precious Gem', bond: 'Noble & Precious' },
  { boy: 'Leo', boyMeaning: 'Brave Lion', girl: 'Maya', girlMeaning: 'Cosmic Magic', bond: 'Bravery & Magic' },
];

export default function BoyGirlShowcase() {
  const [activeTab, setActiveTab] = useState('boy'); // 'boy' | 'girl' | 'twins'
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [copiedName, setCopiedName] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const currentBoy = BOY_NAMES_SAMPLE[currentSampleIndex % BOY_NAMES_SAMPLE.length];
  const currentGirl = GIRL_NAMES_SAMPLE[currentSampleIndex % GIRL_NAMES_SAMPLE.length];
  const currentTwin = TWIN_PAIRS[currentSampleIndex % TWIN_PAIRS.length];

  const handleFavorite = (name) => {
    toggleFavorite(name);
    if (!isFavorite(name)) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: activeTab === 'boy' ? ['#0284C7', '#38BDF8', '#F59E0B'] : ['#E11D48', '#FB7185', '#FF7E67'],
      });
    }
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.8, borderRadius: 50, bgcolor: alpha(custom.coral, 0.1), color: custom.coral, mb: 2 }}>
              <AutoAwesome sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Interactive Boy &amp; Girl Showcase
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Meet Your Future{' '}
              <Box component="span" sx={{ color: activeTab === 'boy' ? '#0284C7' : activeTab === 'girl' ? '#E11D48' : '#8B5CF6', transition: 'color 0.3s ease' }}>
                {activeTab === 'boy' ? 'Little Prince 👦' : activeTab === 'girl' ? 'Little Princess 👧' : 'Sweet Twins ✨'}
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 620, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Switch between boy and girl naming universes. Discover live curated trending picks, meanings, astrology, and harmonious twin sets.
            </Typography>
          </motion.div>

          {/* Interactive Mode Switcher Pill */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'inline-flex',
                p: 0.8,
                borderRadius: 50,
                bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#F3EDE4',
                border: `1px solid ${custom.borderLight}`,
              }}
            >
              <Button
                startIcon={<Boy />}
                onClick={() => { setActiveTab('boy'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: 50,
                  px: { xs: 2, sm: 3.5 },
                  py: 1.2,
                  bgcolor: activeTab === 'boy' ? '#0284C7' : 'transparent',
                  color: activeTab === 'boy' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'boy' ? '0 6px 18px rgba(2, 132, 199, 0.35)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'boy' ? '#0369A1' : alpha('#0284C7', 0.1),
                  },
                }}
              >
                Baby Boy
              </Button>
              <Button
                startIcon={<Girl />}
                onClick={() => { setActiveTab('girl'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: 50,
                  px: { xs: 2, sm: 3.5 },
                  py: 1.2,
                  bgcolor: activeTab === 'girl' ? '#E11D48' : 'transparent',
                  color: activeTab === 'girl' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'girl' ? '0 6px 18px rgba(225, 29, 72, 0.35)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'girl' ? '#BE123C' : alpha('#E11D48', 0.1),
                  },
                }}
              >
                Baby Girl
              </Button>
              <Button
                startIcon={<AutoAwesome />}
                onClick={() => { setActiveTab('twins'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: 50,
                  px: { xs: 2, sm: 3.5 },
                  py: 1.2,
                  bgcolor: activeTab === 'twins' ? '#8B5CF6' : 'transparent',
                  color: activeTab === 'twins' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'twins' ? '0 6px 18px rgba(139, 92, 246, 0.35)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'twins' ? '#7C3AED' : alpha('#8B5CF6', 0.1),
                  },
                }}
              >
                Twins
              </Button>
            </Paper>
          </Box>
        </Box>

        {/* Dynamic Interactive Stage */}
        <AnimatePresence mode="wait">
          {activeTab === 'boy' && (
            <motion.div
              key="boy-universe"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Grid container spacing={4} alignItems="center">
                {/* Boy Visual Avatar & Stats */}
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 5,
                      background: `linear-gradient(145deg, ${alpha('#0284C7', 0.12)}, ${alpha('#38BDF8', 0.05)})`,
                      border: `2px solid ${alpha('#0284C7', 0.25)}`,
                      position: 'relative',
                      textAlign: 'center',
                    }}
                  >
                    {/* Floating Avatar Illustration */}
                    <Box
                      className="float-slow"
                      sx={{
                        width: 140,
                        height: 140,
                        mx: 'auto',
                        mb: 2.5,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 36px rgba(2, 132, 199, 0.35)',
                        position: 'relative',
                      }}
                    >
                      <Typography sx={{ fontSize: 68, lineHeight: 1 }}>👶</Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          bgcolor: '#F59E0B',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)',
                        }}
                      >
                        <Typography sx={{ fontSize: 20 }}>👑</Typography>
                      </Box>
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#0284C7' }}>
                      Little Prince Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      Over 25,000 strong, noble, and contemporary names crafted for boys.
                    </Typography>

                    {/* Quick Stats Badges */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                      <Chip label="25,000+ Boy Names" size="small" sx={{ bgcolor: alpha('#0284C7', 0.12), color: '#0284C7', fontWeight: 700 }} />
                      <Chip label="Sanskrit & Global" size="small" sx={{ bgcolor: alpha('#0284C7', 0.12), color: '#0284C7', fontWeight: 700 }} />
                      <Chip label="Zodiac & Rashi" size="small" sx={{ bgcolor: alpha('#0284C7', 0.12), color: '#0284C7', fontWeight: 700 }} />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward />}
                        onClick={() => navigate('/boy-names')}
                        sx={{
                          py: 1.4,
                          background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
                        }}
                      >
                        Explore All Boy Names
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                {/* Boy Interactive Live Spotlight Card */}
                <Grid item xs={12} md={7}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4.5 },
                      borderRadius: 5,
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#0284C7', 0.3)}`,
                      boxShadow: '0 16px 40px rgba(2, 132, 199, 0.1)',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                        label={currentBoy.popularRank}
                        sx={{ bgcolor: alpha('#0284C7', 0.12), color: '#0284C7', fontWeight: 700 }}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={copiedName === currentBoy.name ? 'Copied!' : 'Copy Name'}>
                          <IconButton size="small" onClick={() => handleCopy(currentBoy.name)} sx={{ border: `1px solid ${custom.borderLight}` }}>
                            {copiedName === currentBoy.name ? <Check sx={{ fontSize: 18, color: 'success.main' }} /> : <Share sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(currentBoy.name)}
                          sx={{
                            border: `1px solid ${isFavorite(currentBoy.name) ? alpha('#E11D48', 0.3) : custom.borderLight}`,
                            bgcolor: isFavorite(currentBoy.name) ? alpha('#E11D48', 0.1) : 'transparent',
                            color: isFavorite(currentBoy.name) ? '#E11D48' : 'text.secondary',
                          }}
                        >
                          {isFavorite(currentBoy.name) ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
                        fontWeight: 700,
                        color: '#0284C7',
                        lineHeight: 1.1,
                        mb: 1.5,
                        fontFamily: '"Playfair Display", Georgia, serif',
                      }}
                    >
                      {currentBoy.name}
                    </Typography>

                    <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 3, fontWeight: 500 }}>
                      "{currentBoy.meaning}"
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0284C7', 0.05), border: `1px solid ${alpha('#0284C7', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Origin</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentBoy.origin}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0284C7', 0.05), border: `1px solid ${alpha('#0284C7', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Zodiac (Rashi)</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentBoy.zodiac}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0284C7', 0.05), border: `1px solid ${alpha('#0284C7', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Numerology</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Number {currentBoy.luckyNumber}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0284C7', 0.05), border: `1px solid ${alpha('#0284C7', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Gender</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0284C7' }}>Baby Boy</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Live Sample Switcher Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${custom.borderLight}`, flexWrap: 'wrap', gap: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Trending sample {((currentSampleIndex % BOY_NAMES_SAMPLE.length) + 1)} of {BOY_NAMES_SAMPLE.length}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {BOY_NAMES_SAMPLE.map((b, i) => (
                          <Chip
                            key={b.name}
                            label={b.name}
                            size="small"
                            clickable
                            onClick={() => setCurrentSampleIndex(i)}
                            sx={{
                              bgcolor: (currentSampleIndex % BOY_NAMES_SAMPLE.length) === i ? '#0284C7' : alpha('#0284C7', 0.08),
                              color: (currentSampleIndex % BOY_NAMES_SAMPLE.length) === i ? '#FFFFFF' : '#0284C7',
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {activeTab === 'girl' && (
            <motion.div
              key="girl-universe"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Grid container spacing={4} alignItems="center">
                {/* Girl Visual Avatar & Stats */}
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 5,
                      background: `linear-gradient(145deg, ${alpha('#E11D48', 0.12)}, ${alpha('#FB7185', 0.05)})`,
                      border: `2px solid ${alpha('#E11D48', 0.25)}`,
                      position: 'relative',
                      textAlign: 'center',
                    }}
                  >
                    {/* Floating Avatar Illustration */}
                    <Box
                      className="float-slow"
                      sx={{
                        width: 140,
                        height: 140,
                        mx: 'auto',
                        mb: 2.5,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 36px rgba(225, 29, 72, 0.35)',
                        position: 'relative',
                      }}
                    >
                      <Typography sx={{ fontSize: 68, lineHeight: 1 }}>👧</Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          bgcolor: '#EC4899',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(236, 72, 153, 0.4)',
                        }}
                      >
                        <Typography sx={{ fontSize: 20 }}>🌸</Typography>
                      </Box>
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#E11D48' }}>
                      Little Princess Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      Over 28,000 graceful, poetic, and timeless names crafted for girls.
                    </Typography>

                    {/* Quick Stats Badges */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                      <Chip label="28,000+ Girl Names" size="small" sx={{ bgcolor: alpha('#E11D48', 0.12), color: '#E11D48', fontWeight: 700 }} />
                      <Chip label="Goddess & Divine" size="small" sx={{ bgcolor: alpha('#E11D48', 0.12), color: '#E11D48', fontWeight: 700 }} />
                      <Chip label="Melodic & Short" size="small" sx={{ bgcolor: alpha('#E11D48', 0.12), color: '#E11D48', fontWeight: 700 }} />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward />}
                        onClick={() => navigate('/girl-names')}
                        sx={{
                          py: 1.4,
                          background: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',
                          boxShadow: '0 8px 24px rgba(225, 29, 72, 0.35)',
                        }}
                      >
                        Explore All Girl Names
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                {/* Girl Interactive Live Spotlight Card */}
                <Grid item xs={12} md={7}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4.5 },
                      borderRadius: 5,
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#E11D48', 0.3)}`,
                      boxShadow: '0 16px 40px rgba(225, 29, 72, 0.1)',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                        label={currentGirl.popularRank}
                        sx={{ bgcolor: alpha('#E11D48', 0.12), color: '#E11D48', fontWeight: 700 }}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={copiedName === currentGirl.name ? 'Copied!' : 'Copy Name'}>
                          <IconButton size="small" onClick={() => handleCopy(currentGirl.name)} sx={{ border: `1px solid ${custom.borderLight}` }}>
                            {copiedName === currentGirl.name ? <Check sx={{ fontSize: 18, color: 'success.main' }} /> : <Share sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(currentGirl.name)}
                          sx={{
                            border: `1px solid ${isFavorite(currentGirl.name) ? alpha('#E11D48', 0.3) : custom.borderLight}`,
                            bgcolor: isFavorite(currentGirl.name) ? alpha('#E11D48', 0.1) : 'transparent',
                            color: isFavorite(currentGirl.name) ? '#E11D48' : 'text.secondary',
                          }}
                        >
                          {isFavorite(currentGirl.name) ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
                        fontWeight: 700,
                        color: '#E11D48',
                        lineHeight: 1.1,
                        mb: 1.5,
                        fontFamily: '"Playfair Display", Georgia, serif',
                      }}
                    >
                      {currentGirl.name}
                    </Typography>

                    <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 3, fontWeight: 500 }}>
                      "{currentGirl.meaning}"
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#E11D48', 0.05), border: `1px solid ${alpha('#E11D48', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Origin</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentGirl.origin}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#E11D48', 0.05), border: `1px solid ${alpha('#E11D48', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Zodiac (Rashi)</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentGirl.zodiac}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#E11D48', 0.05), border: `1px solid ${alpha('#E11D48', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Numerology</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Number {currentGirl.luckyNumber}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#E11D48', 0.05), border: `1px solid ${alpha('#E11D48', 0.1)}`, borderRadius: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Gender</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#E11D48' }}>Baby Girl</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Live Sample Switcher Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${custom.borderLight}`, flexWrap: 'wrap', gap: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Trending sample {((currentSampleIndex % GIRL_NAMES_SAMPLE.length) + 1)} of {GIRL_NAMES_SAMPLE.length}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {GIRL_NAMES_SAMPLE.map((g, i) => (
                          <Chip
                            key={g.name}
                            label={g.name}
                            size="small"
                            clickable
                            onClick={() => setCurrentSampleIndex(i)}
                            sx={{
                              bgcolor: (currentSampleIndex % GIRL_NAMES_SAMPLE.length) === i ? '#E11D48' : alpha('#E11D48', 0.08),
                              color: (currentSampleIndex % GIRL_NAMES_SAMPLE.length) === i ? '#FFFFFF' : '#E11D48',
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {activeTab === 'twins' && (
            <motion.div
              key="twins-universe"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 5,
                  bgcolor: custom.cardWhite,
                  border: `2px solid ${alpha('#8B5CF6', 0.3)}`,
                  boxShadow: '0 16px 40px rgba(139, 92, 246, 0.12)',
                  textAlign: 'center',
                }}
              >
                <Chip
                  icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                  label={`Twin Bond: ${currentTwin.bond}`}
                  sx={{ bgcolor: alpha('#8B5CF6', 0.12), color: '#8B5CF6', fontWeight: 700, mb: 3 }}
                />

                <Grid container spacing={4} alignItems="center" justifyContent="center">
                  {/* Twin Boy */}
                  <Grid item xs={12} sm={5}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: alpha('#0284C7', 0.06),
                        border: `1.5px solid ${alpha('#0284C7', 0.3)}`,
                      }}
                    >
                      <Typography sx={{ fontSize: 40, mb: 1 }}>👦</Typography>
                      <Typography variant="h3" sx={{ color: '#0284C7', fontWeight: 700, mb: 1 }}>
                        {currentTwin.boy}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        "{currentTwin.boyMeaning}"
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleFavorite(currentTwin.boy)}
                        startIcon={isFavorite(currentTwin.boy) ? <Favorite sx={{ color: '#E11D48' }} /> : <FavoriteBorder />}
                        sx={{ mt: 2 }}
                      >
                        {isFavorite(currentTwin.boy) ? 'Saved' : 'Save Boy'}
                      </Button>
                    </Paper>
                  </Grid>

                  {/* Harmony Symbol */}
                  <Grid item xs={12} sm={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        borderRadius: '50%',
                        bgcolor: 'linear-gradient(135deg, #0284C7 0%, #E11D48 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        boxShadow: '0 8px 20px rgba(139, 92, 246, 0.35)',
                        background: 'linear-gradient(135deg, #0284C7, #E11D48)',
                      }}
                    >
                      &amp;
                    </Box>
                  </Grid>

                  {/* Twin Girl */}
                  <Grid item xs={12} sm={5}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: alpha('#E11D48', 0.06),
                        border: `1.5px solid ${alpha('#E11D48', 0.3)}`,
                      }}
                    >
                      <Typography sx={{ fontSize: 40, mb: 1 }}>👧</Typography>
                      <Typography variant="h3" sx={{ color: '#E11D48', fontWeight: 700, mb: 1 }}>
                        {currentTwin.girl}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        "{currentTwin.girlMeaning}"
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleFavorite(currentTwin.girl)}
                        startIcon={isFavorite(currentTwin.girl) ? <Favorite sx={{ color: '#E11D48' }} /> : <FavoriteBorder />}
                        sx={{ mt: 2 }}
                      >
                        {isFavorite(currentTwin.girl) ? 'Saved' : 'Save Girl'}
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Switcher Pairs */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4, flexWrap: 'wrap' }}>
                  {TWIN_PAIRS.map((p, i) => (
                    <Chip
                      key={p.bond}
                      label={`${p.boy} & ${p.girl}`}
                      clickable
                      onClick={() => setCurrentSampleIndex(i)}
                      sx={{
                        bgcolor: (currentSampleIndex % TWIN_PAIRS.length) === i ? '#8B5CF6' : alpha('#8B5CF6', 0.1),
                        color: (currentSampleIndex % TWIN_PAIRS.length) === i ? '#FFFFFF' : '#8B5CF6',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
