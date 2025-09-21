import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Crown as BoyIcon,
  Sparkles as GirlIcon,
  Heart as HeartIcon,
  Star as StarIcon,
  Zap as ModernIcon,
  Sun as SunIcon,
  Palette as PaletteIcon,
  Smartphone as MobileIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Home = () => {
  const muiTheme = useTheme();
  const { isDarkMode } = useCustomTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();

  const mainCategories = [
    {
      title: 'Boy Names',
      description: 'Discover strong, meaningful names for your baby boy',
      icon: <BoyIcon size={60} />,
      path: '/boy-names',
      color: '#3b82f6',
      bgColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
      textColor: '#3b82f6',
    },
    {
      title: 'Girl Names',
      description: 'Find beautiful, elegant names for your baby girl',
      icon: <GirlIcon size={60} />,
      path: '/girl-names',
      color: '#ec4899',
      bgColor: isDarkMode ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.05)',
      textColor: '#ec4899',
    },
  ];

  const features = [
    {
      title: '🌟 Curated Collections',
      description: 'Hand-picked names from various cultures and traditions',
      icon: <StarIcon size={24} />,
    },
    {
      title: '🔍 Smart Search',
      description: 'Find names by meaning, origin, or popularity',
      icon: <HeartIcon size={24} />,
    },
    {
      title: '❤️ Favorites',
      description: 'Save and organize your favorite names',
      icon: <HeartIcon size={24} />,
    },
    {
      title: '📱 Mobile Friendly',
      description: 'Beautiful experience on all devices',
      icon: <MobileIcon size={24} />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 2,
        background: isDarkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              color: isDarkMode ? '#ffffff' : '#0f172a',
              mb: 3,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              background: isDarkMode
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sweet Baby Names
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: isDarkMode ? '#cbd5e1' : '#475569',
              fontFamily: '"Inter", sans-serif',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Discover the perfect name for your little one with our curated collection of beautiful baby names
          </Typography>
        </Box>

        {/* Main Categories */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {mainCategories.map((category) => (
            <Grid item xs={12} md={6} key={category.title}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0,0,0,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  backgroundColor: category.bgColor,
                  border: `2px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDarkMode
                      ? '0 16px 48px rgba(0,0,0,0.5)'
                      : '0 16px 48px rgba(0,0,0,0.15)',
                    border: `2px solid ${category.color}`,
                  },
                }}
                onClick={() => navigate(category.path)}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3, color: category.color }}>
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      color: category.textColor,
                      mb: 2,
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      fontFamily: '"Inter", sans-serif',
                      mb: 3,
                      fontWeight: 400,
                    }}
                  >
                    {category.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: category.color,
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: category.color,
                        opacity: 0.9,
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Explore Names
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              color: isDarkMode ? '#ffffff' : '#0f172a',
              mb: 6,
              textAlign: 'center',
            }}
          >
            Why Choose Sweet Baby Names?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: isDarkMode
                      ? '0 4px 20px rgba(0,0,0,0.3)'
                      : '0 4px 20px rgba(0,0,0,0.08)',
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: isDarkMode
                        ? '0 8px 30px rgba(0,0,0,0.4)'
                        : '0 8px 30px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 3, color: isDarkMode ? '#6366f1' : '#3b82f6' }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
                        color: isDarkMode ? '#ffffff' : '#0f172a',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? '#cbd5e1' : '#64748b',
                        fontFamily: '"Inter", sans-serif',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: 4,
            p: 5,
            mb: 4,
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              color: isDarkMode ? '#ffffff' : '#0f172a',
              mb: 3,
              textAlign: 'center',
            }}
          >
            Ready to Find the Perfect Name?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? '#cbd5e1' : '#64748b',
              fontFamily: '"Inter", sans-serif',
              mb: 4,
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            Start exploring our collection of beautiful baby names and find the one that speaks to your heart.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/boy-names')}
              startIcon={<BoyIcon size={20} />}
              sx={{
                backgroundColor: '#3b82f6',
                borderRadius: 3,
                px: 5,
                py: 2,
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#2563eb',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Browse Boy Names
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/girl-names')}
              startIcon={<GirlIcon size={20} />}
              sx={{
                backgroundColor: '#ec4899',
                borderRadius: 3,
                px: 5,
                py: 2,
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#db2777',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Browse Girl Names
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
