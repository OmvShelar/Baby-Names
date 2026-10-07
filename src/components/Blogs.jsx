import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import {
  Search,
  AccessTime,
  CalendarToday,
  ArrowForward,
  AutoAwesome,
  BookOpen,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories } from '../data/blogsData';
import SEO from './SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts[0];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      <SEO
        title="Baby Naming Blog & Editorial Guides (2026)"
        description="Comprehensive articles, expert guides, and astrological insights to help parents choose modern, meaningful, and cultural baby names."
        keywords="baby naming blog, 2026 baby names trends, rashi letters guide, sanskrit baby names meanings, twin baby names"
        canonical="https://sweetbabynames.com/blogs"
      />

      {/* Header Banner */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: `linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Chip
                  icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                  label="Baby Naming Editorial & Guides"
                  sx={{
                    bgcolor: alpha(custom.coral, 0.12),
                    color: custom.coral,
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  lineHeight: 1.15,
                }}
              >
                Inspiration, Meaning &amp;{' '}
                <Box component="span" sx={{ color: custom.coral, fontStyle: 'italic' }}>
                  Stories
                </Box>
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                Explore expert advice, cultural origins, astrology guides, and trending collections to illuminate your baby naming journey.
              </Typography>
            </motion.div>

            {/* Search Input */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ maxWidth: 540, mx: 'auto' }}>
                <TextField
                  fullWidth
                  placeholder="Search articles, trends, zodiac guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: custom.cardWhite,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    },
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* Category Filter Pills */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 2,
            mb: 4,
            justifyContent: { xs: 'flex-start', md: 'center' },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {blogCategories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <Chip
                key={cat.id}
                label={cat.label}
                clickable
                onClick={() => setSelectedCategory(cat.id)}
                sx={{
                  px: 1.5,
                  py: 2.2,
                  fontSize: '0.86rem',
                  fontWeight: active ? 700 : 500,
                  bgcolor: active ? custom.coral : isDark ? alpha('#fff', 0.05) : '#FFFFFF',
                  color: active ? '#FFFFFF' : 'text.primary',
                  border: `1px solid ${active ? custom.coral : custom.borderLight}`,
                  boxShadow: active ? '0 4px 14px rgba(255, 126, 103, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: active ? custom.coral : alpha(custom.coral, 0.08),
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Featured Article Card (shown on 'all' without active search) */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, mb: 1, display: 'block' }}>
              FEATURED STORY
            </Typography>
            <Card
              onClick={() => navigate(`/blogs/${featuredPost.slug}`)}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                cursor: 'pointer',
                borderRadius: 4,
                bgcolor: custom.cardWhite,
                border: `1px solid ${custom.borderLight}`,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                  borderColor: custom.coral,
                  '& .featured-img': { transform: 'scale(1.03)' },
                },
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' }, overflow: 'hidden', height: { xs: 240, md: 380 } }}>
                <CardMedia
                  component="img"
                  className="featured-img"
                  image={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
              </Box>
              <CardContent sx={{ width: { xs: '100%', md: '50%' }, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label="Must Read"
                    size="small"
                    sx={{ bgcolor: alpha(custom.coral, 0.12), color: custom.coral, fontWeight: 700 }}
                  />
                  <Chip label={featuredPost.readTime} size="small" variant="outlined" />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.1rem' },
                    lineHeight: 1.25,
                    mb: 2,
                  }}
                >
                  {featuredPost.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                  {featuredPost.excerpt}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={featuredPost.author.avatar} alt={featuredPost.author.name} sx={{ width: 36, height: 36 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        {featuredPost.author.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {featuredPost.publishedAt}
                      </Typography>
                    </Box>
                  </Box>
                  <Button endIcon={<ArrowForward />} sx={{ fontWeight: 700 }}>
                    Read
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Articles Grid */}
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
          {selectedCategory === 'all' ? 'All Articles & Guides' : `${blogCategories.find((c) => c.id === selectedCategory)?.label}`}
          <Typography component="span" variant="body2" sx={{ ml: 1.5, color: 'text.secondary', fontWeight: 500 }}>
            ({filteredPosts.length} articles)
          </Typography>
        </Typography>

        {filteredPosts.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', bgcolor: custom.cardWhite, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              No articles match your criteria
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Try searching with another keyword or pick another category.
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3.5}>
            {filteredPosts.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      borderRadius: 3.5,
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${custom.borderLight}`,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 16px 32px rgba(0,0,0,0.09)',
                        borderColor: custom.coral,
                        '& .card-img': { transform: 'scale(1.05)' },
                      },
                    }}
                  >
                    <Box sx={{ height: 210, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        className="card-img"
                        image={post.featuredImage}
                        alt={post.title}
                        sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Chip
                          label={post.tags[0] || 'Guide'}
                          size="small"
                          sx={{
                            bgcolor: alpha(custom.coral, 0.1),
                            color: custom.coral,
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                          <AccessTime sx={{ fontSize: 13 }} />
                          <span>{post.readTime}</span>
                        </Box>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 700,
                          fontSize: '1.22rem',
                          lineHeight: 1.35,
                          mb: 1.5,
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: '0.85rem',
                          mb: 2.5,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          pt: 2,
                          borderTop: `1px solid ${custom.borderLight}`,
                          mt: 'auto',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 28, height: 28 }} />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {post.author.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: custom.coral,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.3,
                          }}
                        >
                          Read <ArrowForward sx={{ fontSize: 13 }} />
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
