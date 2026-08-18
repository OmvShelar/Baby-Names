import React from 'react';
import { AppBar, Box, IconButton, Typography, Badge, useMediaQuery, useTheme } from '@mui/material';
import { Heart, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesProvider';

export default function Header() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#FCFBF7', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 4 }, py: 1.5 }}>
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontFamily: 'Georgia, "Times New Roman", serif', color: '#0F172A' }} variant={isMobile ? 'h6' : 'h5'}>
            BabyNames
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton aria-label="search" size="large" onClick={() => navigate('/') }>
            <Search size={18} />
          </IconButton>

          <IconButton aria-label="favorites" size="large" onClick={() => navigate('/favorites')}>
            <Badge badgeContent={favorites.length} color="error">
              <Heart />
            </Badge>
          </IconButton>

          <IconButton aria-label="menu" size="large">
            <Menu />
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}
