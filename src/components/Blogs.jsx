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
  ArrowForward,
  AutoAwesome,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories } from '../data/blogsData';
import SEO from './SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      <SEO
        title="Baby Naming Blog & Editorial Guides (2026)"
        description="Comprehensive articles, expert guides, and astrological insights to help parents choose modern, meaningful, and cultural baby names."
        keywords="baby naming blog, 2026 baby names trends, rashi letters guide, sanskrit baby names meanings, twin baby names"
        canonical="https://sweetbabynames.com/blogs"
      />

      {/* Header Banner */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          background: `linear-gradient(180deg, ${custom.heroGradientStart} 0%, ${custom.heroGradientEnd} 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Chip
                  icon={<AutoAwesome sx={{ fontSize: 14 }} />}
                  label="Baby Naming Editorial & Guides"
                  sx={{
                    borderRadius: '3px',
                    bgcolor: alpha(custom.coral, 0.1),
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
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
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
                  maxWidth: 580,
                  mx: 'auto',
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  mb: 3.5,
                }}
              >
                Explore expert advice, cultural origins, astrology guides, and trending collections to illuminate your baby naming journey.
              </Typography>
            </motion.div>

            {/* Search Input */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ maxWidth: 520, mx: 'auto' }}>
                <TextField
                  fullWidth
                  placeholder="Search articles, trends, zodiac guides..."
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
                      borderRadius: '4px',
                      height: 48,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    },
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4.5 }}>
        {/* Category Filter Chips */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.8,
            overflowX: 'auto',
            pb: 1.5,
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
                  px: 1.2,
                  py: 1.8,
                  borderRadius: '3px',
                  fontSize: '0.84rem',
                  fontWeight: active ? 700 : 500,
                  bgcolor: active ? custom.coral : isDark ? alpha('#fff', 0.05) : '#FFFFFF',
                  color: active ? '#FFFFFF' : 'text.primary',
                  border: `1px solid ${active ? custom.coral : custom.borderLight}`,
                  boxShadow: active ? '0 2px 8px rgba(255, 126, 103, 0.25)' : 'none',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: active ? custom.coral : alpha(custom.coral, 0.08),
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Featured Story */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <Box sx={{ mb: 5.5 }}>
            <Typography variant="overline" sx={{ color: custom.coral, letterSpacing: '0.15em', fontWeight: 700, mb: 1, display: 'block' }}>
              FEATURED STORY
            </Typography>
            <Card
              onClick={() => navigate(`/blogs/${featuredPost.slug}`)}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                cursor: 'pointer',
                borderRadius: '4px',
                bgcolor: custom.cardWhite,
                border: `1px solid ${custom.borderLight}`,
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
                  borderColor: custom.coral,
                  '& .featured-img': { transform: 'scale(1.02)' },
                },
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' }, overflow: 'hidden', height: { xs: 220, md: 340 } }}>
                <CardMedia
                  component="img"
                  className="featured-img"
                  image={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
              </Box>
              <CardContent sx={{ width: { xs: '100%', md: '50%' }, p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                  <Chip
                    label="Must Read"
                    size="small"
                    sx={{ borderRadius: '2px', bgcolor: alpha(custom.coral, 0.1), color: custom.coral, fontWeight: 700 }}
                  />
                  <Chip label={featuredPost.readTime} size="small" variant="outlined" sx={{ borderRadius: '2px' }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.35rem', sm: '1.65rem', md: '1.9rem' },
                    lineHeight: 1.25,
                    mb: 1.5,
                  }}
                >
                  {featuredPost.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.65 }}>
                  {featuredPost.excerpt}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Avatar src={featuredPost.author.avatar} alt={featuredPost.author.name} sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                        {featuredPost.author.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {featuredPost.publishedAt}
                      </Typography>
                    </Box>
                  </Box>
                  <Button endIcon={<ArrowForward sx={{ fontSize: 16 }} />} sx={{ borderRadius: '3px', fontWeight: 700 }}>
                    Read
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Articles Grid */}
        <Typography variant="h3" sx={{ mb: 2.5, fontWeight: 700, fontSize: { xs: '1.35rem', md: '1.7rem' } }}>
          {selectedCategory === 'all' ? 'All Articles & Guides' : `${blogCategories.find((c) => c.id === selectedCategory)?.label}`}
          <Typography component="span" variant="body2" sx={{ ml: 1.2, color: 'text.secondary', fontWeight: 500 }}>
            ({filteredPosts.length} articles)
          </Typography>
        </Typography>

        {filteredPosts.length === 0 ? (
          <Paper sx={{ p: 5, textAlign: 'center', bgcolor: custom.cardWhite, borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              No articles match your search
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} sx={{ borderRadius: '3px', mt: 1 }}>
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredPosts.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      bgcolor: custom.cardWhite,
                      border: `1px solid ${custom.borderLight}`,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      transition: 'all 0.22s ease',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
                        borderColor: custom.coral,
                        '& .card-img': { transform: 'scale(1.03)' },
                      },
                    }}
                  >
                    <Box sx={{ height: 190, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        className="card-img"
                        image={post.featuredImage}
                        alt={post.title}
                        sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                        <Chip
                          label={post.tags[0] || 'Guide'}
                          size="small"
                          sx={{
                            borderRadius: '2px',
                            bgcolor: alpha(custom.coral, 0.08),
                            color: custom.coral,
                            fontWeight: 700,
                            fontSize: '0.7rem',
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.74rem' }}>
                          <AccessTime sx={{ fontSize: 13 }} />
                          <span>{post.readTime}</span>
                        </Box>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 700,
                          fontSize: '1.18rem',
                          lineHeight: 1.35,
                          mb: 1.2,
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: '0.84rem',
                          mb: 2,
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
                          pt: 1.5,
                          borderTop: `1px solid ${custom.borderLight}`,
                          mt: 'auto',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 26, height: 26 }} />
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
                          Read <ArrowForward sx={{ fontSize: 12 }} />
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
