import React, { useState, useEffect } from 'react';
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
  MenuBook,
  ArrowRight,
} from '@mui/icons-material';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { namesDatabase, genderCategories } from '../data/data';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/boy-names?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const categories = [
    { name: 'Boy Names', desc: 'Strong & classic names', icon: <Boy sx={{ fontSize: 28 }} />, path: '/boy-names', count: 275 },
    { name: 'Girl Names', desc: 'Elegant & timeless names', icon: <Girl sx={{ fontSize: 28 }} />, path: '/girl-names', count: 403 },
    { name: 'Indian Names', desc: 'Traditional & cultural names', icon: <Public sx={{ fontSize: 28 }} />, path: '/indian-names', count: 161 },
    { name: 'Modern Names', desc: 'Contemporary & trendy names', icon: <TrendingUp sx={{ fontSize: 28 }} />, path: '/modern-names', count: 100 },
    { name: 'Zodiac Names', desc: 'Astrology-inspired names', icon: <Star sx={{ fontSize: 28 }} />, path: '/zodiac-names', count: 288 },
    { name: 'God Names', desc: 'Divine & sacred names', icon: <AutoAwesome sx={{ fontSize: 28 }} />, path: '/indian-names', count: 80 },
  ];

  const popularNames = [
    { name: 'Arjun', meaning: 'White, shining, bright', gender: 'Boy', origin: 'Indian' },
    { name: 'Diya', meaning: 'Lamp, light', gender: 'Girl', origin: 'Indian' },
    { name: 'Aarav', meaning: 'Peaceful, calm', gender: 'Boy', origin: 'Indian' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'Girl', origin: 'Indian' },
    { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'Boy', origin: 'Modern' },
    { name: 'Myra', meaning: 'Admirable, wonderful', gender: 'Girl', origin: 'Modern' },
  ];

  const features = [
    { title: 'Curated Collection', desc: 'Carefully selected names from diverse cultures, each with verified meanings and origins.', icon: <MenuBook sx={{ fontSize: 24, color: '#D08B7B' }} /> },
    { title: 'Smart Search', desc: 'Instantly find the perfect name by meaning, origin, gender, or zodiac sign.', icon: <Search sx={{ fontSize: 24, color: '#D08B7B' }} /> },
    { title: 'Save Favorites', desc: 'Create your shortlist of top names and share it with your partner or family.', icon: <Heart size={24} style={{ color: '#D08B7B' }} /> },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero */}
      <Box
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
          background: `linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
        }}
      >
        <Container maxWidth="md">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, gap: 1.5 }}>
                <Box sx={{ width: 32, height: 1, bgcolor: '#D08B7B' }} />
                <Typography
                  variant="overline"
                  sx={{ letterSpacing: '0.2em', color: '#D08B7B', fontWeight: 600, fontSize: '0.72rem' }}
                >
                  Find the Perfect Name
                </Typography>
                <Box sx={{ width: 32, height: 1, bgcolor: '#D08B7B' }} />
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  mb: 2.5,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                The Name They'll{' '}
                <Box component="span" sx={{ fontStyle: 'italic', color: '#D08B7B' }}>Carry Forever</Box>{' '}
                Starts Here
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: 'text.secondary', mb: 5, fontSize: '1.05rem', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}
              >
                Explore thousands of beautiful names with meaningful origins. Your journey to finding the perfect name begins with a single search.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <TextField
                  fullWidth
                  placeholder="Search by name, meaning, or origin..."
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
                    maxWidth: 520,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${custom.searchBorder}`,
                      '& fieldset': { border: 'none' },
                      fontSize: '0.95rem',
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ml: 1.5, px: 4, fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                >
                  Search
                </Button>
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<Sparkles size={18} />}
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                  onClick={() => navigate('/boy-names')}
                  sx={{
                    borderColor: custom.borderLight,
                    color: 'text.primary',
                    bgcolor: custom.cardWhite,
                    '&:hover': { borderColor: '#D08B7B', color: '#D08B7B' },
                  }}
                >
                  Explore Names
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Star sx={{ fontSize: 18 }} />}
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                  onClick={() => navigate('/zodiac-names')}
                  sx={{
                    borderColor: custom.borderLight,
                    color: 'text.primary',
                    bgcolor: custom.cardWhite,
                    '&:hover': { borderColor: '#D08B7B', color: '#D08B7B' },
                  }}
                >
                  Zodiac Names
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="overline" sx={{ color: '#D08B7B', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.72rem', display: 'block', mb: 1, textAlign: 'center' }}>
                Browse by Category
              </Typography>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 1.5, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Find Names by Category
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto' }}>
                Browse our carefully curated collections organized by gender, origin, and style.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={2}>
            {categories.map((cat, i) => (
              <Grid item xs={6} sm={4} md={4} key={cat.name}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.3 }} whileHover={{ y: -3 }}>
                  <Card
                    onClick={() => navigate(cat.path)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${custom.borderLight}`,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        border: `1px solid ${alpha('#D08B7B', 0.3)}`,
                        boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)',
                        '& .cat-icon': { color: '#D08B7B' },
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 }, textAlign: 'center' }}>
                      <Box
                        className="cat-icon"
                        sx={{
                          display: 'inline-flex',
                          p: 1.5,
                          mb: 1.5,
                          border: `1px solid ${custom.borderLight}`,
                          color: 'text.secondary',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {cat.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.05rem' }, mb: 0.3 }}>
                        {cat.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', mb: 1 }}>
                        {cat.desc}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#D08B7B', fontWeight: 600 }}>
                        {cat.count}+ names
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Popular Names */}
      <Box sx={{ bgcolor: custom.sectionAlt, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <Box sx={{ mb: 5 }}>
                <Typography variant="overline" sx={{ color: '#D08B7B', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.72rem', display: 'block', mb: 1, textAlign: 'center' }}>
                  Popular Names
                </Typography>
                <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 1.5, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                  Names Parents Love
                </Typography>
                <Typography variant="body2" align="center" sx={{ color: 'text.secondary', maxWidth: 420, mx: 'auto' }}>
                  Trending names chosen by thousands of parents worldwide.
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={2}>
              {popularNames.map((name, i) => (
                <Grid item xs={6} sm={4} md={4} key={name.name}>
                  <motion.div variants={fadeInUp} transition={{ duration: 0.3 }} whileHover={{ y: -2 }}>
                    <Card
                      sx={{
                        bgcolor: custom.cardWhite,
                        border: `1px solid ${custom.borderLight}`,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)',
                          border: `1px solid ${alpha('#D08B7B', 0.3)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                            {name.name}
                          </Typography>
                          {name.gender === 'Girl' ? (
                            <Girl sx={{ fontSize: 16, color: alpha('#C97B84', 0.6) }} />
                          ) : (
                            <Boy sx={{ fontSize: 16, color: alpha('#6B8FAD', 0.6) }} />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 1.5, fontSize: '0.82rem' }}>
                          "{name.meaning}"
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box
                            component="span"
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.3,
                              px: 1,
                              py: 0.2,
                              fontSize: '0.68rem',
                              fontWeight: 500,
                              bgcolor: name.gender === 'Girl' ? alpha('#C97B84', 0.1) : alpha('#6B8FAD', 0.1),
                              color: name.gender === 'Girl' ? '#C97B84' : '#6B8FAD',
                            }}
                          >
                            {name.gender === 'Girl' ? <Girl sx={{ fontSize: 11 }} /> : <Boy sx={{ fontSize: 11 }} />}
                            {name.gender}
                          </Box>
                          <Box
                            component="span"
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.3,
                              px: 1,
                              py: 0.2,
                              fontSize: '0.68rem',
                              fontWeight: 500,
                              bgcolor: alpha('#D08B7B', 0.08),
                              color: '#D08B7B',
                            }}
                          >
                            {name.origin}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* How it Works */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="overline" sx={{ color: '#D08B7B', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.72rem', display: 'block', mb: 1, textAlign: 'center' }}>
                How It Works
              </Typography>
              <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 1.5, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Finding the Perfect Name
              </Typography>
            </Box>
          </motion.div>
          <Grid container spacing={4}>
            {[
              { step: '01', title: 'Browse & Search', desc: 'Explore our curated collection of names, filter by gender, origin, or use our smart search.', icon: <Search sx={{ fontSize: 28, color: '#fff' }} /> },
              { step: '02', title: 'Discover Meaning', desc: 'Learn the beautiful meanings and cultural origins behind every name in our collection.', icon: <AutoAwesome sx={{ fontSize: 28, color: '#fff' }} /> },
              { step: '03', title: 'Save Favorites', desc: 'Create your shortlist of top names and share your favorites with your partner or family.', icon: <Favorite sx={{ fontSize: 28, color: '#fff' }} /> },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={item.step}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.3 }} whileHover={{ y: -2 }}>
                  <Box sx={{ p: 3, border: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, height: '100%', transition: 'all 0.2s ease', '&:hover': { boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                      <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#D08B7B', color: '#fff' }}>
                        {item.icon}
                      </Box>
                      <Typography variant="overline" sx={{ color: '#D08B7B', letterSpacing: '0.15em', fontWeight: 700, fontSize: '0.72rem' }}>
                        Step {item.step}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: 1, fontSize: '1.05rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.875rem' }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Features */}
      <Box sx={{ bgcolor: custom.sectionAlt, borderTop: `1px solid ${custom.borderLight}`, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
                  <Typography variant="overline" sx={{ color: '#D08B7B', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.72rem', display: 'block', mb: 1 }}>
                    Why Choose Us
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                    Everything You Need to Find the Perfect Name
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                    Our carefully curated collection helps expecting parents find meaningful names from diverse cultures and traditions around the world.
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<ArrowRight sx={{ fontSize: 18 }} />}
                    onClick={() => navigate('/boy-names')}
                  >
                    Start Exploring
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  {features.map((feat, i) => (
                    <Grid item xs={12} key={i}>
                      <motion.div variants={fadeInUp} transition={{ duration: 0.3 }} whileHover={{ y: -2 }}>
                        <Box sx={{ p: 2.5, border: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, display: 'flex', alignItems: 'flex-start', gap: 2, transition: 'all 0.2s ease', '&:hover': { boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)' } }}>
                          <Box sx={{ mt: 0.3 }}>{feat.icon}</Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                              {feat.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                              {feat.desc}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          <Grid container spacing={2} justifyContent="center">
            {[
              { num: '1,000+', label: 'Curated Names' },
              { num: '5', label: 'Categories' },
              { num: '100%', label: 'Free Access' },
              { num: '50+', label: 'Origins' },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} md={2.4} key={i}>
                <motion.div variants={fadeInUp} transition={{ duration: 0.3 }} whileHover={{ y: -2 }}>
                  <Box sx={{ p: 3, textAlign: 'center', border: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, transition: 'all 0.2s ease', '&:hover': { boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)' } }}>
                    <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#D08B7B', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.8rem' } }}>
                      {stat.num}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.8rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: custom.sectionAlt, borderTop: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                  Ready to Find the Perfect Name?
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 420, mx: 'auto', lineHeight: 1.7 }}>
                  Start exploring our curated collection of beautiful names and discover the one that speaks to your heart.
                </Typography>
                <Button variant="contained" size="large" endIcon={<ArrowForward sx={{ fontSize: 18 }} />} onClick={() => navigate('/boy-names')} sx={{ px: 5 }}>
                  Browse All Names
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
