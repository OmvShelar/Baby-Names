import React from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { BoyIcon, GirlIcon } from './icons/CustomIcons';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <ArrowForwardIcon sx={{ color: '#8B5CF6', fontSize: 40 }} />,
    prevArrow: <ArrowBackIcon sx={{ color: '#8B5CF6', fontSize: 40 }} />,
  };

  // Carousel images
  const carouselImages = [
    'https://newcomers.in/wp-content/uploads/Newborn-photoshoot-with-parents-craddle-pose.jpg',
    'https://img.freepik.com/premium-photo/cute-adorable-asian-newborn-baby-girl-sleeping-bed-withpink-flower-foreground_34840-1128.jpg',
    'https://img.freepik.com/free-photo/family-spend-time-summer-garden_1157-37130.jpg'
  ];

  // Categories with images
  const categories = [
    {
      title: 'Boy Names',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0UuGKXhLqW8wfa_0rEhEYj09bNYvHkr0bg&s',
      path: '/boy-names',
      color: '#3b82f6',
    },
    {
      title: 'Girl Names',
      image: 'data:image/jpeg;base64,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',
      path: '/girl-names',
      color: '#ec4899',
    },
    {
      title: 'Indian Names',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/069/791/571/small/smiling-baby-in-knit-hat-cozy-blanket-autumn-background-newbornshoot-free-photo.jpg',
      path: '/indian-names',
      color: '#ff9800',
    },
    {
      title: 'Modern Names',
      image: 'https://img.freepik.com/premium-photo/sleeping-newborn-baby-girl_156881-3565.jpg',
      path: '/modern-names',
      color: '#9c27b0',
    },
    {
      title: 'Zodiac Names',
      image: 'https://www.rd.com/wp-content/uploads/2024/07/Your-Guide-to-Zodiac-Signs-Dates-Traits-and-What-They-Mean_GettyImages-1415803183_GettyImages-985464152_ASedit_STAR_FT_3.jpg',
      path: '/zodiac-names',
      color: '#4caf50',
    },
  ];

  // Features
  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Easy Search',
      description: 'Find names quickly with our powerful search functionality',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Curated Names',
      description: 'Carefully selected names with rich meanings and origins',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Meaningful Origins',
      description: 'Discover the beautiful stories and cultural significance behind each name',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)',
        pt: 2,
      }}
    >
      {/* Hero Section with Carousel */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                color: '#8B4513',
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
              }}
            >
              Sweet Baby Names
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#8B4513',
                fontFamily: '"Poppins", sans-serif',
                mb: 2,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Discover the perfect name for your little one with our curated collection of beautiful baby names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#A0522D',
                fontFamily: '"Poppins", sans-serif',
                mb: 2,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Choosing a baby name is a special journey that connects you to your family's heritage and hopes for the future. Our collection features names from diverse cultures, each carrying unique meanings and stories that can inspire and guide your decision.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#A0522D',
                fontFamily: '"Poppins", sans-serif',
                mb: 2,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Whether you're drawn to traditional names with deep roots or modern ones that reflect contemporary trends, we have thoughtfully curated options to help you find the perfect fit. Explore meanings, origins, and popularity to make an informed and heartfelt choice.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#A0522D',
                fontFamily: '"Poppins", sans-serif',
                mb: 4,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Names are more than words—they're the first gift you give your child, shaping their identity and leaving a lasting legacy. Let us help you embark on this beautiful naming adventure.
            </Typography>
          </Box>

          {/* Carousel */}
          <Box sx={{ mb: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <Slider {...carouselSettings}>
              {carouselImages.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={image}
                    alt={`Baby ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: isMobile ? '50vh' : '80vh',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 700,
                          textAlign: 'center',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          fontSize: isMobile ? '1.5rem' : '3rem',
                        }}
                      >
                        Beautiful Names for Beautiful Babies
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#8B4513',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              mb: 4,
            }}
          >
            Explore Name Categories
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: { sm: 'wrap' },
              justifyContent: { sm: 'center' },
              gap: { xs: 2, sm: 3 },
              overflowX: { xs: 'hidden', sm: 'auto' },
              pb: { sm: 2 },
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                background: '#F5F5F5',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#D3D3D3',
                borderRadius: 4,
              },
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  onClick={() => navigate(category.path)}
                  sx={{
                    width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 20px)', lg: 300 },
                    height: { xs: 200, sm: 250, md: 280 },
                    borderRadius: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease-in-out',
                    flex: { sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 20px)', lg: '0 0 auto' },
                    minWidth: { sm: 280, md: 220 },
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, transparent 0%, ${category.color}40 60%, rgba(0,0,0,0.6) 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      p: 2,
                      pb: 3,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography
                        variant={isMobile ? "h6" : "h4"}
                        sx={{
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 700,
                          textAlign: 'center',
                          textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
                          mb: 1,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          px: 3,
                          py: 1.5,
                          borderRadius: 8,
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          textAlign: 'center',
                          textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                          fontWeight: 500,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          px: 3,
                          py: 1,
                          borderRadius: 8,
                        }}
                      >
                        Click to explore
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ mt: 8, py: 6, backgroundColor: 'rgba(255,248,225,0.8)', borderRadius: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                color: '#8B4513',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                mb: 6,
              }}
            >
              Why Choose Sweet Baby Names?
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: { xs: 3, sm: 4 },
                justifyContent: 'center',
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: { xs: 2, sm: 3 },
                      backgroundColor: 'white',
                      borderRadius: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      border: '1px solid #F5F5F5',
                    }}
                  >
                    <Box sx={{ color: '#8B4513', mb: { xs: 1, sm: 2 } }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        color: '#8B4513',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        mb: { xs: 1, sm: 2 },
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#A0522D',
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
