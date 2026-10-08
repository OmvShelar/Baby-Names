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
} from '@mui/material';
import {
  Search,
  Boy,
  Girl,
  Public,
  TrendingUp,
  Star,
  AutoAwesome,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  MenuBook,
  ExpandMore,
  Verified,
  VolumeUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { namesDatabase } from '../data/data';
import { blogPosts } from '../data/blogsData';
import { useFavorites } from './ui/FavoritesProvider';
import BoyGirlShowcase from './ui/BoyGirlShowcase';
import SEO from './SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

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

  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boy-names?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'Boy Names', desc: 'Noble, strong & modern picks', icon: <Boy sx={{ fontSize: 26 }} />, path: '/boy-names', count: '25,000+', color: '#0369A1', bg: alpha('#0369A1', 0.06) },
    { name: 'Girl Names', desc: 'Graceful, lyrical & divine gems', icon: <Girl sx={{ fontSize: 26 }} />, path: '/girl-names', count: '28,000+', color: '#BE123C', bg: alpha('#BE123C', 0.06) },
    { name: 'Indian Heritage', desc: 'Sanskrit, Vedic & cultural roots', icon: <Public sx={{ fontSize: 26 }} />, path: '/indian-names', count: '18,000+', color: '#D97706', bg: alpha('#D97706', 0.06) },
    { name: 'Modern & Trendy', desc: '2-syllable contemporary favorites', icon: <TrendingUp sx={{ fontSize: 26 }} />, path: '/modern-names', count: '10,000+', color: '#059669', bg: alpha('#059669', 0.06) },
    { name: 'Zodiac & Rashi', desc: 'Auspicious Nakshatra syllables', icon: <Star sx={{ fontSize: 26 }} />, path: '/zodiac-names', count: '12,000+', color: '#7C3AED', bg: alpha('#7C3AED', 0.06) },
    { name: 'Editorial Blogs', desc: 'Expert guides, trends & advice', icon: <MenuBook sx={{ fontSize: 26 }} />, path: '/blogs', count: 'Curated', color: '#C86D51', bg: alpha('#C86D51', 0.06) },
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
      const matchesGender = filterGender === 'all' || item.gender === filterGender;
      const matchesLetter = filterLetter === 'All' || item.name.toUpperCase().startsWith(filterLetter);
      const matchesStyle =
        filterStyle === 'all' ||
        (filterStyle === 'Indian' && (item.origin === 'Indian' || item.origin === 'God' || item.origin === 'Goddess')) ||
        (filterStyle === 'Modern' && item.origin === 'Modern') ||
        (filterStyle === 'Zodiac' && item.origin !== 'Indian' && item.origin !== 'Modern');
      return matchesGender && matchesLetter && matchesStyle;
    }).slice(0, 6);
  }, [allFlattenedNames, filterGender, filterLetter, filterStyle]);

  const handleToggleFavorite = (name) => {
    toggleFavorite(name);
    if (!isFavorite(name)) {
      confetti({
        particleCount: 65,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#C86D51', '#C59B27', '#0369A1', '#BE123C'],
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

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 6, md: 9 },
          pb: { xs: 6, md: 9 },
          background: `radial-gradient(ellipse 90% 70% at 50% -10%, ${alpha(custom.coral, 0.08)}, transparent), linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Masthead Label */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.8,
                    py: 0.5,
                    borderRadius: '2px',
                    bgcolor: alpha(custom.gold, 0.1),
                    border: `1px solid ${alpha(custom.gold, 0.3)}`,
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 13, color: isDark ? '#E5C158' : '#9A7611' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? '#E5C158' : '#9A7611',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      fontSize: '0.72rem',
                    }}
                  >
                    THE 2026 GLOBAL DIRECTORY • 50,000+ ENTRIES
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  mb: 2,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  letterSpacing: '-0.025em',
                }}
              >
                A Name to Carry with{' '}
                <Box
                  component="span"
                  sx={{
                    fontStyle: 'italic',
                    background: `linear-gradient(135deg, ${custom.coral} 0%, #A85238 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Grace &amp; Meaning
                </Box>
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1.02rem', md: '1.14rem' },
                  maxWidth: 620,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Discover revered Sanskrit names, contemporary global favorites, and Vedic Nakshatra syllables curated for expecting parents worldwide.
              </Typography>
            </motion.div>

            {/* Sharp Luxury Search Console */}
            <motion.div variants={fadeInUp}>
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: 640,
                  mx: 'auto',
                  mb: 3,
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
                        <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: custom.cardWhite,
                      borderRadius: '2px',
                      height: 50,
                      fontSize: '0.94rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 3.5,
                    height: 50,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    borderRadius: '2px',
                  }}
                >
                  Find Names
                </Button>
              </Box>
            </motion.div>

            {/* Quick Filter Badges */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 0.8,
                  flexWrap: 'wrap',
                }}
              >
                <Chip
                  icon={<Boy sx={{ fontSize: 16, color: '#0369A1 !important' }} />}
                  label="Boy Compendium"
                  clickable
                  onClick={() => navigate('/boy-names')}
                  sx={{ borderRadius: '2px', bgcolor: alpha('#0369A1', 0.06), color: '#0369A1', fontWeight: 600, border: `1px solid ${alpha('#0369A1', 0.2)}` }}
                />
                <Chip
                  icon={<Girl sx={{ fontSize: 16, color: '#BE123C !important' }} />}
                  label="Girl Compendium"
                  clickable
                  onClick={() => navigate('/girl-names')}
                  sx={{ borderRadius: '2px', bgcolor: alpha('#BE123C', 0.06), color: '#BE123C', fontWeight: 600, border: `1px solid ${alpha('#BE123C', 0.2)}` }}
                />
                <Chip
                  icon={<Star sx={{ fontSize: 16, color: '#7C3AED !important' }} />}
                  label="Zodiac (Rashi)"
                  clickable
                  onClick={() => navigate('/zodiac-names')}
                  sx={{ borderRadius: '2px', bgcolor: alpha('#7C3AED', 0.06), color: '#7C3AED', fontWeight: 600, border: `1px solid ${alpha('#7C3AED', 0.2)}` }}
                />
                <Chip
                  icon={<MenuBook sx={{ fontSize: 16, color: '#C86D51 !important' }} />}
                  label="Editorial Guides"
                  clickable
                  onClick={() => navigate('/blogs')}
                  sx={{ borderRadius: '2px', bgcolor: alpha(custom.coral, 0.06), color: custom.coral, fontWeight: 600, border: `1px solid ${alpha(custom.coral, 0.2)}` }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Trust Highlights Bar */}
      <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-around" alignItems="center">
            {[
              { icon: <Verified sx={{ fontSize: 18, color: '#059669' }} />, label: '50,000+ Verified Meanings' },
              { icon: <Star sx={{ fontSize: 18, color: '#C59B27' }} />, label: 'Vedic Nakshatra Syllables' },
              { icon: <VolumeUp sx={{ fontSize: 18, color: '#0369A1' }} />, label: 'Speech Pronunciation Audio' },
              { icon: <Favorite sx={{ fontSize: 18, color: '#BE123C' }} />, label: 'Partner Shortlist Sharing' },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  {item.icon}
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem' }}>
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Boy & Girl Animated Showcase */}
      <BoyGirlShowcase />

      {/* Interactive Name Finder Wizard */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 6, md: 8 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4.5 }}>
            <Chip
              icon={<AutoAwesome sx={{ fontSize: 13 }} />}
              label="Instant Match Finder"
              sx={{ borderRadius: '2px', bgcolor: alpha(custom.coral, 0.08), color: custom.coral, fontWeight: 700, mb: 1.5 }}
            />
            <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 1 }}>
              Find Your Baby's Name in Seconds
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', fontSize: '0.96rem' }}>
              Filter by gender, starting letter, and tradition to discover instant matches.
            </Typography>
          </Box>

          {/* Sharp Filter Controls Bar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: '2px',
              bgcolor: custom.cardWhite,
              border: `1px solid ${custom.borderLight}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              mb: 3.5,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Gender Filter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, letterSpacing: '0.08em' }}>
                  1. SELECT GENDER
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.6 }}>
                  {['all', 'Boy', 'Girl'].map((g) => (
                    <Chip
                      key={g}
                      label={g === 'all' ? 'Any' : g}
                      clickable
                      onClick={() => setFilterGender(g)}
                      sx={{
                        flex: 1,
                        borderRadius: '2px',
                        bgcolor: filterGender === g ? custom.coral : 'transparent',
                        color: filterGender === g ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterGender === g ? custom.coral : custom.borderLight}`,
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Starting Letter Filter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, letterSpacing: '0.08em' }}>
                  2. STARTING LETTER
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
                        fontWeight: 600,
                        minWidth: 28,
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Style / Origin Filter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, letterSpacing: '0.08em' }}>
                  3. TRADITION / STYLE
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
                        fontWeight: 600,
                        fontSize: '0.76rem',
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Sharp Wizard Results Grid */}
          <Grid container spacing={2.5}>
            {wizardResults.map((item, idx) => {
              const isGirl = item.gender === 'Girl';
              const fav = isFavorite(item.name);
              const accentColor = isGirl ? '#BE123C' : '#0369A1';
              return (
                <Grid item xs={12} sm={6} md={4} key={`${item.name}-${idx}`}>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                    <Card
                      sx={{
                        p: 2.5,
                        borderRadius: '2px',
                        bgcolor: custom.cardWhite,
                        border: `1px solid ${fav ? alpha(accentColor, 0.4) : custom.borderLight}`,
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
                          background: isGirl ? 'linear-gradient(90deg, #E11D48, #BE123C)' : 'linear-gradient(90deg, #0284C7, #0369A1)',
                          opacity: fav ? 1 : 0.35,
                        },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                          borderColor: accentColor,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.24rem' }}>
                            {item.name}
                          </Typography>
                          <Chip
                            size="small"
                            label={item.gender}
                            sx={{
                              height: 20,
                              borderRadius: '2px',
                              fontSize: '0.66rem',
                              bgcolor: isGirl ? alpha('#BE123C', 0.06) : alpha('#0369A1', 0.06),
                              color: isGirl ? '#BE123C' : '#0369A1',
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                        <IconButton size="small" onClick={() => handleToggleFavorite(item.name)} sx={{ borderRadius: '2px', color: fav ? '#BE123C' : 'text.secondary' }}>
                          {fav ? <Favorite sx={{ fontSize: 17 }} /> : <FavoriteBorder sx={{ fontSize: 17 }} />}
                        </IconButton>
                      </Box>

                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '0.84rem', minHeight: 38 }}>
                        "{item.meaning}"
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
                        <Chip label={item.origin} size="small" sx={{ borderRadius: '2px', fontSize: '0.68rem', bgcolor: alpha(custom.coral, 0.06), color: custom.coral }} />
                        <Chip label={`Rashi: ${item.zodiac}`} size="small" sx={{ borderRadius: '2px', fontSize: '0.68rem', bgcolor: alpha('#7C3AED', 0.06), color: '#7C3AED' }} />
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              onClick={() => navigate(filterGender === 'Girl' ? '/girl-names' : '/boy-names')}
              sx={{ borderRadius: '2px', px: 4 }}
            >
              View More in Category
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Explore By Category */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.18em', fontWeight: 700, fontSize: '0.74rem', display: 'block', mb: 0.8 }}>
            CURATED REALMS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 1 }}>
            Browse Names by Realm
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', fontSize: '0.96rem' }}>
            Carefully curated baby naming realms designed to make exploration simple, dignified, and joyful.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.name}>
              <Card
                onClick={() => navigate(cat.path)}
                sx={{
                  cursor: 'pointer',
                  p: 3,
                  borderRadius: '2px',
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${custom.borderLight}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.22s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    borderColor: cat.color,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ p: 1.2, borderRadius: '2px', bgcolor: cat.bg, color: cat.color, display: 'flex' }}>
                    {cat.icon}
                  </Box>
                  <Chip label={cat.count} size="small" sx={{ borderRadius: '2px', bgcolor: cat.bg, color: cat.color, fontWeight: 700, fontSize: '0.7rem' }} />
                </Box>
                <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 0.8, fontSize: '1.24rem' }}>
                  {cat.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flexGrow: 1, lineHeight: 1.6, fontSize: '0.85rem' }}>
                  {cat.desc}
                </Typography>
                <Typography variant="caption" sx={{ color: cat.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Explore Collection <ArrowForward sx={{ fontSize: 13 }} />
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest from the Blog */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 6, md: 8 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, display: 'block', mb: 0.8 }}>
                EDITORIAL COMPENDIUM
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Latest from Our Baby Naming Blog
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
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
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

      {/* SEO FAQ Section with Sharp Accordions */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 4.5 }}>
          <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, display: 'block', mb: 0.8 }}>
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 1 }}>
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
