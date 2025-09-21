import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  ChildCare as BoyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Aries boy names data
const ariesBoyNames = [
  { name: 'Advait', meaning: 'Unique, non-dual', origin: 'Sanskrit' },
  { name: 'Aryan', meaning: 'Noble, warrior', origin: 'Sanskrit' },
  { name: 'Agni', meaning: 'Fire, flame', origin: 'Sanskrit' },
  { name: 'Aakash', meaning: 'Sky, heaven', origin: 'Sanskrit' },
];

const AriesBoyNames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E3F2FD', pt: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/boy-names')}
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
              <span style={{ fontSize: '2rem' }}>♈</span>
              Aries Boy Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Strong and energetic names for Aries boys (Mar 21 - Apr 19)
            </Typography>
          </Box>
        </Box>

        {/* Names Grid */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 3, p: 3, mb: 4 }}>
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
            ♈ Aries Names ({ariesBoyNames.length})
          </Typography>
          <Grid container spacing={3}>
            {ariesBoyNames.map((nameData, index) => renderNameCard(nameData, index))}
          </Grid>
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
                const nameData = ariesBoyNames.find(n => n.name === favName);
                return nameData ? renderNameCard(nameData, index) : null;
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AriesBoyNames;
