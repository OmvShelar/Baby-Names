import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, alpha, useTheme, Skeleton } from '@mui/material';
import { ChildCare, ChildFriendly, Star, Favorite, FavoriteBorder, Public, AutoAwesome, TrendingUp, Translate } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getImage } from '../data/images';

const genderIconMap = {
  boy: <ChildCare sx={{ fontSize: 14 }} />,
  male: <ChildCare sx={{ fontSize: 14 }} />,
  girl: <ChildFriendly sx={{ fontSize: 14 }} />,
  female: <ChildFriendly sx={{ fontSize: 14 }} />,
};

const getGenderIcon = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('girl') || lower.includes('feminine') || lower.includes('female')) return <ChildFriendly sx={{ fontSize: 14 }} />;
  if (lower.includes('boy') || lower.includes('masculine') || lower.includes('male')) return <ChildCare sx={{ fontSize: 14 }} />;
  return <ChildCare sx={{ fontSize: 14 }} />;
};

const getOriginIcon = (origin) => {
  const lower = (origin || '').toLowerCase();
  if (lower.includes('indian') || lower.includes('hindu') || lower.includes('sanskrit')) return <Public sx={{ fontSize: 13 }} />;
  if (lower.includes('modern') || lower.includes('contemporary')) return <TrendingUp sx={{ fontSize: 13 }} />;
  if (lower.includes('zodiac') || lower.includes('astro')) return <Star sx={{ fontSize: 13 }} />;
  if (lower.includes('divine') || lower.includes('goddess') || lower.includes('god')) return <AutoAwesome sx={{ fontSize: 13 }} />;
  return <Translate sx={{ fontSize: 13 }} />;
};

const CardImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fallback = 'https://via.placeholder.com/600x400?text=Baby+Names';

  return (
    <Box sx={{ width: '100%', height: 140, borderRadius: 1, overflow: 'hidden', mb: 1 }}>
      {!loaded && !error && <Skeleton variant="rectangular" width="100%" height="100%" />}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded || error ? 'block' : 'none' }}
      />
    </Box>
  );
};

const NameCard = ({ name, meaning, gender, origin, zodiac, popularity, isFavorite, onToggleFavorite, delay = 0, index }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;
  const i = index || 0;

  const genderLower = (gender || '').toLowerCase();
  const isGirl = genderLower.includes('girl') || genderLower.includes('feminine') || genderLower.includes('female');
  const imageSrc = getImage(name, gender);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay + i * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          p: 2.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: custom.cardWhite,
          border: `1px solid ${custom.borderLight}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative',
          transition: 'all 0.2s ease',
          cursor: 'default',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 3,
            height: '100%',
            background: isGirl
              ? 'linear-gradient(180deg, #C97B84, #D08B7B)'
              : 'linear-gradient(180deg, #6B8FAD, #8BAFC4)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            boxShadow: isDark
              ? '0 4px 16px rgba(0,0,0,0.3)'
              : '0 4px 16px rgba(0,0,0,0.08)',
            border: `1px solid ${isGirl ? '#C97B84' : '#6B8FAD'}`,
            '&::before': { opacity: 1 },
          },
        }}
      >
        {imageSrc && <CardImage src={imageSrc} alt={`${name} image`} />}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.2rem', sm: '1.35rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {name}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(name); }}
            sx={{
              p: 0.5,
              color: isFavorite ? '#E57373' : 'text.secondary',
              '&:hover': { color: '#E57373', transform: 'scale(1.15)' },
              transition: 'all 0.15s ease',
            }}
          >
            {isFavorite ? <Favorite sx={{ fontSize: 18 }} /> : <FavoriteBorder sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>

        {meaning && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              mb: 1.5,
              lineHeight: 1.5,
              fontSize: '0.825rem',
              flex: 1,
            }}
          >
            "{meaning}"
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
          {gender && (
            <Chip
              size="small"
              icon={genderIconMap[genderLower] || getGenderIcon(gender)}
              label={gender}
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: isGirl ? alpha('#C97B84', 0.1) : alpha('#6B8FAD', 0.1),
                color: isGirl ? '#C97B84' : '#6B8FAD',
                border: `1px solid ${isGirl ? alpha('#C97B84', 0.2) : alpha('#6B8FAD', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
          {origin && (
            <Chip
              size="small"
              icon={getOriginIcon(origin)}
              label={origin}
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: alpha(custom.terracotta, 0.08),
                color: custom.terracotta,
                border: `1px solid ${alpha(custom.terracotta, 0.15)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
          {zodiac && (
            <Chip
              size="small"
              icon={<Star sx={{ fontSize: 13 }} />}
              label={zodiac}
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: alpha('#FFB74D', 0.1),
                color: '#E6A03C',
                border: `1px solid ${alpha('#FFB74D', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
          {popularity && (
            <Chip
              size="small"
              icon={<TrendingUp sx={{ fontSize: 13 }} />}
              label={popularity}
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: alpha('#4CAF50', 0.1),
                color: '#4CAF50',
                border: `1px solid ${alpha('#4CAF50', 0.15)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default NameCard;
