import React from 'react';
import { Box, IconButton, Typography, Chip } from '@mui/material';
import { Heart, Share2, Copy, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from './FavoritesProvider';

export default function NameCard({ item, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.warn('copy failed', e);
    }
  };

  const share = async () => {
    const payload = `${item.name} — ${item.meaning || ''}`;
    if (navigator.share) {
      try { await navigator.share({ title: item.name, text: payload }); }
      catch (e) { console.warn(e); }
    } else {
      handleCopy(payload);
    }
  };

  return (
    <motion.div whileHover={{ y: -6 }} style={{ height: '100%' }}>
      <Box className="card" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, letterSpacing: 0.6, fontSize: 20 }}>{item.name}</Typography>
          {item.meaning && (
            <Typography sx={{ color: 'var(--text-secondary)', mt: 1 }}>{item.meaning}</Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
            {item.origin && <Chip label={item.origin} size="small" />}
            {item.popularity && <Chip label={item.popularity} size="small" color={item.popularity === 'High' ? 'success' : 'default'} />}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
          <Box>
            <IconButton aria-label="favorite" onClick={() => toggleFavorite(item.name)}>
              <motion.span animate={{ scale: isFavorite(item.name) ? [1, 1.12, 1] : 1 }} style={{ display: 'inline-flex' }}>
                <Heart color={isFavorite(item.name) ? '#E11D48' : undefined} />
              </motion.span>
            </IconButton>

            <IconButton aria-label="share" onClick={share}>
              <Share2 />
            </IconButton>

            <IconButton aria-label="copy" onClick={() => handleCopy(item.name)}>
              <Copy />
            </IconButton>
          </Box>

          <Box>
            <IconButton aria-label="open details" onClick={() => onOpen(item)}>
              <Volume2 />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
