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

// Zodiac signs data with proper symbols and names
const zodiacSigns = [
  { name: 'Aries', symbol: '♈', date: 'Mar 21 - Apr 19', element: 'Fire', color: '#FF6B6B' },
  { name: 'Taurus', symbol: '♉', date: 'Apr 20 - May 20', element: 'Earth', color: '#4ECDC4' },
  { name: 'Gemini', symbol: '♊', date: 'May 21 - Jun 20', element: 'Air', color: '#45B7D1' },
  { name: 'Cancer', symbol: '♋', date: 'Jun 21 - Jul 22', element: 'Water', color: '#96CEB4' },
  { name: 'Leo', symbol: '♌', date: 'Jul 23 - Aug 22', element: 'Fire', color: '#FFEAA7' },
  { name: 'Virgo', symbol: '♍', date: 'Aug 23 - Sep 22', element: 'Earth', color: '#DDA0DD' },
  { name: 'Libra', symbol: '♎', date: 'Sep 23 - Oct 22', element: 'Air', color: '#98D8C8' },
  { name: 'Scorpio', symbol: '♏', date: 'Oct 23 - Nov 21', element: 'Water', color: '#F7DC6F' },
  { name: 'Sagittarius', symbol: '♐', date: 'Nov 22 - Dec 21', element: 'Fire', color: '#BB8FCE' },
  { name: 'Capricorn', symbol: '♑', date: 'Dec 22 - Jan 19', element: 'Earth', color: '#85C1E9' },
  { name: 'Aquarius', symbol: '♒', date: 'Jan 20 - Feb 18', element: 'Air', color: '#F8C471' },
  { name: 'Pisces', symbol: '♓', date: 'Feb 19 - Mar 20', element: 'Water', color: '#82E0AA' },
];

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
    { name: 'Aries: Advait', meaning: 'Unique (Aries energy)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Aries' },
    { name: 'Taurus: Bodhi', meaning: 'Enlightenment (Taurus stability)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Taurus' },
    { name: 'Gemini: Chirag', meaning: 'Light (Gemini brightness)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Gemini' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer intuition)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Cancer' },
    { name: 'Leo: Leo', meaning: 'Lion (Leo strength)', origin: 'Latin', popularity: 'High', zodiac: 'Leo' },
    { name: 'Virgo: Varun', meaning: 'Water god (Virgo purity)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Virgo' },
    { name: 'Libra: Samarth', meaning: 'Capable (Libra balance)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Libra' },
    { name: 'Scorpio: Rudra', meaning: 'Fearsome (Scorpio intensity)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Scorpio' },
  ],
};

// Zodiac names data - 4 names per zodiac sign
const zodiacNamesData = {
  aries: [
    { name: 'Advait', meaning: 'Unique, non-dual', origin: 'Sanskrit' },
    { name: 'Aryan', meaning: 'Noble, warrior', origin: 'Sanskrit' },
    { name: 'Agni', meaning: 'Fire, flame', origin: 'Sanskrit' },
    { name: 'Aakash', meaning: 'Sky, heaven', origin: 'Sanskrit' },
  ],
  taurus: [
    { name: 'Bodhi', meaning: 'Enlightenment, wisdom', origin: 'Sanskrit' },
    { name: 'Bharat', meaning: 'India, universal monarch', origin: 'Sanskrit' },
    { name: 'Bhavin', meaning: 'Winner, achiever', origin: 'Sanskrit' },
    { name: 'Brijesh', meaning: 'Lord Krishna', origin: 'Sanskrit' },
  ],
  gemini: [
    { name: 'Chirag', meaning: 'Lamp, light', origin: 'Sanskrit' },
    { name: 'Chaitanya', meaning: 'Consciousness, life', origin: 'Sanskrit' },
    { name: 'Charan', meaning: 'Feet, humble', origin: 'Sanskrit' },
    { name: 'Chetan', meaning: 'Conscious, aware', origin: 'Sanskrit' },
  ],
  cancer: [
    { name: 'Chandra', meaning: 'Moon, shining', origin: 'Sanskrit' },
    { name: 'Chirayu', meaning: 'Long-lived', origin: 'Sanskrit' },
    { name: 'Chintan', meaning: 'Meditation, thought', origin: 'Sanskrit' },
    { name: 'Chiranjiv', meaning: 'Immortal, long-lived', origin: 'Sanskrit' },
  ],
  leo: [
    { name: 'Leo', meaning: 'Lion, brave', origin: 'Latin' },
    { name: 'Lakshya', meaning: 'Target, goal', origin: 'Sanskrit' },
    { name: 'Lavish', meaning: 'Rich, handsome', origin: 'Sanskrit' },
    { name: 'Lohit', meaning: 'Red, made of copper', origin: 'Sanskrit' },
  ],
  virgo: [
    { name: 'Varun', meaning: 'Water god, rain god', origin: 'Sanskrit' },
    { name: 'Vihan', meaning: 'Dawn, morning', origin: 'Sanskrit' },
    { name: 'Viraj', meaning: 'Resplendent, splendid', origin: 'Sanskrit' },
    { name: 'Vishal', meaning: 'Huge, broad', origin: 'Sanskrit' },
  ],
  libra: [
    { name: 'Samarth', meaning: 'Capable, powerful', origin: 'Sanskrit' },
    { name: 'Samir', meaning: 'Wind, gentle breeze', origin: 'Sanskrit' },
    { name: 'Sanjay', meaning: 'Victorious, triumphant', origin: 'Sanskrit' },
    { name: 'Sarvesh', meaning: 'Lord of all', origin: 'Sanskrit' },
  ],
  scorpio: [
    { name: 'Rudra', meaning: 'Fearsome, terrible', origin: 'Sanskrit' },
    { name: 'Rishi', meaning: 'Sage, saint', origin: 'Sanskrit' },
    { name: 'Rohit', meaning: 'Red, sun', origin: 'Sanskrit' },
    { name: 'Rajeev', meaning: 'Lotus, blue lotus', origin: 'Sanskrit' },
  ],
  sagittarius: [
    { name: 'Sagar', meaning: 'Ocean, sea', origin: 'Sanskrit' },
    { name: 'Siddharth', meaning: 'Enlightened one', origin: 'Sanskrit' },
    { name: 'Surya', meaning: 'Sun, sun god', origin: 'Sanskrit' },
    { name: 'Soham', meaning: 'I am He', origin: 'Sanskrit' },
  ],
  capricorn: [
    { name: 'Dhruv', meaning: 'Pole star, firm', origin: 'Sanskrit' },
    { name: 'Darsh', meaning: 'Lord Krishna', origin: 'Sanskrit' },
    { name: 'Dev', meaning: 'God, divine', origin: 'Sanskrit' },
    { name: 'Daksh', meaning: 'Capable, competent', origin: 'Sanskrit' },
  ],
  aquarius: [
    { name: 'Aarav', meaning: 'Peaceful, calm', origin: 'Sanskrit' },
    { name: 'Advait', meaning: 'Unique, non-dual', origin: 'Sanskrit' },
    { name: 'Arjun', meaning: 'Bright, shining', origin: 'Sanskrit' },
    { name: 'Aniket', meaning: 'Lord Shiva', origin: 'Sanskrit' },
  ],
  pisces: [
    { name: 'Piyush', meaning: 'Nectar, milk', origin: 'Sanskrit' },
    { name: 'Pranav', meaning: 'Sacred syllable Om', origin: 'Sanskrit' },
    { name: 'Prithvi', meaning: 'Earth, world', origin: 'Sanskrit' },
    { name: 'Purab', meaning: 'East, eastern', origin: 'Sanskrit' },
  ],
};

const BoyNames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const subcategories = [
    { key: 'indian', label: 'Indian Names', icon: <IndianIcon />, count: boyNamesData.indian.length },
    { key: 'god', label: 'God Names', icon: <GodIcon />, count: boyNamesData.god.length },
    { key: 'modern', label: 'Modern Names', icon: <ModernIcon />, count: boyNamesData.modern.length },
    { key: 'zodiac', label: 'Zodiac Names', icon: <ZodiacIcon />, count: zodiacSigns.length },
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

  const renderZodiacSignCard = (sign, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          },
        }}
        onClick={() => navigate(`/boy-names/zodiac/${sign.name.toLowerCase()}`)}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '4rem',
                color: sign.color,
                mb: 1,
              }}
            >
              {sign.symbol}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                color: '#1976D2',
                mb: 1,
              }}
            >
              {sign.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mb: 1,
              }}
            >
              {sign.date}
            </Typography>
            <Chip
              label={sign.element}
              size="small"
              sx={{
                backgroundColor: sign.color + '20',
                color: sign.color,
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
    if (subcategory === 'zodiac') {
      return (
        <Grid container spacing={3}>
          {zodiacSigns.map((sign, index) => renderZodiacSignCard(sign, index))}
        </Grid>
      );
    }

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
