import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { ZodiacIcon, BoyIcon, GirlIcon } from './icons/CustomIcons';
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

  const renderGenderContent = (gender) => {
    const names = filterNames(zodiacNamesData[gender] || []);
    return (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflowX: 'auto',
          backgroundColor: 'white',
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#FFFDE7',
                borderRadius: 0,
                '& th': {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#FFC107',
                  borderBottom: '2px solid #ddd',
                },
              }}
            >
              <TableCell>Zodiac Sign</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Meaning</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Popularity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((nameData, index) => {
              const [zodiacSign, actualName] = nameData.name.split(': ');
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&:hover': {
                      backgroundColor: '#FFFDE7',
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out',
                    },
                    '& td': {
                      fontFamily: '"Poppins", sans-serif',
                      borderBottom: '1px solid #eee',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#FFC107' }}>
                    {zodiacSign}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: gender === 'boy' ? '#1976D2' : '#C2185B' }}>
                    {actualName}
                  </TableCell>
                  <TableCell>{nameData.meaning}</TableCell>
                  <TableCell>{nameData.origin}</TableCell>
                  <TableCell>
                    <Chip
                      label={nameData.popularity}
                      size="small"
                      sx={{
                        backgroundColor: nameData.popularity === 'High' ? '#E8F5E8' : '#FFF3E0',
                        color: nameData.popularity === 'High' ? '#2E7D32' : '#E65100',
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
        <Box sx={{ mb: 4, backgroundColor: 'white', borderRadius: 0, p: 3 }}>
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
                borderRadius: 0,
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
              borderRadius: 0,
              p: 1,
              '& .MuiTab-root': {
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                minHeight: 64,
                borderRadius: 0,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FFC107',
                borderRadius: 0,
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
        <Box sx={{ backgroundColor: 'white', borderRadius: 0, p: 3, mb: 4 }}>
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
