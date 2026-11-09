import React, { useState } from 'react';
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
  ArrowForward,
  Share,
  Check,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useFavorites } from './FavoritesProvider';
import {
  CrownPrinceIcon,
  PrincessTiaraIcon,
  TwinConstellationIcon,
  AudioChimeIcon,
  FiligreeHeartIcon,
  ModernSparkleIcon,
  AstrologyCompassIcon,
  VedicLotusIcon,
} from '../icons/CustomIcons';

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
  const [activeTab, setActiveTab] = useState('boy');
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [copiedName, setCopiedName] = useState(null);
  const [speakingName, setSpeakingName] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: activeTab === 'boy' ? ['#0F4C81', '#1A5A96', '#C59B27'] : ['#9F2241', '#B72B4E', '#C59B27'],
      });
    }
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const handleSpeak = (name) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.onend = () => setSpeakingName(null);
      setSpeakingName(name);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: '2px',
                bgcolor: alpha(custom.gold, 0.1),
                border: `1px solid ${alpha(custom.gold, 0.3)}`,
                color: isDark ? '#E5C158' : '#8F6E13',
                mb: 2,
              }}
            >
              <ModernSparkleIcon size={14} color={custom.gold} />
              <Typography variant="caption" sx={{ fontFamily: '"Cinzel", Georgia, serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                Curated Compendium • Royal Nomenclature
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Cinzel", "Playfair Display", Georgia, serif',
                fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.01em',
                mb: 1.5,
              }}
            >
              Discover The{' '}
              <Box
                component="span"
                sx={{
                  color: activeTab === 'boy' ? '#0F4C81' : activeTab === 'girl' ? '#9F2241' : '#7C3AED',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  transition: 'color 0.25s ease',
                }}
              >
                {activeTab === 'boy' ? 'Little Prince' : activeTab === 'girl' ? 'Little Princess' : 'Harmonious Twins'}
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 620, mx: 'auto', fontSize: '1.02rem', lineHeight: 1.7 }}>
              Switch between boy and girl realms. Verified Vedic etymology, planetary Nakshatra alignments, and melodic resonance.
            </Typography>
          </motion.div>

          {/* Luxury Segmented Selector with Classy Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'inline-flex',
                p: 0.6,
                borderRadius: '2px',
                bgcolor: isDark ? '#161311' : '#F6F1E7',
                border: `1px solid ${custom.borderLight}`,
              }}
            >
              <Button
                startIcon={<CrownPrinceIcon size={17} color={activeTab === 'boy' ? '#DFB956' : '#0F4C81'} />}
                onClick={() => { setActiveTab('boy'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: '2px',
                  px: { xs: 2.2, sm: 3.5 },
                  py: 1,
                  fontSize: '0.84rem',
                  letterSpacing: '0.04em',
                  bgcolor: activeTab === 'boy' ? '#0F4C81' : 'transparent',
                  color: activeTab === 'boy' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'boy' ? '0 2px 8px rgba(15, 76, 129, 0.35)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'boy' ? '#0A3156' : alpha('#0F4C81', 0.08),
                  },
                }}
              >
                Little Prince
              </Button>
              <Button
                startIcon={<PrincessTiaraIcon size={17} color={activeTab === 'girl' ? '#F5D77F' : '#9F2241'} />}
                onClick={() => { setActiveTab('girl'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: '2px',
                  px: { xs: 2.2, sm: 3.5 },
                  py: 1,
                  fontSize: '0.84rem',
                  letterSpacing: '0.04em',
                  bgcolor: activeTab === 'girl' ? '#9F2241' : 'transparent',
                  color: activeTab === 'girl' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'girl' ? '0 2px 8px rgba(159, 34, 65, 0.35)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'girl' ? '#78152D' : alpha('#9F2241', 0.08),
                  },
                }}
              >
                Little Princess
              </Button>
              <Button
                startIcon={<TwinConstellationIcon size={17} color={activeTab === 'twins' ? '#F5D77F' : '#7C3AED'} />}
                onClick={() => { setActiveTab('twins'); setCurrentSampleIndex(0); }}
                sx={{
                  borderRadius: '2px',
                  px: { xs: 2.2, sm: 3.5 },
                  py: 1,
                  fontSize: '0.84rem',
                  letterSpacing: '0.04em',
                  bgcolor: activeTab === 'twins' ? '#7C3AED' : 'transparent',
                  color: activeTab === 'twins' ? '#FFFFFF' : 'text.primary',
                  boxShadow: activeTab === 'twins' ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'none',
                  '&:hover': {
                    bgcolor: activeTab === 'twins' ? '#6D28D9' : alpha('#7C3AED', 0.08),
                  },
                }}
              >
                Twin Harmony
              </Button>
            </Paper>
          </Box>
        </Box>

        {/* Dynamic Interactive Stage */}
        <AnimatePresence mode="wait">
          {activeTab === 'boy' && (
            <motion.div
              key="boy-universe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <Grid container spacing={3.5} alignItems="center">
                {/* Boy Visual Crest & Stats */}
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: '2px',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#0F4C81', 0.35)}`,
                      position: 'relative',
                      textAlign: 'center',
                      boxShadow: '0 4px 18px rgba(15, 76, 129, 0.06)',
                    }}
                  >
                    {/* Regal Prince Monogram Frame */}
                    <Box
                      sx={{
                        width: 110,
                        height: 110,
                        mx: 'auto',
                        mb: 2.5,
                        borderRadius: '2px',
                        border: '2px solid #C59B27',
                        p: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha('#0F4C81', 0.06),
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          bgcolor: '#0F4C81',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CrownPrinceIcon size={48} color="#DFB956" />
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          bgcolor: '#C59B27',
                          color: '#FFFFFF',
                          px: 1.2,
                          py: 0.2,
                          fontSize: '0.62rem',
                          fontFamily: '"Cinzel", Georgia, serif',
                          fontWeight: 800,
                          letterSpacing: '0.14em',
                          borderRadius: '1px',
                        }}
                      >
                        PRINCE
                      </Box>
                    </Box>

                    <Typography variant="h4" sx={{ fontFamily: '"Cinzel", Georgia, serif', fontWeight: 700, mb: 1, color: '#0F4C81', fontSize: '1.45rem' }}>
                      The Prince Compendium
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.86rem', lineHeight: 1.6 }}>
                      Over 25,000 noble, enduring, and modern names imbued with courage, wisdom, and royal dignity.
                    </Typography>

                    {/* Quick Badges */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.8, flexWrap: 'wrap' }}>
                      <Chip label="25,000+ Boy Entries" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#0F4C81', 0.08), color: '#0F4C81', fontWeight: 700 }} />
                      <Chip label="Vedic Heritage" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#0F4C81', 0.08), color: '#0F4C81', fontWeight: 700 }} />
                      <Chip label="Nakshatra Syllables" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#0F4C81', 0.08), color: '#0F4C81', fontWeight: 700 }} />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                        onClick={() => navigate('/boy-names')}
                        sx={{
                          py: 1.2,
                          borderRadius: '2px',
                          background: 'linear-gradient(135deg, #0F4C81 0%, #0A3156 100%)',
                          boxShadow: '0 2px 8px rgba(15, 76, 129, 0.3)',
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
                      p: { xs: 3, md: 4 },
                      borderRadius: '2px',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#0F4C81', 0.35)}`,
                      boxShadow: '0 4px 20px rgba(15, 76, 129, 0.06)',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        icon={<ModernSparkleIcon size={12} color="#0F4C81" />}
                        label={currentBoy.popularRank}
                        sx={{ borderRadius: '2px', bgcolor: alpha('#0F4C81', 0.08), color: '#0F4C81', fontWeight: 700 }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.6 }}>
                        <Tooltip title={speakingName === currentBoy.name ? 'Playing...' : `Listen: pronounce "${currentBoy.name}"`}>
                          <IconButton size="small" onClick={() => handleSpeak(currentBoy.name)} sx={{ borderRadius: '2px', border: `1px solid ${custom.borderLight}` }}>
                            <AudioChimeIcon size={16} color={speakingName === currentBoy.name ? '#0F4C81' : custom.gold} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={copiedName === currentBoy.name ? 'Copied!' : 'Copy Name'}>
                          <IconButton size="small" onClick={() => handleCopy(currentBoy.name)} sx={{ borderRadius: '2px', border: `1px solid ${custom.borderLight}` }}>
                            {copiedName === currentBoy.name ? <Check sx={{ fontSize: 16, color: 'success.main' }} /> : <Share sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(currentBoy.name)}
                          sx={{
                            borderRadius: '2px',
                            border: `1px solid ${isFavorite(currentBoy.name) ? alpha('#9F2241', 0.4) : custom.borderLight}`,
                            bgcolor: isFavorite(currentBoy.name) ? alpha('#9F2241', 0.08) : 'transparent',
                          }}
                        >
                          <FiligreeHeartIcon size={18} color="#9F2241" filled={Boolean(isFavorite(currentBoy.name))} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                        fontWeight: 700,
                        color: '#0F4C81',
                        lineHeight: 1.15,
                        mb: 1,
                        fontFamily: '"Playfair Display", "Cinzel", Georgia, serif',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {currentBoy.name}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        mb: 3,
                        fontWeight: 500,
                        fontSize: '1.15rem',
                      }}
                    >
                      "{currentBoy.meaning}"
                    </Typography>

                    <Grid container spacing={1.5} sx={{ mb: 3 }}>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0F4C81', 0.04), border: `1px solid ${alpha('#0F4C81', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Origin</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentBoy.origin}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0F4C81', 0.04), border: `1px solid ${alpha('#0F4C81', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Zodiac (Rashi)</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentBoy.zodiac}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0F4C81', 0.04), border: `1px solid ${alpha('#0F4C81', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Numerology</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Number {currentBoy.luckyNumber}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#0F4C81', 0.04), border: `1px solid ${alpha('#0F4C81', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Category</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F4C81' }}>Baby Boy</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Live Sample Switcher Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${custom.borderLight}`, flexWrap: 'wrap', gap: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        Curated Sample {((currentSampleIndex % BOY_NAMES_SAMPLE.length) + 1)} of {BOY_NAMES_SAMPLE.length}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.6 }}>
                        {BOY_NAMES_SAMPLE.map((b, i) => (
                          <Chip
                            key={b.name}
                            label={b.name}
                            size="small"
                            clickable
                            onClick={() => setCurrentSampleIndex(i)}
                            sx={{
                              borderRadius: '2px',
                              bgcolor: (currentSampleIndex % BOY_NAMES_SAMPLE.length) === i ? '#0F4C81' : alpha('#0F4C81', 0.06),
                              color: (currentSampleIndex % BOY_NAMES_SAMPLE.length) === i ? '#FFFFFF' : '#0F4C81',
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <Grid container spacing={3.5} alignItems="center">
                {/* Girl Visual Crest & Stats */}
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: '2px',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#9F2241', 0.35)}`,
                      position: 'relative',
                      textAlign: 'center',
                      boxShadow: '0 4px 18px rgba(159, 34, 65, 0.06)',
                    }}
                  >
                    {/* Regal Princess Monogram Frame */}
                    <Box
                      sx={{
                        width: 110,
                        height: 110,
                        mx: 'auto',
                        mb: 2.5,
                        borderRadius: '2px',
                        border: '2px solid #C59B27',
                        p: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha('#9F2241', 0.06),
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          bgcolor: '#9F2241',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PrincessTiaraIcon size={48} color="#F5D77F" />
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          bgcolor: '#C59B27',
                          color: '#FFFFFF',
                          px: 1.2,
                          py: 0.2,
                          fontSize: '0.62rem',
                          fontFamily: '"Cinzel", Georgia, serif',
                          fontWeight: 800,
                          letterSpacing: '0.14em',
                          borderRadius: '1px',
                        }}
                      >
                        PRINCESS
                      </Box>
                    </Box>

                    <Typography variant="h4" sx={{ fontFamily: '"Cinzel", Georgia, serif', fontWeight: 700, mb: 1, color: '#9F2241', fontSize: '1.45rem' }}>
                      The Princess Compendium
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.86rem', lineHeight: 1.6 }}>
                      Over 28,000 graceful, lyrical, and timeless names celebrating goddess virtues, celestial lights, and elegance.
                    </Typography>

                    {/* Quick Badges */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.8, flexWrap: 'wrap' }}>
                      <Chip label="28,000+ Girl Entries" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#9F2241', 0.08), color: '#9F2241', fontWeight: 700 }} />
                      <Chip label="Goddess Lakshmi Roots" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#9F2241', 0.08), color: '#9F2241', fontWeight: 700 }} />
                      <Chip label="Lyrical & Celestial" size="small" sx={{ borderRadius: '2px', bgcolor: alpha('#9F2241', 0.08), color: '#9F2241', fontWeight: 700 }} />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                        onClick={() => navigate('/girl-names')}
                        sx={{
                          py: 1.2,
                          borderRadius: '2px',
                          background: 'linear-gradient(135deg, #9F2241 0%, #78152D 100%)',
                          boxShadow: '0 2px 8px rgba(159, 34, 65, 0.3)',
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
                      p: { xs: 3, md: 4 },
                      borderRadius: '2px',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${alpha('#9F2241', 0.35)}`,
                      boxShadow: '0 4px 20px rgba(159, 34, 65, 0.06)',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        icon={<ModernSparkleIcon size={12} color="#9F2241" />}
                        label={currentGirl.popularRank}
                        sx={{ borderRadius: '2px', bgcolor: alpha('#9F2241', 0.08), color: '#9F2241', fontWeight: 700 }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.6 }}>
                        <Tooltip title={speakingName === currentGirl.name ? 'Playing...' : `Listen: pronounce "${currentGirl.name}"`}>
                          <IconButton size="small" onClick={() => handleSpeak(currentGirl.name)} sx={{ borderRadius: '2px', border: `1px solid ${custom.borderLight}` }}>
                            <AudioChimeIcon size={16} color={speakingName === currentGirl.name ? '#9F2241' : custom.gold} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={copiedName === currentGirl.name ? 'Copied!' : 'Copy Name'}>
                          <IconButton size="small" onClick={() => handleCopy(currentGirl.name)} sx={{ borderRadius: '2px', border: `1px solid ${custom.borderLight}` }}>
                            {copiedName === currentGirl.name ? <Check sx={{ fontSize: 16, color: 'success.main' }} /> : <Share sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(currentGirl.name)}
                          sx={{
                            borderRadius: '2px',
                            border: `1px solid ${isFavorite(currentGirl.name) ? alpha('#9F2241', 0.4) : custom.borderLight}`,
                            bgcolor: isFavorite(currentGirl.name) ? alpha('#9F2241', 0.08) : 'transparent',
                          }}
                        >
                          <FiligreeHeartIcon size={18} color="#9F2241" filled={Boolean(isFavorite(currentGirl.name))} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                        fontWeight: 700,
                        color: '#9F2241',
                        lineHeight: 1.15,
                        mb: 1,
                        fontFamily: '"Playfair Display", "Cinzel", Georgia, serif',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {currentGirl.name}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        mb: 3,
                        fontWeight: 500,
                        fontSize: '1.15rem',
                      }}
                    >
                      "{currentGirl.meaning}"
                    </Typography>

                    <Grid container spacing={1.5} sx={{ mb: 3 }}>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#9F2241', 0.04), border: `1px solid ${alpha('#9F2241', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Origin</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentGirl.origin}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#9F2241', 0.04), border: `1px solid ${alpha('#9F2241', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Zodiac (Rashi)</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{currentGirl.zodiac}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#9F2241', 0.04), border: `1px solid ${alpha('#9F2241', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Numerology</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Number {currentGirl.luckyNumber}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: alpha('#9F2241', 0.04), border: `1px solid ${alpha('#9F2241', 0.15)}`, borderRadius: '2px' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Category</Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#9F2241' }}>Baby Girl</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Live Sample Switcher Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${custom.borderLight}`, flexWrap: 'wrap', gap: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        Curated Sample {((currentSampleIndex % GIRL_NAMES_SAMPLE.length) + 1)} of {GIRL_NAMES_SAMPLE.length}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.6 }}>
                        {GIRL_NAMES_SAMPLE.map((g, i) => (
                          <Chip
                            key={g.name}
                            label={g.name}
                            size="small"
                            clickable
                            onClick={() => setCurrentSampleIndex(i)}
                            sx={{
                              borderRadius: '2px',
                              bgcolor: (currentSampleIndex % GIRL_NAMES_SAMPLE.length) === i ? '#9F2241' : alpha('#9F2241', 0.06),
                              color: (currentSampleIndex % GIRL_NAMES_SAMPLE.length) === i ? '#FFFFFF' : '#9F2241',
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4.5 },
                  borderRadius: '2px',
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${alpha('#7C3AED', 0.35)}`,
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.06)',
                  textAlign: 'center',
                }}
              >
                <Chip
                  icon={<TwinConstellationIcon size={13} color="#7C3AED" />}
                  label={`Harmonious Bond: ${currentTwin.bond}`}
                  sx={{ borderRadius: '2px', bgcolor: alpha('#7C3AED', 0.08), color: '#7C3AED', fontWeight: 700, mb: 3 }}
                />

                <Grid container spacing={3} alignItems="center" justifyContent="center">
                  {/* Twin Boy */}
                  <Grid item xs={12} sm={5}>
                    <Paper
                      sx={{
                        p: 2.8,
                        borderRadius: '2px',
                        bgcolor: alpha('#0F4C81', 0.03),
                        border: `1px solid ${alpha('#0F4C81', 0.25)}`,
                      }}
                    >
                      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                        <CrownPrinceIcon size={32} color="#0F4C81" />
                      </Box>
                      <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#0F4C81', fontWeight: 700, mb: 0.8, fontSize: '1.75rem' }}>
                        {currentTwin.boy}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '1.05rem' }}>
                        "{currentTwin.boyMeaning}"
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleFavorite(currentTwin.boy)}
                        startIcon={<FiligreeHeartIcon size={14} color="#9F2241" filled={Boolean(isFavorite(currentTwin.boy))} />}
                        sx={{ borderRadius: '2px', fontSize: '0.78rem' }}
                      >
                        {isFavorite(currentTwin.boy) ? 'Shortlisted' : 'Save Boy'}
                      </Button>
                    </Paper>
                  </Grid>

                  {/* Harmony Symbol */}
                  <Grid item xs={12} sm={2}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        mx: 'auto',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '1rem',
                        boxShadow: '0 2px 10px rgba(124, 58, 237, 0.25)',
                        background: 'linear-gradient(135deg, #0F4C81, #9F2241)',
                      }}
                    >
                      &amp;
                    </Box>
                  </Grid>

                  {/* Twin Girl */}
                  <Grid item xs={12} sm={5}>
                    <Paper
                      sx={{
                        p: 2.8,
                        borderRadius: '2px',
                        bgcolor: alpha('#9F2241', 0.03),
                        border: `1px solid ${alpha('#9F2241', 0.25)}`,
                      }}
                    >
                      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                        <PrincessTiaraIcon size={32} color="#9F2241" />
                      </Box>
                      <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#9F2241', fontWeight: 700, mb: 0.8, fontSize: '1.75rem' }}>
                        {currentTwin.girl}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '1.05rem' }}>
                        "{currentTwin.girlMeaning}"
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleFavorite(currentTwin.girl)}
                        startIcon={<FiligreeHeartIcon size={14} color="#9F2241" filled={Boolean(isFavorite(currentTwin.girl))} />}
                        sx={{ borderRadius: '2px', fontSize: '0.78rem' }}
                      >
                        {isFavorite(currentTwin.girl) ? 'Shortlisted' : 'Save Girl'}
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Switcher Pairs */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.6, mt: 3, flexWrap: 'wrap' }}>
                  {TWIN_PAIRS.map((p, i) => (
                    <Chip
                      key={p.bond}
                      label={`${p.boy} & ${p.girl}`}
                      clickable
                      onClick={() => setCurrentSampleIndex(i)}
                      sx={{
                        borderRadius: '2px',
                        bgcolor: (currentSampleIndex % TWIN_PAIRS.length) === i ? '#7C3AED' : alpha('#7C3AED', 0.06),
                        color: (currentSampleIndex % TWIN_PAIRS.length) === i ? '#FFFFFF' : '#7C3AED',
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
