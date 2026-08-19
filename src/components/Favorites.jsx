import React from 'react';
import { Box, Typography } from '@mui/material';
import NameGrid from './ui/NameGrid';
import { useFavorites } from './ui/FavoritesProvider';
import { getAllBoyNames } from '../data/names';

export default function Favorites() {
  const { favorites } = useFavorites();
  const allNames = getAllBoyNames();
  const favoriteItems = allNames.filter(n => favorites.includes(n.name));

  return (
    <Box sx={{ minHeight: '80vh', p: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, Georgia, serif', mb: 2 }}>Your Favorites</Typography>
      {favoriteItems.length === 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography>No favorites yet. Tap the heart on any name to save it here.</Typography>
        </Box>
      ) : (
        <NameGrid names={favoriteItems} />
      )}
    </Box>
  );
}
