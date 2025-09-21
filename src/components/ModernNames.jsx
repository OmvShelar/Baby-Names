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
  Brightness6 as ModernIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Modern names data for both boys and girls
const modernNamesData = {
  boy: [
    { name: 'Leo', meaning: 'Lion', origin: 'Latin', popularity: 'High', gender: 'boy' },
    { name: 'Noah', meaning: 'Rest, peace', origin: 'Hebrew', popularity: 'High', gender: 'boy' },
    { name: 'Liam', meaning: 'Strong-willed warrior', origin: 'Irish', popularity: 'High', gender: 'boy' },
    { name: 'Ethan', meaning: 'Strong, firm', origin: 'Hebrew', popularity: 'High', gender: 'boy' },
    { name: 'Mason', meaning: 'Stone worker', origin: 'English', popularity: 'High', gender: 'boy' },
    { name: 'Lucas', meaning: 'Light-giving', origin: 'Latin', popularity: 'High', gender: 'boy' },
    { name: 'Oliver', meaning: 'Olive tree', origin: 'Latin', popularity: 'High', gender: 'boy' },
    { name: 'Elijah', meaning: 'Yahweh is my God', origin: 'Hebrew', popularity: 'High', gender: 'boy' },
    { name: 'James', meaning: 'Supplanter', origin: 'Hebrew', popularity: 'High', gender: 'boy' },
    { name: 'William', meaning: 'Resolute protector', origin: 'German', popularity: 'High', gender: 'boy' },
    { name: 'Benjamin', meaning: 'Son of the right hand', origin: 'Hebrew', popularity: 'Medium', gender: 'boy' },
    { name: 'Henry', meaning: 'Ruler of the home', origin: 'German', popularity: 'Medium', gender: 'boy' },
  ],
  girl: [
    { name: 'Emma', meaning: 'Universal, whole', origin: 'German', popularity: 'High', gender: 'girl' },
    { name: 'Olivia', meaning: 'Olive tree', origin: 'Latin', popularity: 'High', gender: 'girl' },
    { name: 'Ava', meaning: 'Bird, life', origin: 'Latin', popularity: 'High', gender: 'girl' },
    { name: 'Sophia', meaning: 'Wisdom', origin: 'Greek', popularity: 'High', gender: 'girl' },
    { name: 'Isabella', meaning: 'Devoted to God', origin: 'Hebrew', popularity: 'High', gender: 'girl' },
    { name: 'Mia', meaning: 'Mine, beloved', origin: 'Scandinavian', popularity: 'High', gender: 'girl' },
    { name: 'Charlotte', meaning: 'Free woman', origin: 'French', popularity: 'High', gender: 'girl' },
    { name: 'Amelia', meaning: 'Work, industrious', origin: 'Latin', popularity: 'High', gender: 'girl' },
    { name: 'Harper', meaning: 'Harp player', origin: 'English', popularity: 'High', gender: 'girl' },
    { name: 'Evelyn', meaning: 'Desired, wished for', origin: 'English', popularity: 'High', gender: 'girl' },
    { name: 'Abigail', meaning: 'Father\'s joy', origin: 'Hebrew', popularity: 'Medium', gender: 'girl' },
    { name: 'Ella', meaning: 'Beautiful fairy', origin: 'English', popularity: 'Medium', gender: 'girl' },
  ],
};

const ModernNames = () => {
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
      name.origin.toLowerCase().includes(searchTerm.toLowerCase())
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
            <ModernIcon
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
    const names = filterNames(modernNamesData[gender] || []);
    return (
      <Grid container spacing={3}>
        {names.map((nameData, index) => renderNameCard(nameData, index))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F3E5F5', pt: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#9C27B0',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7B1FA2',
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
                color: '#9C27B0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <ModernIcon sx={{ fontSize: 40 }} />
              Modern Baby Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Contemporary and trendy names that are popular today
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4, backgroundColor: 'white', borderRadius: 3, p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search names, meanings, or origins..."
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
                backgroundColor: '#9C27B0',
                borderRadius: 2,
              },
            }}
          >
            <Tab
              label={`👦 Modern Boy Names (${filterNames(modernNamesData.boy || []).length})`}
              sx={{
                color: activeTab === 0 ? '#1976D2' : '#666',
                '&.Mui-selected': {
                  color: '#1976D2',
                  backgroundColor: '#E3F2FD',
                },
              }}
            />
            <Tab
              label={`👧 Modern Girl Names (${filterNames(modernNamesData.girl || []).length})`}
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
                <ModernIcon />
                Modern Boy Names
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
                <ModernIcon />
                Modern Girl Names
              </Typography>
              {renderGenderContent('girl')}
            </Box>
          )}
        </Box>

        {/* No Results */}
        {searchTerm && filterNames(modernNamesData.boy.concat(modernNamesData.girl)).length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: '#666',
                mb: 2,
              }}
            >
              No modern names found matching "{searchTerm}"
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: '#999',
              }}
            >
              Try searching with different keywords
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ModernNames;
