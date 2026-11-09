import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  alpha,
  useTheme,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  ArrowForward,
  ExpandMore,
  Check,
  Share,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { namesDatabase } from '../data/data';
import { blogPosts } from '../data/blogsData';
import { useFavorites } from './ui/FavoritesProvider';
import BoyGirlShowcase from './ui/BoyGirlShowcase';
import SEO from './SEO';
import {
  BrandCrestIcon,
  CrownPrinceIcon,
  PrincessTiaraIcon,
  VedicLotusIcon,
  ModernSparkleIcon,
  AstrologyCompassIcon,
  FeatherQuillIcon,
  VerifiedShieldIcon,
  AudioChimeIcon,
  FiligreeHeartIcon,
} from './icons/CustomIcons';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

const SPOTLIGHT_NAMES = [
  {
    name: 'Vihaan',
    phonetic: 'Vee - haan',
    gender: 'Boy',
    meaning: 'First ray of the auspicious morning dawn; dawn of hope',
    origin: 'Sanskrit',
    nakshatra: 'Rohini',
    zodiac: 'Taurus',
    luckyNumber: 1,
    virtue: 'Radiant Dawn',
  },
  {
    name: 'Saanvi',
    phonetic: 'Sahn - vee',
    gender: 'Girl',
    meaning: 'Goddess Lakshmi; divine abundance, sacred beauty & fortune',
    origin: 'Sanskrit',
    nakshatra: 'Ashwini',
    zodiac: 'Aries',
    luckyNumber: 6,
    virtue: 'Auspicious Grace',
  },
  {
    name: 'Aarav',
    phonetic: 'Ah - ruhv',
    gender: 'Boy',
    meaning: 'Peaceful, calm, and imbued with serene contemplative wisdom',
    origin: 'Sanskrit',
    nakshatra: 'Swati',
    zodiac: 'Libra',
    luckyNumber: 7,
    virtue: 'Inner Tranquility',
  },
  {
    name: 'Kiara',
    phonetic: 'Kee - ah - rah',
    gender: 'Girl',
    meaning: 'Luminous, pure, bright and cherished like a sparkling jewel',
    origin: 'Modern',
    nakshatra: 'Magha',
    zodiac: 'Leo',
    luckyNumber: 7,
    virtue: 'Celestial Light',
  },
  {
    name: 'Advait',
    phonetic: 'Uhd - vayt',
    gender: 'Boy',
    meaning: 'Unique, non-dual; cosmic unity beyond comparison',
    origin: 'Sanskrit',
    nakshatra: 'Revati',
    zodiac: 'Pisces',
    luckyNumber: 9,
    virtue: 'Divine Oneness',
  },
  {
    name: 'Diya',
    phonetic: 'Dee - yah',
    gender: 'Girl',
    meaning: 'The sacred radiant lamp that dispels darkness and brings joy',
    origin: 'Indian',
    nakshatra: 'Uttara Phalguni',
    zodiac: 'Leo',
    luckyNumber: 2,
    virtue: 'Eternal Light',
  },
];

const FAQ_LIST = [
  {
    q: 'How do I choose the best baby name for my newborn?',
    a: 'Start by deciding what values resonate with your family: cultural heritage, modern brevity, astrological alignment (Rashi/Nakshatra), or unique spiritual meanings. Test candidate names aloud with your family name, check monograms and initials, and keep a shortlist of 2-3 favorites to decide on delivery day.',
  },
  {
    q: 'What are the top trending baby boy and girl names for 2026?',
    a: 'For baby boys, top trending names include Vihaan (Morning dawn), Aarav (Peaceful), Leo (Courageous), Advait (Unique), and Noah (Rest). For baby girls, popular picks include Saanvi (Goddess Lakshmi), Diya (Light), Myra (Sweet wonder), Aria (Melody), and Kiara (Bright gem).',
  },
  {
    q: 'How does Vedic Astrology (Rashi & Nakshatra) naming work?',
    a: 'In Vedic tradition, the Moon’s exact position at the time of birth determines the child’s Moon sign (Rashi) and lunar mansion (Nakshatra). Each Nakshatra quarter has specific auspicious starting sounds (Aksharas), believed to bring harmony and positive energy to the child’s life.',
  },
  {
    q: 'Can I shortlist and share my favorite names with my partner?',
    a: 'Yes! Simply click the heart icon on any baby name card to add it to your Favorites. Your favorites are saved automatically and can be reviewed, organized, or shared via WhatsApp with your partner and family anytime.',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterLetter, setFilterLetter] = useState('All');
  const [filterStyle, setFilterStyle] = useState('all');
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [isSpeakingSpotlight, setIsSpeakingSpotlight] = useState(false);
  const [spotlightCopied, setSpotlightCopied] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const currentSpotlight = SPOTLIGHT_NAMES[spotlightIdx % SPOTLIGHT_NAMES.length];
  const isSpotlightGirl = currentSpotlight.gender === 'Girl';
  const spotlightColor = isSpotlightGirl ? '#9F2241' : '#0F4C81';

  const handleNextSpotlight = () => {
    setSpotlightIdx((prev) => (prev + 1) % SPOTLIGHT_NAMES.length);
  };

  const handleSpeakSpotlight = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSpotlight.name);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeakingSpotlight(false);
      setIsSpeakingSpotlight(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopySpotlight = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentSpotlight.name);
    setSpotlightCopied(true);
    setTimeout(() => setSpotlightCopied(false), 2000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boy-names?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { num: 'I', name: 'Royal Boy Names', desc: 'Noble, valorous & enduring titles for your prince', icon: <CrownPrinceIcon size={24} color="#0F4C81" />, path: '/boy-names', count: '25,000+', color: '#0F4C81', bg: alpha('#0F4C81', 0.06) },
    { num: 'II', name: 'Graceful Girl Names', desc: 'Lyrical, poetic & goddess Lakshmi virtues', icon: <PrincessTiaraIcon size={24} color="#9F2241" />, path: '/girl-names', count: '28,000+', color: '#9F2241', bg: alpha('#9F2241', 0.06) },
    { num: 'III', name: 'Vedic & Sanskrit', desc: 'Ancient sacred scriptures & philosophical roots', icon: <VedicLotusIcon size={24} color="#B65A3F" />, path: '/indian-names', count: '18,000+', color: '#B65A3F', bg: alpha('#B65A3F', 0.06) },
    { num: 'IV', name: 'Modern & Contemporary', desc: 'Crisp 2-syllable internationally fluent names', icon: <ModernSparkleIcon size={24} color="#059669" />, path: '/modern-names', count: '10,000+', color: '#059669', bg: alpha('#059669', 0.06) },
    { num: 'V', name: 'Zodiac & Nakshatras', desc: 'Auspicious birth syllables aligned to 27 Moon mansions', icon: <AstrologyCompassIcon size={24} color="#C59B27" />, path: '/zodiac-names', count: '12,000+', color: '#8F6E13', bg: alpha('#C59B27', 0.08) },
    { num: 'VI', name: 'Editorial Compendium', desc: 'Naming guides, pronunciation rules & forecasts', icon: <FeatherQuillIcon size={24} color="#B65A3F" />, path: '/blogs', count: 'Curated', color: '#B65A3F', bg: alpha('#B65A3F', 0.06) },
  ];

  // Interactive Live Name Finder list
  const allFlattenedNames = useMemo(() => {
    const list = [];
    const sourceCategories = ['Indian', 'Modern', 'Aries', 'Leo', 'Libra'];
    sourceCategories.forEach((catKey) => {
      const items = namesDatabase[catKey] || [];
      items.forEach((item) => {
        if (item.boy) {
          list.push({ name: item.boy, meaning: item.boy_meaning, gender: 'Boy', origin: catKey, zodiac: item.zodiac || 'Leo' });
        }
        if (item.girl) {
          list.push({ name: item.girl, meaning: item.girl_meaning, gender: 'Girl', origin: catKey, zodiac: item.zodiac || 'Libra' });
        }
      });
    });
    return list;
  }, []);

  const wizardResults = useMemo(() => {
    return allFlattenedNames.filter((item) => {
      if (filterGender !== 'all' && item.gender !== filterGender) return false;
      if (filterLetter !== 'All' && !item.name.toUpperCase().startsWith(filterLetter)) return false;
      if (filterStyle !== 'all') {
        if (filterStyle === 'Indian' && item.origin !== 'Indian') return false;
        if (filterStyle === 'Modern' && item.origin !== 'Modern') return false;
        if (filterStyle === 'Zodiac' && !['Aries', 'Leo', 'Libra'].includes(item.origin)) return false;
      }
      return true;
    }).slice(0, 6);
  }, [allFlattenedNames, filterGender, filterLetter, filterStyle]);

  const handleToggleFavorite = (name) => {
    toggleFavorite(name);
    if (!isFavorite(name)) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#B65A3F', '#C59B27', '#0F4C81', '#9F2241'],
      });
    }
  };

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sweetbabynames.com/#website',
        url: 'https://sweetbabynames.com/',
        name: 'Sweet Baby Names',
        description: 'Discover 50,000+ beautiful boy and girl baby names with meanings, origins, and zodiac signs.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sweetbabynames.com/boy-names?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_LIST.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <SEO
        title="Sweet Baby Names 2026 | 50,000+ Unique Boy & Girl Names with Meanings, Zodiac & Origin"
        description="Find the perfect name for your little one. Explore 50,000+ cute, modern, Sanskrit, and astrological baby names for boys and girls with meanings, origins, and shortlist."
        keywords="baby names, boy names, girl names, indian baby names, modern baby names, sanskrit baby names, zodiac baby names, baby name meanings, twin names"
        canonical="https://sweetbabynames.com/"
        schema={homepageSchema}
      />

      {/* MASTERPIECE HERO SECTION */}
      <Box
        sx={{
          pt: { xs: 5, md: 8 },
          pb: { xs: 6, md: 9 },
          background: `radial-gradient(ellipse 70% 50% at 50% -10%, ${alpha(custom.gold, 0.12)}, transparent), radial-gradient(ellipse 60% 40% at 85% 30%, ${alpha(custom.coral, 0.08)}, transparent), linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left Column: Grand Editorial Header & Search */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {/* Atelier Tag */}
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.8,
                      py: 0.6,
                      borderRadius: '2px',
                      bgcolor: alpha(custom.gold, 0.1),
                      border: `1px solid ${alpha(custom.gold, 0.35)}`,
                      mb: 2.2,
                    }}
                  >
                    <BrandCrestIcon size={18} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Cinzel", Georgia, serif',
                        fontWeight: 800,
                        color: isDark ? '#E5C158' : '#8F6E13',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        fontSize: '0.72rem',
                      }}
                    >
                      THE 2026 NOMENCLATURE ATELIER • 50,000+ NAMES
                    </Typography>
                  </Box>
                </motion.div>

                {/* Grand Headline */}
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3.4rem', md: '4.2rem' },
                      fontWeight: 800,
                      lineHeight: 1.12,
                      mb: 2,
                      fontFamily: '"Cinzel", "Playfair Display", Georgia, serif',
                      letterSpacing: '-0.015em',
                      color: 'text.primary',
                    }}
                  >
                    A Sacred Name for Your{' '}
                    <Box
                      component="span"
                      sx={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${custom.coral} 0%, #8E3E28 50%, ${custom.gold} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                      }}
                    >
                      Little Miracle
                    </Box>
                  </Typography>
                </motion.div>

                {/* Editorial Subtitle in Cormorant Garamond */}
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 3.5,
                      fontSize: { xs: '1.05rem', md: '1.18rem' },
                      lineHeight: 1.65,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      maxWidth: 580,
                    }}
                  >
                    Steeped in ancient Vedic heritage, celestial Nakshatra resonances, and contemporary global grace. Curated for expecting parents across the world.
                  </Typography>
                </motion.div>

                {/* Luxury Search Console */}
                <motion.div variants={fadeInUp}>
                  <Box
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
                      display: 'flex',
                      maxWidth: 560,
                      mb: 2.2,
                      gap: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Search by name, meaning, or origin (e.g. Aarav, Light, Sanskrit)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ color: custom.gold, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}>
                              <Close sx={{ fontSize: 17 }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: custom.cardWhite,
                          borderRadius: '2px',
                          height: 52,
                          fontSize: '0.94rem',
                          border: `1px solid ${custom.borderLight}`,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                          '&:hover': {
                            borderColor: custom.gold,
                          },
                          '&.Mui-focused': {
                            borderColor: custom.gold,
                            boxShadow: '0 0 0 2px rgba(197, 155, 39, 0.25)',
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        px: 3.5,
                        height: 52,
                        fontSize: '0.88rem',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                        borderRadius: '2px',
                        fontWeight: 700,
                      }}
                    >
                      Find Names
                    </Button>
                  </Box>
                </motion.div>

                {/* Trending Quick Pills */}
                <motion.div variants={fadeInUp}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 700,
                        fontSize: '0.74rem',
                        letterSpacing: '0.06em',
                        color: custom.gold,
                        textTransform: 'uppercase',
                        mr: 0.5,
                      }}
                    >
                      Trending:
                    </Typography>
                    {['Aarav', 'Saanvi', 'Vihaan', 'Diya', 'Leo', 'Ananya', 'Kiara', 'Advait'].map((tr) => (
                      <Chip
                        key={tr}
                        label={tr}
                        size="small"
                        clickable
                        onClick={() => navigate(`/boy-names?q=${tr}`)}
                        sx={{
                          borderRadius: '2px',
                          height: 22,
                          fontSize: '0.72rem',
                          bgcolor: alpha(custom.coral, 0.05),
                          color: 'text.secondary',
                          border: `1px solid ${custom.borderLight}`,
                          '&:hover': {
                            bgcolor: alpha(custom.coral, 0.12),
                            color: custom.coral,
                            borderColor: custom.coral,
                          },
                          transition: 'all 0.18s ease',
                        }}
                      />
                    ))}
                  </Box>
                </motion.div>

                {/* Star Rating & Social Proof */}
                <motion.div variants={fadeInUp}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', color: '#D4AF37', fontSize: '1rem', letterSpacing: '0.1em' }}>
                      ★★★★★
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 800, color: 'text.primary' }}>4.98 / 5.0</Box> • Trusted by 250,000+ Expecting Parents Worldwide
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right Column: Interactive Luxury Spotlight Card */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  className="luxury-corner-tick luxury-gold-aura"
                  sx={{
                    p: { xs: 3, sm: 3.8 },
                    bgcolor: custom.cardWhite,
                    borderRadius: '2px', // Sharp architectural lines
                    border: `1.5px solid ${alpha(custom.gold, 0.4)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: isSpotlightGirl
                        ? 'linear-gradient(90deg, #9F2241 0%, #C59B27 100%)'
                        : 'linear-gradient(90deg, #0F4C81 0%, #C59B27 100%)',
                    },
                  }}
                >
                  {/* Spotlight Header Row */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ModernSparkleIcon size={14} color={custom.gold} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: '"Cinzel", Georgia, serif',
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          fontSize: '0.68rem',
                          color: custom.gold,
                        }}
                      >
                        ATELIER SPOTLIGHT OF THE MOMENT
                      </Typography>
                    </Box>

                    {/* Shuffle / Next Button */}
                    <Tooltip title="Surprise Me: Roll Another Spotlight Name">
                      <Button
                        size="small"
                        onClick={handleNextSpotlight}
                        sx={{
                          py: 0.3,
                          px: 1,
                          fontSize: '0.68rem',
                          letterSpacing: '0.06em',
                          fontWeight: 700,
                          borderRadius: '2px',
                          color: custom.gold,
                          border: `1px solid ${alpha(custom.gold, 0.3)}`,
                          '&:hover': {
                            bgcolor: alpha(custom.gold, 0.08),
                            borderColor: custom.gold,
                          },
                        }}
                      >
                        ROLL NEXT ✦
                      </Button>
                    </Tooltip>
                  </Box>

                  {/* Name, Phonetic & Audio */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontFamily: '"Cinzel", "Playfair Display", Georgia, serif',
                          fontWeight: 700,
                          fontSize: { xs: '2.2rem', sm: '2.8rem' },
                          color: spotlightColor,
                          letterSpacing: '-0.01em',
                          lineHeight: 1.1,
                        }}
                      >
                        {currentSpotlight.name}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        {/* Audio Pronunciation */}
                        <Tooltip title={isSpeakingSpotlight ? 'Playing...' : `Listen: pronounce "${currentSpotlight.name}"`}>
                          <IconButton
                            size="small"
                            onClick={handleSpeakSpotlight}
                            sx={{
                              p: 0.8,
                              borderRadius: '2px',
                              border: `1px solid ${custom.borderLight}`,
                              bgcolor: isSpeakingSpotlight ? alpha(custom.gold, 0.15) : 'transparent',
                              '&:hover': { bgcolor: alpha(custom.gold, 0.1) },
                            }}
                          >
                            {isSpeakingSpotlight ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', height: 16 }}>
                                <span className="soundwave-bar" />
                                <span className="soundwave-bar" />
                                <span className="soundwave-bar" />
                                <span className="soundwave-bar" />
                              </Box>
                            ) : (
                              <AudioChimeIcon size={18} color={custom.gold} />
                            )}
                          </IconButton>
                        </Tooltip>

                        {/* Copy Link */}
                        <Tooltip title={spotlightCopied ? 'Copied!' : 'Copy Name'}>
                          <IconButton
                            size="small"
                            onClick={handleCopySpotlight}
                            sx={{
                              p: 0.8,
                              borderRadius: '2px',
                              border: `1px solid ${custom.borderLight}`,
                            }}
                          >
                            {spotlightCopied ? <Check sx={{ fontSize: 17, color: 'success.main' }} /> : <Share sx={{ fontSize: 16 }} />}
                          </IconButton>
                        </Tooltip>

                        {/* Shortlist Heart */}
                        <Tooltip title={isFavorite(currentSpotlight.name) ? 'Remove Shortlist' : 'Add to Shortlist'}>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleFavorite(currentSpotlight.name)}
                            sx={{
                              p: 0.8,
                              borderRadius: '2px',
                              border: `1px solid ${isFavorite(currentSpotlight.name) ? alpha('#9F2241', 0.4) : custom.borderLight}`,
                              bgcolor: isFavorite(currentSpotlight.name) ? alpha('#9F2241', 0.08) : 'transparent',
                            }}
                          >
                            <FiligreeHeartIcon size={18} color="#9F2241" filled={Boolean(isFavorite(currentSpotlight.name))} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Phonetic guide */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        color: 'text.secondary',
                        fontSize: '0.8rem',
                        letterSpacing: '0.04em',
                        display: 'block',
                        mt: 0.3,
                      }}
                    >
                      Pronounced: <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 600 }}>{currentSpotlight.phonetic}</Box>
                    </Typography>
                  </Box>

                  {/* Meaning in Cormorant Garamond */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '1.14rem',
                      color: 'text.secondary',
                      lineHeight: 1.5,
                      mb: 2.8,
                      borderLeft: `2px solid ${alpha(custom.gold, 0.5)}`,
                      pl: 1.8,
                    }}
                  >
                    “{currentSpotlight.meaning}”
                  </Typography>

                  {/* 4 Attribute Specs */}
                  <Grid container spacing={1.2} sx={{ mb: 2.8 }}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.2, borderRadius: '2px', bgcolor: alpha(custom.coral, 0.04), border: `1px solid ${custom.borderLight}` }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Nakshatra Mansion
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.86rem', color: custom.gold }}>
                          {currentSpotlight.nakshatra}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.2, borderRadius: '2px', bgcolor: alpha(custom.coral, 0.04), border: `1px solid ${custom.borderLight}` }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Vedic Virtue
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.86rem' }}>
                          {currentSpotlight.virtue}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.2, borderRadius: '2px', bgcolor: alpha(custom.coral, 0.04), border: `1px solid ${custom.borderLight}` }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Rashi Constellation
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.86rem' }}>
                          {currentSpotlight.zodiac}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.2, borderRadius: '2px', bgcolor: alpha(custom.coral, 0.04), border: `1px solid ${custom.borderLight}` }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Destiny Numerology
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.86rem' }}>
                          Number {currentSpotlight.luckyNumber}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Card Bottom CTA */}
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<ArrowForward sx={{ fontSize: 15 }} />}
                    onClick={() => navigate(isSpotlightGirl ? '/girl-names' : '/boy-names')}
                    sx={{
                      borderRadius: '2px',
                      borderColor: spotlightColor,
                      color: spotlightColor,
                      py: 1,
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      letterSpacing: '0.04em',
                      '&:hover': {
                        bgcolor: alpha(spotlightColor, 0.06),
                        borderColor: spotlightColor,
                      },
                    }}
                  >
                    Explore More {currentSpotlight.gender} Names Like {currentSpotlight.name}
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PRESTIGE AUTHORITY MATRIX RIBBON */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            {[
              {
                icon: <VerifiedShieldIcon size={24} color="#059669" />,
                stat: '50,000+',
                title: 'Authentic Meanings',
                desc: 'Cross-verified with classical Sanskrit & Vedic lexicons',
              },
              {
                icon: <AstrologyCompassIcon size={24} color={custom.gold} />,
                stat: '27 Nakshatras',
                title: 'Auspicious Syllables',
                desc: 'Precise lunar mansion sound matching for all Rashis',
              },
              {
                icon: <AudioChimeIcon size={24} color="#0F4C81" />,
                stat: 'Native Vocalization',
                title: 'Speech Pronunciation',
                desc: 'Interactive audio playback for perfect melodic resonance',
              },
              {
                icon: <FiligreeHeartIcon size={24} color="#9F2241" filled />,
                stat: '250,000+',
                title: 'Curated Shortlists',
                desc: 'Saved & shared on WhatsApp with partners across 42 countries',
              },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '2px',
                    border: `1px solid ${alpha(custom.borderLight, 0.8)}`,
                    bgcolor: alpha(custom.softCream, 0.5),
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      borderColor: custom.gold,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    {item.icon}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontFamily: '"Cinzel", Georgia, serif',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: 'text.primary',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.stat}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      color: custom.coral,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.76rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BOY & GIRL REALM SHOWCASE */}
      <BoyGirlShowcase />

      {/* INTERACTIVE 3-STEP NAME FINDER CONCIERGE */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 7, md: 9 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4.5 }}>
            <Chip
              icon={<ModernSparkleIcon size={13} color={custom.coral} />}
              label="Instant Match Atelier"
              sx={{ borderRadius: '2px', bgcolor: alpha(custom.coral, 0.08), color: custom.coral, fontWeight: 700, mb: 1.5 }}
            />
            <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 1 }}>
              Bespoke Name Finder Concierge
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Select gender, starting syllable, and spiritual lineage to instantly discover curated matches.
            </Typography>
          </Box>

          {/* Sharp Architectural Console */}
          <Paper
            elevation={0}
            className="luxury-gold-aura"
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: '2px',
              bgcolor: custom.cardWhite,
              border: `1px solid ${custom.borderLight}`,
              mb: 4,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Step 1: Gender */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: custom.gold, display: 'block', mb: 1, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  1. SELECT REALM
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.6 }}>
                  {[
                    { id: 'all', label: 'All', icon: null },
                    { id: 'Boy', label: 'Prince', icon: <CrownPrinceIcon size={14} color={filterGender === 'Boy' ? '#FFFFFF' : '#0F4C81'} /> },
                    { id: 'Girl', label: 'Princess', icon: <PrincessTiaraIcon size={14} color={filterGender === 'Girl' ? '#FFFFFF' : '#9F2241'} /> },
                  ].map((g) => (
                    <Chip
                      key={g.id}
                      icon={g.icon}
                      label={g.label}
                      clickable
                      onClick={() => setFilterGender(g.id)}
                      sx={{
                        flex: 1,
                        borderRadius: '2px',
                        bgcolor: filterGender === g.id ? custom.coral : 'transparent',
                        color: filterGender === g.id ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterGender === g.id ? custom.coral : custom.borderLight}`,
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Step 2: Starting Letter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: custom.gold, display: 'block', mb: 1, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  2. INITIAL SYLLABLE
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {['All', 'A', 'S', 'V', 'R', 'M', 'K', 'D'].map((ltr) => (
                    <Chip
                      key={ltr}
                      label={ltr}
                      size="small"
                      clickable
                      onClick={() => setFilterLetter(ltr)}
                      sx={{
                        borderRadius: '2px',
                        bgcolor: filterLetter === ltr ? custom.coral : 'transparent',
                        color: filterLetter === ltr ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterLetter === ltr ? custom.coral : custom.borderLight}`,
                        fontWeight: 700,
                        minWidth: 28,
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Step 3: Tradition / Vibe */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: custom.gold, display: 'block', mb: 1, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  3. HERITAGE &amp; VIBE
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.6 }}>
                  {[
                    { id: 'all', label: 'All Styles' },
                    { id: 'Indian', label: 'Sanskrit' },
                    { id: 'Modern', label: 'Modern' },
                    { id: 'Zodiac', label: 'Zodiac' },
                  ].map((st) => (
                    <Chip
                      key={st.id}
                      label={st.label}
                      clickable
                      onClick={() => setFilterStyle(st.id)}
                      sx={{
                        flex: 1,
                        borderRadius: '2px',
                        bgcolor: filterStyle === st.id ? custom.coral : 'transparent',
                        color: filterStyle === st.id ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterStyle === st.id ? custom.coral : custom.borderLight}`,
                        fontWeight: 700,
                        fontSize: '0.76rem',
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Dynamic Concierge Results Grid */}
          <Grid container spacing={2.5}>
            {wizardResults.map((item, idx) => {
              const isGirl = item.gender === 'Girl';
              const fav = isFavorite(item.name);
              const accentColor = isGirl ? '#9F2241' : '#0F4C81';
              return (
                <Grid item xs={12} sm={6} md={4} key={`${item.name}-${idx}`}>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                    <Card
                      sx={{
                        p: 2.5,
                        borderRadius: '2px',
                        bgcolor: custom.cardWhite,
                        border: `1px solid ${fav ? alpha(accentColor, 0.45) : custom.borderLight}`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        transition: 'all 0.22s ease',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: 2.5,
                          background: isGirl ? 'linear-gradient(90deg, #9F2241, #C59B27)' : 'linear-gradient(90deg, #0F4C81, #C59B27)',
                          opacity: fav ? 1 : 0.45,
                        },
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
                          borderColor: accentColor,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", "Cinzel", Georgia, serif', fontSize: '1.24rem' }}>
                            {item.name}
                          </Typography>
                          <Chip
                            size="small"
                            icon={isGirl ? <PrincessTiaraIcon size={12} color="#9F2241" /> : <CrownPrinceIcon size={12} color="#0F4C81" />}
                            label={item.gender}
                            sx={{
                              height: 20,
                              borderRadius: '2px',
                              fontSize: '0.66rem',
                              bgcolor: isGirl ? alpha('#9F2241', 0.06) : alpha('#0F4C81', 0.06),
                              color: isGirl ? '#9F2241' : '#0F4C81',
                              fontWeight: 700,
                              '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
                            }}
                          />
                        </Box>
                        <IconButton size="small" onClick={() => handleToggleFavorite(item.name)} sx={{ borderRadius: '2px' }}>
                          <FiligreeHeartIcon size={17} color="#9F2241" filled={Boolean(fav)} />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '0.98rem', minHeight: 40, lineHeight: 1.45 }}>
                        "{item.meaning}"
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
                        <Chip label={item.origin} size="small" sx={{ borderRadius: '2px', fontSize: '0.68rem', bgcolor: alpha(custom.coral, 0.06), color: custom.coral }} />
                        <Chip label={`Rashi: ${item.zodiac}`} size="small" sx={{ borderRadius: '2px', fontSize: '0.68rem', bgcolor: alpha(custom.gold, 0.08), color: isDark ? '#E5C158' : '#8F6E13' }} />
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4.5 }}>
            <Button
              variant="outlined"
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              onClick={() => navigate(filterGender === 'Girl' ? '/girl-names' : '/boy-names')}
              sx={{ borderRadius: '2px', px: 4, py: 1.1, fontWeight: 700 }}
            >
              Explore Full Collection
            </Button>
          </Box>
        </Container>
      </Box>

      {/* THE SIX ROYAL REALMS (Categories) */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: 5.5 }}>
          <Typography variant="overline" sx={{ color: custom.gold, letterSpacing: '0.18em', fontWeight: 800, fontSize: '0.74rem', display: 'block', mb: 0.8 }}>
            CURATED CATALOGUES
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 1 }}>
            Browse Names by Realm
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', fontSize: '0.98rem' }}>
            Carefully structured naming realms designed to make exploration dignified, intuitive, and unforgettable.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.name}>
              <Card
                onClick={() => navigate(cat.path)}
                className="luxury-corner-tick"
                sx={{
                  cursor: 'pointer',
                  p: 3.2,
                  borderRadius: '2px',
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${custom.borderLight}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.24s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
                    borderColor: cat.color,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Cinzel", Georgia, serif',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: custom.gold,
                    }}
                  >
                    {cat.num}
                  </Typography>
                  <Chip label={cat.count} size="small" sx={{ borderRadius: '2px', bgcolor: cat.bg, color: cat.color, fontWeight: 700, fontSize: '0.7rem' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                  <Box sx={{ p: 0.8, borderRadius: '2px', bgcolor: cat.bg, color: cat.color, display: 'flex' }}>
                    {cat.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '1.2rem' }}>
                    {cat.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flexGrow: 1, lineHeight: 1.6, fontSize: '0.86rem' }}>
                  {cat.desc}
                </Typography>
                <Typography variant="caption" sx={{ color: cat.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Explore Realm <ArrowForward sx={{ fontSize: 13 }} />
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* WHY AN ATELIER NAME MATTERS (PHILOSOPHY & CULTURE) */}
      <Box sx={{ bgcolor: custom.cardWhite, py: { xs: 7, md: 9 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: custom.gold, letterSpacing: '0.18em', fontWeight: 800, fontSize: '0.74rem', display: 'block', mb: 0.8 }}>
              SACRED NOMENCLATURE
            </Typography>
            <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 1 }}>
              The Philosophy Behind a Sacred Name
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 580, mx: 'auto', fontSize: '0.98rem' }}>
              Why thoughtful parents choose names grounded in celestial harmony and ancestral heritage.
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {[
              {
                num: '01',
                title: 'The Vibration of Aksharas',
                desc: 'In classical Sanskrit grammar, every primal syllable carries acoustic resonance. The first sound a newborn hears shapes psychological composure, confidence, and internal equilibrium.',
                highlight: 'Phonetic Harmony',
              },
              {
                num: '02',
                title: 'Planetary Nakshatra Synergy',
                desc: 'Your child’s Moon transit across the 27 lunar mansions at birth activates auspicious energy channels. Aligning their naming initial harmonizes cosmic elements from day one.',
                highlight: 'Astrological Alignment',
              },
              {
                num: '03',
                title: 'Modern International Fluency',
                desc: 'A great name bridges tradition and global readiness. Our curated collections balance deep Vedic etymology with effortless pronunciation in London, New York, Paris, and Mumbai.',
                highlight: 'Global Resonance',
              },
            ].map((card, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    borderRadius: '2px',
                    bgcolor: alpha(custom.softCream, 0.6),
                    border: `1px solid ${custom.borderLight}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      borderColor: custom.gold,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Cinzel", Georgia, serif',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: alpha(custom.gold, 0.45),
                      lineHeight: 1,
                      mb: 1.5,
                    }}
                  >
                    {card.num}
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, mb: 1.2, fontSize: '1.25rem' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.88rem', flexGrow: 1, mb: 2 }}>
                    {card.desc}
                  </Typography>
                  <Chip
                    label={card.highlight}
                    size="small"
                    sx={{
                      borderRadius: '2px',
                      alignSelf: 'flex-start',
                      bgcolor: alpha(custom.gold, 0.1),
                      color: isDark ? '#E5C158' : '#8F6E13',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* PARENT VOICES & TESTIMONIALS */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: 5.5 }}>
          <Typography variant="overline" sx={{ color: custom.gold, letterSpacing: '0.18em', fontWeight: 800, fontSize: '0.74rem', display: 'block', mb: 0.8 }}>
            CHERISHED BLESSINGS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 1 }}>
            Words From Grateful Parents
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', fontSize: '0.98rem' }}>
            Stories from families who discovered their child's lifelong identity through our compendium.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              quote: 'Finding Vihaan’s name with its exact Rohini Nakshatra syllable was effortless. The native pronunciation audio gave our whole family confidence.',
              parent: 'Priya & Rohan M.',
              location: 'London, UK',
              nameChosen: 'Vihaan',
            },
            {
              quote: 'The Twin Harmony pairing gave us Aarav & Aanya. The meanings complement each other like sacred poetry. Best naming tool on the internet.',
              parent: 'Ananya & Vikram K.',
              location: 'Mumbai, India',
              nameChosen: 'Aarav & Aanya',
            },
            {
              quote: 'Architectural, sharp, and deeply authentic. Not just another generic list, but a true heritage atelier. We found Kiara here and couldn’t be happier.',
              parent: 'Sneha & David S.',
              location: 'New York, USA',
              nameChosen: 'Kiara',
            },
          ].map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '2px',
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${custom.borderLight}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', color: '#D4AF37', fontSize: '0.92rem', mb: 1.5 }}>
                    ★★★★★
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: 1.55,
                      color: 'text.secondary',
                    }}
                  >
                    “{t.quote}”
                  </Typography>
                </Box>
                <Box sx={{ pt: 2, borderTop: `1px solid ${custom.borderLight}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.88rem' }}>
                    {t.parent}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.74rem' }}>
                    {t.location} • Chose <Box component="span" sx={{ color: custom.coral, fontWeight: 700 }}>"{t.nameChosen}"</Box>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* LATEST FROM THE BLOG */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 7, md: 9 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4.5, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: custom.gold, letterSpacing: '0.15em', fontWeight: 800, display: 'block', mb: 0.8 }}>
                EDITORIAL COMPENDIUM
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Latest from Our Baby Naming Atelier
              </Typography>
            </Box>
            <Button endIcon={<ArrowForward sx={{ fontSize: 16 }} />} onClick={() => navigate('/blogs')} sx={{ borderRadius: '2px', fontWeight: 700 }}>
              View All Articles
            </Button>
          </Box>

          <Grid container spacing={3}>
            {blogPosts.slice(0, 3).map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '2px',
                    bgcolor: custom.cardWhite,
                    border: `1px solid ${custom.borderLight}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
                      borderColor: custom.coral,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={post.featuredImage}
                    alt={post.title}
                    sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                      <Chip label={post.tags[0]} size="small" sx={{ borderRadius: '2px', bgcolor: alpha(custom.coral, 0.08), color: custom.coral, fontWeight: 700 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '1.1rem', mb: 1.2, lineHeight: 1.3 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.84rem' }}>
                      {post.excerpt}
                    </Typography>
                    <Typography variant="caption" sx={{ color: custom.coral, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                      Read Guide <ArrowForward sx={{ fontSize: 12 }} />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SEO FAQ SECTION WITH SHARP ACCORDIONS */}
      <Container maxWidth="md" sx={{ py: { xs: 7, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: 4.5 }}>
          <Typography variant="overline" sx={{ color: custom.gold, letterSpacing: '0.15em', fontWeight: 800, display: 'block', mb: 0.8 }}>
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Cinzel", "Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 1 }}>
            Everything You Need to Know
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.96rem' }}>
            Answers to common questions about baby naming, trends, astrology, and saving favorites.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {FAQ_LIST.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              sx={{
                bgcolor: custom.cardWhite,
                border: `1px solid ${custom.borderLight}`,
                borderRadius: '2px !important',
                '&::before': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: custom.coral }} />} sx={{ px: 2.5, py: 0.8 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.98rem' }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.9rem' }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
