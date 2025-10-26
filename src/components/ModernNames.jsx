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
import { ModernIcon, BoyIcon, GirlIcon } from './icons/CustomIcons';
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

  const renderGenderContent = (gender) => {
    const names = filterNames(modernNamesData[gender] || []);
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
                backgroundColor: '#F3E5F5',
                borderRadius: 0,
                '& th': {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#9C27B0',
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
            {names.map((nameData, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#f9f9f9',
                  },
                  '&:hover': {
                    backgroundColor: '#F3E5F5',
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
                <TableCell sx={{ fontWeight: 600, color: gender === 'boy' ? '#1976D2' : '#C2185B' }}>
                  {nameData.name}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        <Box sx={{ mb: 4, backgroundColor: 'white', borderRadius: 0, p: 3 }}>
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
                backgroundColor: '#9C27B0',
                borderRadius: 0,
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
