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
  CheckCircle,
  Lightbulb,
  Share,
  CalendarToday,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { namesDatabase, genderCategories } from '../data/data';
import { blogPosts } from '../data/blogsData';
import { useFavorites } from './ui/FavoritesProvider';
import BoyGirlShowcase from './ui/BoyGirlShowcase';
import SEO from './SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
  const [filterGender, setFilterGender] = useState('all'); // 'all' | 'Boy' | 'Girl'
  const [filterLetter, setFilterLetter] = useState('All');
  const [filterStyle, setFilterStyle] = useState('all'); // 'all' | 'Indian' | 'Modern' | 'Zodiac'

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
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
    { name: 'Boy Names', desc: 'Noble, strong & modern picks', icon: <Boy sx={{ fontSize: 32 }} />, path: '/boy-names', count: '25,000+', color: '#0284C7', bg: alpha('#0284C7', 0.1) },
    { name: 'Girl Names', desc: 'Graceful, lyrical & divine gems', icon: <Girl sx={{ fontSize: 32 }} />, path: '/girl-names', count: '28,000+', color: '#E11D48', bg: alpha('#E11D48', 0.1) },
    { name: 'Indian Heritage', desc: 'Sanskrit, Vedic & cultural roots', icon: <Public sx={{ fontSize: 32 }} />, path: '/indian-names', count: '18,000+', color: '#F59E0B', bg: alpha('#F59E0B', 0.1) },
    { name: 'Modern & Trendy', desc: '2-syllable contemporary favorites', icon: <TrendingUp sx={{ fontSize: 32 }} />, path: '/modern-names', count: '10,000+', color: '#10B981', bg: alpha('#10B981', 0.1) },
    { name: 'Zodiac & Rashi', desc: 'Auspicious Nakshatra syllables', icon: <Star sx={{ fontSize: 32 }} />, path: '/zodiac-names', count: '12,000+', color: '#8B5CF6', bg: alpha('#8B5CF6', 0.1) },
    { name: 'Naming Blogs', desc: 'Expert guides, trends & advice', icon: <MenuBook sx={{ fontSize: 32 }} />, path: '/blogs', count: 'Fresh Guides', color: '#EC4899', bg: alpha('#EC4899', 0.1) },
  ];

  // Curated list of popular names from database
  const popularNames = [
    { name: 'Aarav', meaning: 'Peaceful, calm & wise', gender: 'Boy', origin: 'Indian', zodiac: 'Libra' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi, sacred grace', gender: 'Girl', origin: 'Indian', zodiac: 'Aries' },
    { name: 'Vihaan', meaning: 'Dawn, first rays of sun', gender: 'Boy', origin: 'Modern', zodiac: 'Aries' },
    { name: 'Myra', meaning: 'Admirable, sweet wonder', gender: 'Girl', origin: 'Modern', zodiac: 'Leo' },
    { name: 'Arjun', meaning: 'Bright, shining warrior', gender: 'Boy', origin: 'Indian', zodiac: 'Leo' },
    { name: 'Diya', meaning: 'Divine light & radiant lamp', gender: 'Girl', origin: 'Indian', zodiac: 'Leo' },
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF7E67', '#F43F5E', '#0284C7', '#F59E0B'],
      });
    }
  };

  // Structured FAQ JSON-LD Schema
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
          pt: { xs: 7, md: 10 },
          pb: { xs: 8, md: 12 },
          background: `radial-gradient(ellipse 90% 80% at 50% -20%, ${alpha(custom.coral, 0.15)}, transparent), linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Floating Circles */}
        <Box
          className="pulse-glow"
          sx={{
            position: 'absolute',
            top: '15%',
            left: '5%',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          className="pulse-glow"
          sx={{
            position: 'absolute',
            top: '25%',
            right: '6%',
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225, 29, 72, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Top Pill Badge */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    px: 2.2,
                    py: 0.8,
                    borderRadius: 50,
                    bgcolor: alpha(custom.coral, 0.12),
                    border: `1px solid ${alpha(custom.coral, 0.25)}`,
                    boxShadow: '0 4px 14px rgba(255, 126, 103, 0.15)',
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 16, color: custom.coral }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: custom.coral,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                    }}
                  >
                    ✨ Over 50,000+ Curated Names for 2026
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
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2.5,
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                The Name They'll{' '}
                <Box
                  component="span"
                  sx={{
                    fontStyle: 'italic',
                    background: `linear-gradient(135deg, ${custom.coral} 0%, #F43F5E 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Carry Forever
                </Box>{' '}
                Starts Here
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: 'text.secondary',
                  mb: 5,
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                  maxWidth: 620,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Explore meaningful boy and girl names inspired by Sanskrit roots, modern trends, and planetary nakshatras. Every name holds a story.
              </Typography>
            </motion.div>

            {/* Search Bar */}
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
                  gap: 1.5,
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
                        <Search sx={{ color: 'text.secondary', fontSize: 22 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: custom.cardWhite,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                      height: 56,
                      fontSize: '1rem',
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 4,
                    height: 56,
                    fontSize: '1rem',
                    whiteSpace: 'nowrap',
                    borderRadius: 50,
                  }}
                >
                  Find Names
                </Button>
              </Box>
            </motion.div>

            {/* Quick Action Chips */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1.2,
                  flexWrap: 'wrap',
                }}
              >
                <Chip
                  icon={<Boy sx={{ fontSize: 18, color: '#0284C7 !important' }} />}
                  label="Boy Names"
                  clickable
                  onClick={() => navigate('/boy-names')}
                  sx={{ bgcolor: alpha('#0284C7', 0.08), color: '#0284C7', fontWeight: 600, border: `1px solid ${alpha('#0284C7', 0.2)}` }}
                />
                <Chip
                  icon={<Girl sx={{ fontSize: 18, color: '#E11D48 !important' }} />}
                  label="Girl Names"
                  clickable
                  onClick={() => navigate('/girl-names')}
                  sx={{ bgcolor: alpha('#E11D48', 0.08), color: '#E11D48', fontWeight: 600, border: `1px solid ${alpha('#E11D48', 0.2)}` }}
                />
                <Chip
                  icon={<Star sx={{ fontSize: 18, color: '#8B5CF6 !important' }} />}
                  label="Zodiac (Rashi)"
                  clickable
                  onClick={() => navigate('/zodiac-names')}
                  sx={{ bgcolor: alpha('#8B5CF6', 0.08), color: '#8B5CF6', fontWeight: 600, border: `1px solid ${alpha('#8B5CF6', 0.2)}` }}
                />
                <Chip
                  icon={<MenuBook sx={{ fontSize: 18, color: '#EC4899 !important' }} />}
                  label="Blogs & Guides"
                  clickable
                  onClick={() => navigate('/blogs')}
                  sx={{ bgcolor: alpha('#EC4899', 0.08), color: '#EC4899', fontWeight: 600, border: `1px solid ${alpha('#EC4899', 0.2)}` }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Boy & Girl Animated Showcase */}
      <BoyGirlShowcase />

      {/* Interactive Name Finder Wizard */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 6, md: 9 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
              icon={<AutoAwesome sx={{ fontSize: 16 }} />}
              label="Instant Match Finder"
              sx={{ bgcolor: alpha(custom.coral, 0.1), color: custom.coral, fontWeight: 700, mb: 1.5 }}
            />
            <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>
              Find Your Baby's Name in Seconds
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto' }}>
              Filter by gender, starting letter, and tradition to discover instant matches.
            </Typography>
          </Box>

          {/* Filter Controls Bar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              bgcolor: custom.cardWhite,
              border: `1px solid ${custom.borderLight}`,
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              mb: 4,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Gender Filter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  1. SELECT GENDER
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['all', 'Boy', 'Girl'].map((g) => (
                    <Chip
                      key={g}
                      label={g === 'all' ? 'Any' : g}
                      clickable
                      onClick={() => setFilterGender(g)}
                      sx={{
                        flex: 1,
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
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  2. STARTING LETTER
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
                  {['All', 'A', 'S', 'V', 'R', 'M', 'K', 'D'].map((ltr) => (
                    <Chip
                      key={ltr}
                      label={ltr}
                      size="small"
                      clickable
                      onClick={() => setFilterLetter(ltr)}
                      sx={{
                        bgcolor: filterLetter === ltr ? custom.coral : 'transparent',
                        color: filterLetter === ltr ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterLetter === ltr ? custom.coral : custom.borderLight}`,
                        fontWeight: 600,
                        minWidth: 32,
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Style / Origin Filter */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                  3. TRADITION / STYLE
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
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
                        bgcolor: filterStyle === st.id ? custom.coral : 'transparent',
                        color: filterStyle === st.id ? '#FFFFFF' : 'text.primary',
                        border: `1px solid ${filterStyle === st.id ? custom.coral : custom.borderLight}`,
                        fontWeight: 600,
                        fontSize: '0.78rem',
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Wizard Results Grid */}
          <Grid container spacing={2.5}>
            {wizardResults.map((item, idx) => {
              const isGirl = item.gender === 'Girl';
              const fav = isFavorite(item.name);
              return (
                <Grid item xs={12} sm={6} md={4} key={`${item.name}-${idx}`}>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card
                      sx={{
                        p: 2.5,
                        borderRadius: 3.5,
                        bgcolor: custom.cardWhite,
                        border: `1px solid ${custom.borderLight}`,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
                          borderColor: isGirl ? '#E11D48' : '#0284C7',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {item.name}
                          </Typography>
                          <Chip
                            size="small"
                            label={item.gender}
                            sx={{
                              height: 20,
                              fontSize: '0.68rem',
                              bgcolor: isGirl ? alpha('#E11D48', 0.1) : alpha('#0284C7', 0.1),
                              color: isGirl ? '#E11D48' : '#0284C7',
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                        <IconButton size="small" onClick={() => handleToggleFavorite(item.name)} sx={{ color: fav ? '#E11D48' : 'text.secondary' }}>
                          {fav ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </Box>

                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '0.86rem', minHeight: 40 }}>
                        "{item.meaning}"
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={item.origin} size="small" sx={{ fontSize: '0.72rem', bgcolor: alpha(custom.coral, 0.08), color: custom.coral }} />
                        <Chip label={`Rashi: ${item.zodiac}`} size="small" sx={{ fontSize: '0.72rem', bgcolor: alpha('#8B5CF6', 0.08), color: '#8B5CF6' }} />
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
              endIcon={<ArrowForward />}
              onClick={() => navigate(filterGender === 'Girl' ? '/girl-names' : '/boy-names')}
              sx={{ borderRadius: 50, px: 4 }}
            >
              View More in Category
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Explore By Category */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.2em', fontWeight: 700, fontSize: '0.75rem', display: 'block', mb: 1 }}>
            CURATED COLLECTIONS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>
            Browse Names by Category
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto' }}>
            Carefully curated baby naming realms designed to make exploration simple and joyful.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.name}>
              <Card
                onClick={() => navigate(cat.path)}
                sx={{
                  cursor: 'pointer',
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: custom.cardWhite,
                  border: `1px solid ${custom.borderLight}`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.09)',
                    borderColor: cat.color,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ p: 1.6, borderRadius: 3, bgcolor: cat.bg, color: cat.color, display: 'flex' }}>
                    {cat.icon}
                  </Box>
                  <Chip label={cat.count} size="small" sx={{ bgcolor: cat.bg, color: cat.color, fontWeight: 700, fontSize: '0.72rem' }} />
                </Box>
                <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 1 }}>
                  {cat.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
                  {cat.desc}
                </Typography>
                <Typography variant="caption" sx={{ color: cat.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Explore Names <ArrowForward sx={{ fontSize: 14 }} />
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest from the Blog */}
      <Box sx={{ bgcolor: custom.sectionAlt, py: { xs: 6, md: 9 }, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, display: 'block', mb: 1 }}>
                EDITORIAL &amp; GUIDES
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                Latest from Our Baby Naming Blog
              </Typography>
            </Box>
            <Button endIcon={<ArrowForward />} onClick={() => navigate('/blogs')} sx={{ fontWeight: 700 }}>
              View All Articles
            </Button>
          </Box>

          <Grid container spacing={3.5}>
            {blogPosts.slice(0, 3).map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 4,
                    bgcolor: custom.cardWhite,
                    border: `1px solid ${custom.borderLight}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px rgba(0,0,0,0.08)',
                      borderColor: custom.coral,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={post.featuredImage}
                    alt={post.title}
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Chip label={post.tags[0]} size="small" sx={{ bgcolor: alpha(custom.coral, 0.1), color: custom.coral, fontWeight: 700 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '1.15rem', mb: 1.5, lineHeight: 1.3 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </Typography>
                    <Typography variant="caption" sx={{ color: custom.coral, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                      Read Guide <ArrowForward sx={{ fontSize: 13 }} />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SEO FAQ Section */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, display: 'block', mb: 1 }}>
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>
            Everything You Need to Know
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Answers to common questions about baby naming, trends, astrology, and saving favorites.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQ_LIST.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              sx={{
                bgcolor: custom.cardWhite,
                border: `1px solid ${custom.borderLight}`,
                borderRadius: '16px !important',
                '&::before': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: custom.coral }} />} sx={{ px: 3, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.95rem' }}>
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
