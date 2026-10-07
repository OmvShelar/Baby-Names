import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
  IconButton,
  Divider,
  Paper,
  Grid,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  AccessTime,
  CalendarToday,
  BookmarkBorder,
  Bookmark,
  Check,
  ArrowForward,
} from '@mui/icons-material';
import { FaWhatsapp, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogsData';
import SEO from './SEO';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug || p.id === slug) || blogPosts[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || true))
    .slice(0, 3);

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage,
    datePublished: '2026-10-01T08:00:00+05:30',
    dateModified: '2026-10-07T08:00:00+05:30',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sweet Baby Names',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sweetbabynames.com/baby-logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sweetbabynames.com/blogs/${post.slug}`,
    },
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      <SEO
        title={post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.tags.join(', ')}
        canonical={`https://sweetbabynames.com/blogs/${post.slug}`}
        ogImage={post.featuredImage}
        ogType="article"
        schema={articleSchema}
      />

      {/* Top Header / Breadcrumbs */}
      <Box sx={{ pt: 4, pb: 2, borderBottom: `1px solid ${custom.borderLight}` }}>
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/blogs')}
            sx={{
              color: 'text.secondary',
              mb: 2,
              '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
            }}
          >
            Back to All Articles
          </Button>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(custom.coral, 0.1),
                  color: custom.coral,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3.1rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 3,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            {post.title}
          </Typography>

          {/* Author & Meta */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              pb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: 48, height: 48, border: `2px solid ${custom.coral}` }}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {post.author.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {post.author.role}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary', fontSize: '0.85rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <CalendarToday sx={{ fontSize: 16 }} />
                <span>{post.publishedAt}</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <AccessTime sx={{ fontSize: 16 }} />
                <span>{post.readTime}</span>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Featured Banner Image */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
        <Box
          component="img"
          src={post.featuredImage}
          alt={post.title}
          sx={{
            width: '100%',
            height: { xs: 260, sm: 380, md: 460 },
            objectFit: 'cover',
            borderRadius: { xs: 3, md: 5 },
            boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
          }}
        />

        {/* Social Share Floating Bar */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            mt: 3,
            borderRadius: 4,
            bgcolor: custom.cardWhite,
            border: `1px solid ${custom.borderLight}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Share sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Share this guide:
            </Typography>
            <IconButton
              component="a"
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#25D366', bgcolor: alpha('#25D366', 0.1), '&:hover': { bgcolor: alpha('#25D366', 0.2) } }}
            >
              <FaWhatsapp size={16} />
            </IconButton>
            <IconButton
              component="a"
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#1DA1F2', bgcolor: alpha('#1DA1F2', 0.1), '&:hover': { bgcolor: alpha('#1DA1F2', 0.2) } }}
            >
              <FaTwitter size={16} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={copied ? 'Link Copied!' : 'Copy Article Link'}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCopyLink}
                startIcon={copied ? <Check /> : null}
                sx={{ borderRadius: 50, px: 2, fontSize: '0.8rem' }}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </Tooltip>
            <IconButton
              onClick={() => setBookmarked(!bookmarked)}
              sx={{ color: bookmarked ? custom.coral : 'text.secondary' }}
            >
              {bookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Box>
        </Paper>

        {/* Article Content */}
        <Box
          sx={{
            mt: 5,
            fontSize: '1.08rem',
            lineHeight: 1.85,
            color: 'text.primary',
            '& h2': {
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: '1.6rem', md: '2.1rem' },
              fontWeight: 700,
              mt: 4,
              mb: 2,
              color: 'text.primary',
            },
            '& h3': {
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              fontWeight: 600,
              mt: 3.5,
              mb: 1.5,
              color: custom.coral,
            },
            '& p': {
              mb: 2.5,
              color: isDark ? '#CBD5E1' : '#475569',
            },
            '& ul, & ol': {
              mb: 3,
              pl: 3,
              '& li': {
                mb: 1,
                color: isDark ? '#CBD5E1' : '#475569',
              },
            },
            '& blockquote': {
              p: 3,
              my: 4,
              borderLeft: `4px solid ${custom.coral}`,
              bgcolor: alpha(custom.coral, 0.06),
              borderRadius: '0 16px 16px 0',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'text.primary',
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA Box */}
        <Paper
          sx={{
            p: 4,
            mt: 6,
            borderRadius: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(custom.coral, 0.12)}, ${alpha(custom.rose, 0.08)})`,
            border: `1px solid ${alpha(custom.coral, 0.25)}`,
          }}
        >
          <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 700 }}>
            Ready to find your favorite names?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 500, mx: 'auto' }}>
            Explore thousands of curated boy and girl names with verified meanings, origins, and zodiac signs.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/boy-names')}
              sx={{ px: 3.5 }}
            >
              Explore Boy Names
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/girl-names')}
              sx={{
                px: 3.5,
                background: custom.girlGradient,
              }}
            >
              Explore Girl Names
            </Button>
          </Box>
        </Paper>

        <Divider sx={{ my: 6 }} />

        {/* Related Articles */}
        <Box>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
            Recommended Articles
          </Typography>
          <Grid container spacing={3}>
            {relatedPosts.map((rel) => (
              <Grid item xs={12} sm={4} key={rel.id}>
                <Paper
                  onClick={() => navigate(`/blogs/${rel.slug}`)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: custom.cardWhite,
                    border: `1px solid ${custom.borderLight}`,
                    borderRadius: 3,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
                      borderColor: custom.coral,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={rel.featuredImage}
                    alt={rel.title}
                    sx={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 2, mb: 1.5 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mb: 1,
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}
                  >
                    {rel.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', mt: 'auto' }}>
                    {rel.readTime} • {rel.publishedAt}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
