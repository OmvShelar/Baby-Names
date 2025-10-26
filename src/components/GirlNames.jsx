import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
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
} from '@mui/icons-material';
import { GirlIcon, IndianFlagIcon, GoddessIcon, ModernIcon, ZodiacIcon } from './icons/CustomIcons';
import { useNavigate } from 'react-router-dom';

// Sample girl names data with more details
const girlNamesData = {
  indian: [
    { name: 'Aaradhya', meaning: 'Worshipped, blessed', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Anaya', meaning: 'Caring, concern', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Diya', meaning: 'Light, lamp', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Isha', meaning: 'Goddess, ruler', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Kiara', meaning: 'Dark-haired', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Myra', meaning: 'Beloved, admirable', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Zara', meaning: 'Princess, flower', origin: 'Arabic', popularity: 'Medium' },
  ],
  goddess: [
    { name: 'Lakshmi', meaning: 'Goddess of wealth', origin: 'Hindu', popularity: 'High' },
    { name: 'Saraswati', meaning: 'Goddess of knowledge', origin: 'Hindu', popularity: 'High' },
    { name: 'Durga', meaning: 'Invincible goddess', origin: 'Hindu', popularity: 'High' },
    { name: 'Kali', meaning: 'Dark goddess', origin: 'Hindu', popularity: 'Medium' },
    { name: 'Parvati', meaning: 'Daughter of mountains', origin: 'Hindu', popularity: 'High' },
    { name: 'Radha', meaning: 'Success, prosperity', origin: 'Hindu', popularity: 'High' },
    { name: 'Sita', meaning: 'Furrow, wife of Lord Ram', origin: 'Hindu', popularity: 'High' },
    { name: 'Ganga', meaning: 'Sacred river', origin: 'Hindu', popularity: 'Medium' },
  ],
  modern: [
    { name: 'Emma', meaning: 'Universal, whole', origin: 'German', popularity: 'High' },
    { name: 'Olivia', meaning: 'Olive tree', origin: 'Latin', popularity: 'High' },
    { name: 'Ava', meaning: 'Bird, life', origin: 'Latin', popularity: 'High' },
    { name: 'Sophia', meaning: 'Wisdom', origin: 'Greek', popularity: 'High' },
    { name: 'Isabella', meaning: 'Devoted to God', origin: 'Hebrew', popularity: 'High' },
    { name: 'Mia', meaning: 'Mine, beloved', origin: 'Scandinavian', popularity: 'High' },
    { name: 'Charlotte', meaning: 'Free woman', origin: 'French', popularity: 'High' },
    { name: 'Amelia', meaning: 'Work, industrious', origin: 'Latin', popularity: 'High' },
  ],
  zodiac: [
    { name: 'Aries: Aarini', meaning: 'Adventurous (Aries energy)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Taurus: Tara', meaning: 'Star (Taurus beauty)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Gemini: Gauri', meaning: 'Fair (Gemini charm)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Cancer: Chandra', meaning: 'Moon (Cancer sensitivity)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Leo: Lavanya', meaning: 'Grace (Leo elegance)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Virgo: Veda', meaning: 'Knowledge (Virgo wisdom)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Libra: Samaira', meaning: 'Enchanting (Libra harmony)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Scorpio: Reya', meaning: 'Queen (Scorpio power)', origin: 'Sanskrit', popularity: 'Medium' },
  ],
};

const GirlNames = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const subcategories = [
    { key: 'indian', label: 'Indian Names', icon: <IndianFlagIcon />, count: girlNamesData.indian.length },
    { key: 'goddess', label: 'Goddess Names', icon: <GoddessIcon />, count: girlNamesData.goddess.length },
    { key: 'modern', label: 'Modern Names', icon: <ModernIcon />, count: girlNamesData.modern.length },
    { key: 'zodiac', label: 'Zodiac Names', icon: <ZodiacIcon />, count: girlNamesData.zodiac.length },
  ];

  const toggleFavorite = (name) => {
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(fav => fav !== name)
        : [...prev, name]
    );
  };

  const renderSubcategoryContent = (subcategory) => {
    const names = girlNamesData[subcategory] || [];
    const isZodiac = subcategory === 'zodiac';

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
                backgroundColor: '#FCE4EC',
                '& th': {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#C2185B',
                  borderBottom: '2px solid #ddd',
                },
              }}
            >
              {isZodiac ? (
                <>
                  <TableCell>Zodiac Sign</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Meaning</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Popularity</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Meaning</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Popularity</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((nameData, index) => {
              const [sign, parsedName] = isZodiac ? nameData.name.split(': ') : [null, nameData.name];
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&:hover': {
                      backgroundColor: '#FCE4EC',
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
                  {isZodiac ? (
                    <>
                      <TableCell sx={{ fontWeight: 500 }}>{sign}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#C2185B' }}>{parsedName}</TableCell>
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
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ fontWeight: 600, color: '#C2185B' }}>{nameData.name}</TableCell>
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
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
              backgroundColor: '#C2185B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#AD1457',
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
                color: '#C2185B',
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
              borderRadius: 0,
              p: 1,
              '& .MuiTab-root': {
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                minHeight: 64,
                borderRadius: 0,
                mx: 0.5,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#C2185B',
                borderRadius: 0,
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
                  color: activeTab === index ? '#C2185B' : '#666',
                  '&.Mui-selected': {
                    color: '#C2185B',
                    backgroundColor: '#FCE4EC',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 0, p: 3, mb: 4 }}>
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
                      color: '#C2185B',
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
          <Box sx={{ backgroundColor: 'white', borderRadius: 0, p: 3, mb: 4 }}>
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
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflowX: 'auto',
                backgroundColor: 'white',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: '#FCE4EC',
                      '& th': {
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: '#C2185B',
                        borderBottom: '2px solid #ddd',
                      },
                    }}
                  >
                    <TableCell>Name</TableCell>
                    <TableCell>Meaning</TableCell>
                    <TableCell>Origin</TableCell>
                    <TableCell>Popularity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favorites.map((favName, index) => {
                    const allNames = Object.values(girlNamesData).flat();
                    const nameData = allNames.find(n => n.name === favName);
                    if (!nameData) return null;
                    const [sign, parsedName] = nameData.name.includes(': ') ? nameData.name.split(': ') : [null, nameData.name];
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: '#f9f9f9',
                          },
                          '&:hover': {
                            backgroundColor: '#FCE4EC',
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
                        <TableCell sx={{ fontWeight: 600, color: '#C2185B' }}>{parsedName}</TableCell>
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
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GirlNames;
