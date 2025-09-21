import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  ChildCare as BoyIcon,
  Face as IndianIcon,
  Star as GodIcon,
  Brightness6 as ModernIcon,
  EmojiEmotions as ZodiacIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample boy names data with more details
const boyNamesData = {
  indian: [
    { name: 'Aarav', meaning: 'Peaceful, calm', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Vihaan', meaning: 'Dawn, morning', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Arjun', meaning: 'Bright, shining', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Krishna', meaning: 'Dark, attractive', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Rohit', meaning: 'Red, sun', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Siddharth', meaning: 'One who seeks enlightenment', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Advait', meaning: 'Unique, non-dual', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Dhruv', meaning: 'Pole star, firm', origin: 'Sanskrit', popularity: 'Medium' },
  ],
  god: [
    { name: 'Krishna', meaning: 'Dark, attractive', origin: 'Hindu', popularity: 'High' },
    { name: 'Shiva', meaning: 'Auspicious one', origin: 'Hindu', popularity: 'High' },
    { name: 'Vishnu', meaning: 'All-pervading', origin: 'Hindu', popularity: 'High' },
    { name: 'Ganesh', meaning: 'Lord of success', origin: 'Hindu', popularity: 'High' },
    { name: 'Ram', meaning: 'Pleasing, charming', origin: 'Hindu', popularity: 'High' },
    { name: 'Hanuman', meaning: 'One with powerful jaws', origin: 'Hindu', popularity: 'High' },
    { name: 'Brahma', meaning: 'Creator of universe', origin: 'Hindu', popularity: 'Medium' },
    { name: 'Indra', meaning: 'King of gods', origin: 'Hindu', popularity: 'Medium' },
  ],
  modern: [
    { name: 'Leo', meaning: 'Lion', origin: 'Latin', popularity: 'High' },
    { name: 'Noah', meaning: 'Rest, peace', origin: 'Hebrew', popularity: 'High' },
    { name: 'Liam', meaning: 'Strong-willed warrior', origin: 'Irish', popularity: 'High' },
    { name: 'Ethan', meaning: 'Strong, firm', origin: 'Hebrew', popularity: 'High' },
    { name: 'Mason', meaning: 'Stone worker', origin: 'English', popularity: 'High' },
    { name: 'Lucas', meaning: 'Light-giving', origin: 'Latin', popularity: 'High' },
    { name: 'Oliver', meaning: 'Olive tree', origin: 'Latin', popularity: 'High' },
    { name: 'Elijah', meaning: 'Yahweh is my God', origin: 'Hebrew', popularity: 'High' },
  ],
  zodiac: [
    { name: 'Aries: Advait', meaning: 'Unique (Aries energy)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Taurus: Bodhi', meaning: 'Enlightenment (Taurus stability)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Gemini: Chirag', meaning: 'Light (Gemini brightness)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer intuition)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Leo: Leo', meaning: 'Lion (Leo strength)', origin: 'Latin', popularity: 'High' },
    { name: 'Virgo: Varun', meaning: 'Water god (Virgo purity)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Libra: Samarth', meaning: 'Capable (Libra balance)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Scorpio: Rudra', meaning: 'Fearsome (Scorpio intensity)', origin: 'Sanskrit', popularity: 'Medium' },
  ],
};

const BoyNames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const subcategories = [
    { key: 'indian', label: 'Indian Names', icon: <IndianIcon />, count: boyNamesData.indian.length },
    { key: 'god', label: 'God Names', icon: <GodIcon />, count: boyNamesData.god.length },
    { key: 'modern', label: 'Modern Names', icon: <ModernIcon />, count: boyNamesData.modern.length },
    { key: 'zodiac', label: 'Zodiac Names', icon: <ZodiacIcon />, count: boyNamesData.zodiac.length },
  ];

  const toggleFavorite = (name) => {
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(fav => fav !== name)
        : [...prev, name]
    );
  };

  const renderNameCard = (nameData, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton
              onClick={() => toggleFavorite(nameData.name)}
              sx={{
                color: favorites.includes(nameData.name) ? '#E91E63' : '#CCC',
                '&:hover': {
                  color: '#E91E63',
                },
              }}
            >
              {favorites.includes(nameData.name) ? <HeartIcon /> : <HeartBorderIcon />}
            </IconButton>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <BoyIcon sx={{ fontSize: 48, color: '#1976D2', mb: 1 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                color: '#1976D2',
                mb: 1,
              }}
            >
              {nameData.name}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                color: '#333',
                mb: 1,
              }}
            >
              Meaning: <span style={{ color: '#666' }}>{nameData.meaning}</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                color: '#333',
                mb: 1,
              }}
            >
              Origin: <span style={{ color: '#666' }}>{nameData.origin}</span>
            </Typography>
            <Chip
              label={`Popularity: ${nameData.popularity}`}
              size="small"
              sx={{
                backgroundColor: nameData.popularity === 'High' ? '#E8F5E8' : '#FFF3E0',
                color: nameData.popularity === 'High' ? '#2E7D32' : '#E65100',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderSubcategoryContent = (subcategory) => {
    const names = boyNamesData[subcategory] || [];
    return (
      <Grid container spacing={3}>
        {names.map((nameData, index) => renderNameCard(nameData, index))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E3F2FD', pt: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#1976D2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565C0',
              },
            }}
          >
            <BackIcon />
          </IconButton>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                color: '#1976D2',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <BoyIcon sx={{ fontSize: 40 }} />
              Boy Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Discover strong and meaningful names for your baby boy
            </Typography>
          </Box>
        </Box>

        {/* Subcategories Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              p: 1,
              '& .MuiTab-root': {
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                minHeight: 64,
                borderRadius: 2,
                mx: 0.5,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976D2',
                borderRadius: 2,
              },
            }}
          >
            {subcategories.map((subcategory, index) => (
              <Tab
                key={subcategory.key}
                label={`${subcategory.label} (${subcategory.count})`}
                icon={subcategory.icon}
                iconPosition="start"
                sx={{
                  color: activeTab === index ? '#1976D2' : '#666',
                  '&.Mui-selected': {
                    color: '#1976D2',
                    backgroundColor: '#E3F2FD',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 3, p: 3, mb: 4 }}>
          {subcategories.map((subcategory, index) => (
            <Box key={subcategory.key} hidden={activeTab !== index}>
              {activeTab === index && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      color: '#1976D2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {subcategory.icon}
                    {subcategory.label}
                  </Typography>
                  {renderSubcategoryContent(subcategory.key)}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <Box sx={{ backgroundColor: 'white', borderRadius: 3, p: 3, mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                color: '#E91E63',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <HeartIcon />
              Your Favorites ({favorites.length})
            </Typography>
            <Grid container spacing={3}>
              {favorites.map((favName, index) => {
                const allNames = Object.values(boyNamesData).flat();
                const nameData = allNames.find(n => n.name === favName);
                return nameData ? renderNameCard(nameData, index) : null;
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BoyNames;
