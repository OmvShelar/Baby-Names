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
import { BoyIcon, IndianFlagIcon, GodIcon, ModernIcon, ZodiacIcon } from './icons/CustomIcons';
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const subcategories = [
    { key: 'indian', label: 'Indian Names', icon: <IndianFlagIcon />, count: boyNamesData.indian.length },
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

  const renderSubcategoryContent = (subcategory) => {
    const names = boyNamesData[subcategory] || [];
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
                backgroundColor: '#E3F2FD',
                '& th': {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#1976D2',
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
                      backgroundColor: '#E3F2FD',
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
                      <TableCell sx={{ fontWeight: 600, color: '#1976D2' }}>{parsedName}</TableCell>
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
                      <TableCell sx={{ fontWeight: 600, color: '#1976D2' }}>{nameData.name}</TableCell>
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
                backgroundColor: '#1976D2',
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
                      backgroundColor: '#E3F2FD',
                      '& th': {
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: '#1976D2',
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
                    const allNames = Object.values(boyNamesData).flat();
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
                            backgroundColor: '#E3F2FD',
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
                        <TableCell sx={{ fontWeight: 600, color: '#1976D2' }}>{parsedName}</TableCell>
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

export default BoyNames;
