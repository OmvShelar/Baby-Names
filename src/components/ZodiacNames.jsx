import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  Search as SearchIcon,
  EmojiEmotions as ZodiacIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Zodiac names data for both boys and girls
const zodiacNamesData = {
  boy: [
    { name: 'Aries: Advait', meaning: 'Unique (Aries energy)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Aries' },
    { name: 'Taurus: Bodhi', meaning: 'Enlightenment (Taurus stability)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Taurus' },
    { name: 'Gemini: Chirag', meaning: 'Light (Gemini brightness)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Gemini' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer intuition)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Cancer' },
    { name: 'Leo: Leo', meaning: 'Lion (Leo strength)', origin: 'Latin', popularity: 'High', gender: 'boy', zodiac: 'Leo' },
    { name: 'Virgo: Varun', meaning: 'Water god (Virgo purity)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Virgo' },
    { name: 'Libra: Samarth', meaning: 'Capable (Libra balance)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Libra' },
    { name: 'Scorpio: Rudra', meaning: 'Fearsome (Scorpio intensity)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Scorpio' },
    { name: 'Sagittarius: Arnav', meaning: 'Ocean (Sagittarius adventure)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Sagittarius' },
    { name: 'Capricorn: Mahir', meaning: 'Expert (Capricorn wisdom)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Capricorn' },
    { name: 'Aquarius: Akash', meaning: 'Sky (Aquarius freedom)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Aquarius' },
    { name: 'Pisces: Neel', meaning: 'Blue (Pisces depth)', origin: 'Sanskrit', popularity: 'Medium', gender: 'boy', zodiac: 'Pisces' },
  ],
  girl: [
    { name: 'Aries: Aarini', meaning: 'Adventurous (Aries energy)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Aries' },
    { name: 'Taurus: Tara', meaning: 'Star (Taurus beauty)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Taurus' },
    { name: 'Gemini: Gauri', meaning: 'Fair (Gemini charm)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Gemini' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer sensitivity)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Cancer' },
    { name: 'Leo: Lavanya', meaning: 'Grace (Leo elegance)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Leo' },
    { name: 'Virgo: Veda', meaning: 'Knowledge (Virgo wisdom)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Virgo' },
    { name: 'Libra: Samaira', meaning: 'Enchanting (Libra harmony)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Libra' },
    { name: 'Scorpio: Reya', meaning: 'Queen (Scorpio power)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Scorpio' },
    { name: 'Sagittarius: Riya', meaning: 'Singer (Sagittarius expression)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Sagittarius' },
    { name: 'Capricorn: Mira', meaning: 'Wonderful (Capricorn strength)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Capricorn' },
    { name: 'Aquarius: Aria', meaning: 'Air (Aquarius freedom)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Aquarius' },
    { name: 'Pisces: Meera', meaning: 'Ocean (Pisces depth)', origin: 'Sanskrit', popularity: 'Medium', gender: 'girl', zodiac: 'Pisces' },
  ],
};

const ZodiacNames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (name) => {
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(fav => fav !== name)
        : [...prev, name]
    );
  };

  const filterNames = (names) => {
    if (!searchTerm) return names;
    return names.filter(name =>
      name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.zodiac.toLowerCase().includes(searchTerm.toLowerCase())
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
            <ZodiacIcon
              sx={{
                fontSize: 48,
                color: nameData.gender === 'boy' ? '#1976D2' : '#C2185B',
                mb: 1
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                color: nameData.gender === 'boy' ? '#1976D2' : '#C2185B',
                mb: 1,
              }}
            >
              {nameData.name}
            </Typography>
            <Chip
              label={nameData.gender === 'boy' ? 'Boy' : 'Girl'}
              size="small"
              sx={{
                backgroundColor: nameData.gender === 'boy' ? '#E3F2FD' : '#FCE4EC',
                color: nameData.gender === 'boy' ? '#1976D2' : '#C2185B',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
              }}
            />
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
              label={`Zodiac: ${nameData.zodiac}`}
              size="small"
              sx={{
                backgroundColor: '#E0E0E0',
                color: '#333',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
                mb: 1,
              }}
            />
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

  const renderGenderContent = (gender) => {
    const names = filterNames(zodiacNamesData[gender] || []);
    return (
      <Grid container spacing={3}>
        {names.map((nameData, index) => renderNameCard(nameData, index))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDE7', pt: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#FFC107',
              color: 'white',
              '&:hover': {
                backgroundColor: '#FF8F00',
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
                color: '#FFC107',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <ZodiacIcon sx={{ fontSize: 40 }} />
              Zodiac Baby Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Names inspired by zodiac signs and astrological meanings
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4, backgroundColor: 'white', borderRadius: 3, p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search zodiac names, signs, or meanings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                fontFamily: '"Poppins", sans-serif',
              },
            }}
          />
        </Box>

        {/* Gender Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              p: 1,
              '& .MuiTab-root': {
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                minHeight: 64,
                borderRadius: 2,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FFC107',
                borderRadius: 2,
              },
            }}
          >
            <Tab
              label={`👦 Zodiac Boy Names (${filterNames(zodiacNamesData.boy || []).length})`}
              sx={{
                color: activeTab === 0 ? '#1976D2' : '#666',
                '&.Mui-selected': {
                  color: '#1976D2',
                  backgroundColor: '#E3F2FD',
                },
              }}
            />
            <Tab
              label={`👧 Zodiac Girl Names (${filterNames(zodiacNamesData.girl || []).length})`}
              sx={{
                color: activeTab === 1 ? '#C2185B' : '#666',
                '&.Mui-selected': {
                  color: '#C2185B',
                  backgroundColor: '#FCE4EC',
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 3, p: 3, mb: 4 }}>
          {activeTab === 0 && (
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
                <ZodiacIcon />
                Zodiac Boy Names
              </Typography>
              {renderGenderContent('boy')}
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#C2185B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <ZodiacIcon />
                Zodiac Girl Names
              </Typography>
              {renderGenderContent('girl')}
            </Box>
          )}
        </Box>

        {/* No Results */}
        {searchTerm && filterNames(zodiacNamesData.boy.concat(zodiacNamesData.girl)).length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: '#666',
                mb: 2,
              }}
            >
              No zodiac names found matching "{searchTerm}"
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: '#999',
              }}
            >
              Try searching with different zodiac signs or keywords
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ZodiacNames;
