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
  ChildFriendly as GirlIcon,
  Face as IndianIcon,
  Star as GoddessIcon,
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

// Sample girl names data with more details
const girlNamesData = {
  indian: [
    { name: 'Aaradhya', meaning: 'Worshipped, blessed', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Ananya', meaning: 'Unique, matchless', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Diya', meaning: 'Light, lamp', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Isha', meaning: 'Goddess, divine', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Kavya', meaning: 'Poetry, poem', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Meera', meaning: 'Devotee of Krishna', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Priya', meaning: 'Beloved, dear', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Riya', meaning: 'Singer, graceful', origin: 'Sanskrit', popularity: 'Medium' },
  ],
  goddess: [
    { name: 'Lakshmi', meaning: 'Goddess of wealth', origin: 'Hindu', popularity: 'High' },
    { name: 'Durga', meaning: 'Invincible goddess', origin: 'Hindu', popularity: 'High' },
    { name: 'Saraswati', meaning: 'Goddess of knowledge', origin: 'Hindu', popularity: 'High' },
    { name: 'Kali', meaning: 'Dark goddess', origin: 'Hindu', popularity: 'High' },
    { name: 'Parvati', meaning: 'Daughter of mountains', origin: 'Hindu', popularity: 'High' },
    { name: 'Radha', meaning: 'Success, prosperity', origin: 'Hindu', popularity: 'High' },
    { name: 'Sita', meaning: 'Furrow, wife of Rama', origin: 'Hindu', popularity: 'Medium' },
    { name: 'Ganga', meaning: 'Sacred river', origin: 'Hindu', popularity: 'Medium' },
  ],
  modern: [
    { name: 'Emma', meaning: 'Universal, whole', origin: 'German', popularity: 'High' },
    { name: 'Olivia', meaning: 'Olive tree', origin: 'Latin', popularity: 'High' },
    { name: 'Ava', meaning: 'Bird, life', origin: 'Latin', popularity: 'High' },
    { name: 'Isabella', meaning: 'Devoted to God', origin: 'Hebrew', popularity: 'High' },
    { name: 'Sophia', meaning: 'Wisdom', origin: 'Greek', popularity: 'High' },
    { name: 'Mia', meaning: 'Mine, beloved', origin: 'Scandinavian', popularity: 'High' },
    { name: 'Charlotte', meaning: 'Free woman', origin: 'French', popularity: 'High' },
    { name: 'Amelia', meaning: 'Work, industrious', origin: 'Latin', popularity: 'High' },
  ],
  zodiac: [
    { name: 'Aries: Aadhya', meaning: 'First power (Aries energy)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Aries' },
    { name: 'Taurus: Bhavya', meaning: 'Grand (Taurus stability)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Taurus' },
    { name: 'Gemini: Chhaya', meaning: 'Shadow (Gemini duality)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Gemini' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer intuition)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Cancer' },
    { name: 'Leo: Lavanya', meaning: 'Grace (Leo charm)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Leo' },
    { name: 'Virgo: Vanya', meaning: 'Gracious gift (Virgo purity)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Virgo' },
    { name: 'Libra: Samaira', meaning: 'Enchanting (Libra beauty)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Libra' },
    { name: 'Scorpio: Riddhi', meaning: 'Prosperity (Scorpio intensity)', origin: 'Sanskrit', popularity: 'Medium', zodiac: 'Scorpio' },
  ],
};

// Zodiac names data - 4 names per zodiac sign for girls
const zodiacNamesData = {
  aries: [
    { name: 'Aadhya', meaning: 'First power, goddess Durga', origin: 'Sanskrit' },
    { name: 'Aarushi', meaning: 'First ray of sun', origin: 'Sanskrit' },
    { name: 'Advika', meaning: 'Unique, extraordinary', origin: 'Sanskrit' },
    { name: 'Anaya', meaning: 'Caring, compassionate', origin: 'Sanskrit' },
  ],
  taurus: [
    { name: 'Bhavya', meaning: 'Grand, splendid', origin: 'Sanskrit' },
    { name: 'Bhoomi', meaning: 'Earth, goddess', origin: 'Sanskrit' },
    { name: 'Bina', meaning: 'Understanding, melody', origin: 'Sanskrit' },
    { name: 'Bhavika', meaning: 'Cheerful, expression', origin: 'Sanskrit' },
  ],
  gemini: [
    { name: 'Chhaya', meaning: 'Shadow, reflection', origin: 'Sanskrit' },
    { name: 'Chaitra', meaning: 'First month of Hindu calendar', origin: 'Sanskrit' },
    { name: 'Charvi', meaning: 'Beautiful, intelligent', origin: 'Sanskrit' },
    { name: 'Chandni', meaning: 'Moonlight', origin: 'Sanskrit' },
  ],
  cancer: [
    { name: 'Chandra', meaning: 'Moon, shining', origin: 'Sanskrit' },
    { name: 'Chandrika', meaning: 'Moonlight', origin: 'Sanskrit' },
    { name: 'Charu', meaning: 'Beautiful, attractive', origin: 'Sanskrit' },
    { name: 'Chetana', meaning: 'Consciousness, awareness', origin: 'Sanskrit' },
  ],
  leo: [
    { name: 'Lavanya', meaning: 'Grace, beauty', origin: 'Sanskrit' },
    { name: 'Lakshmi', meaning: 'Goddess of wealth', origin: 'Sanskrit' },
    { name: 'Lata', meaning: 'Creeper, vine', origin: 'Sanskrit' },
    { name: 'Leela', meaning: 'Divine play', origin: 'Sanskrit' },
  ],
  virgo: [
    { name: 'Vanya', meaning: 'Gracious gift of God', origin: 'Sanskrit' },
    { name: 'Veda', meaning: 'Sacred knowledge', origin: 'Sanskrit' },
    { name: 'Vidya', meaning: 'Knowledge, wisdom', origin: 'Sanskrit' },
    { name: 'Vishaka', meaning: 'Star, constellation', origin: 'Sanskrit' },
  ],
  libra: [
    { name: 'Samaira', meaning: 'Enchanting, protected by God', origin: 'Sanskrit' },
    { name: 'Sanjana', meaning: 'Gentle, soft', origin: 'Sanskrit' },
    { name: 'Sarika', meaning: 'Bird, princess', origin: 'Sanskrit' },
    { name: 'Shreya', meaning: 'Auspicious, fortunate', origin: 'Sanskrit' },
  ],
  scorpio: [
    { name: 'Riddhi', meaning: 'Prosperity, success', origin: 'Sanskrit' },
    { name: 'Riya', meaning: 'Singer, graceful', origin: 'Sanskrit' },
    { name: 'Roshni', meaning: 'Light, brightness', origin: 'Sanskrit' },
    { name: 'Ruhani', meaning: 'Spiritual, divine', origin: 'Sanskrit' },
  ],
  sagittarius: [
    { name: 'Sagarika', meaning: 'Ocean, wave', origin: 'Sanskrit' },
    { name: 'Sakshi', meaning: 'Witness, evidence', origin: 'Sanskrit' },
    { name: 'Samriddhi', meaning: 'Prosperity, wealth', origin: 'Sanskrit' },
    { name: 'Sanjivani', meaning: 'Life-giving herb', origin: 'Sanskrit' },
  ],
  capricorn: [
    { name: 'Daksha', meaning: 'Talented, competent', origin: 'Sanskrit' },
    { name: 'Darshana', meaning: 'Vision, sight', origin: 'Sanskrit' },
    { name: 'Deepika', meaning: 'Little lamp', origin: 'Sanskrit' },
    { name: 'Devika', meaning: 'Little goddess', origin: 'Sanskrit' },
  ],
  aquarius: [
    { name: 'Aaravi', meaning: 'Peaceful, calm', origin: 'Sanskrit' },
    { name: 'Advita', meaning: 'Unique, one of a kind', origin: 'Sanskrit' },
    { name: 'Ahana', meaning: 'Dawn, first ray of sun', origin: 'Sanskrit' },
    { name: 'Anika', meaning: 'Grace, brilliance', origin: 'Sanskrit' },
  ],
  pisces: [
    { name: 'Pavani', meaning: 'Pure, sacred', origin: 'Sanskrit' },
    { name: 'Prisha', meaning: 'Beloved, gift of God', origin: 'Sanskrit' },
    { name: 'Purvi', meaning: 'From the east', origin: 'Sanskrit' },
    { name: 'Pari', meaning: 'Fairy, angel', origin: 'Sanskrit' },
  ],
};

const GirlNames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const subcategories = [
    { key: 'indian', label: 'Indian Names', icon: <IndianIcon />, count: girlNamesData.indian.length },
    { key: 'goddess', label: 'Goddess Names', icon: <GoddessIcon />, count: girlNamesData.goddess.length },
    { key: 'modern', label: 'Modern Names', icon: <ModernIcon />, count: girlNamesData.modern.length },
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
            <GirlIcon sx={{ fontSize: 48, color: '#E91E63', mb: 1 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                color: '#E91E63',
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
        onClick={() => navigate(`/girl-names/zodiac/${sign.name.toLowerCase()}`)}
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
                color: '#E91E63',
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

    const names = girlNamesData[subcategory] || [];
    return (
      <Grid container spacing={3}>
        {names.map((nameData, index) => renderNameCard(nameData, index))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FCE4EC', pt: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#E91E63',
              color: 'white',
              '&:hover': {
                backgroundColor: '#C2185B',
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
                color: '#E91E63',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <GirlIcon sx={{ fontSize: 40 }} />
              Girl Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Find beautiful and elegant names for your baby girl
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
                backgroundColor: '#E91E63',
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
                  color: activeTab === index ? '#E91E63' : '#666',
                  '&.Mui-selected': {
                    color: '#E91E63',
                    backgroundColor: '#FCE4EC',
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
                      color: '#E91E63',
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
                const allNames = Object.values(girlNamesData).flat();
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

export default GirlNames;
