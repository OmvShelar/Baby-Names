import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  alpha,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  ChildCare,
  ChildFriendly,
  Star,
  Favorite,
  FavoriteBorder,
  Public,
  TrendingUp,
  VolumeUp,
  Share,
  Check,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function NameCard({
  name,
  meaning,
  gender,
  origin,
  zodiac,
  popularity,
  isFavorite,
  onToggleFavorite,
  delay = 0,
  index = 0,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const custom = theme.palette.custom;

  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const genderLower = (gender || '').toLowerCase();
  const isGirl = genderLower.includes('girl') || genderLower.includes('feminine') || genderLower.includes('female');
  const accentColor = isGirl ? '#E11D48' : '#0284C7';
  const accentBg = isGirl ? alpha('#E11D48', 0.08) : alpha('#0284C7', 0.08);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(name);
    if (!isFavorite) {
      confetti({
        particleCount: 65,
        spread: 55,
        origin: { y: 0.7 },
        colors: isGirl ? ['#E11D48', '#FB7185', '#FF7E67'] : ['#0284C7', '#38BDF8', '#F59E0B'],
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay + (index % 12) * 0.03, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          p: { xs: 2.5, sm: 2.8 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: custom.cardWhite,
          borderRadius: '4px',
          border: `1px solid ${isFavorite ? alpha(accentColor, 0.45) : custom.borderLight}`,
          boxShadow: isDark
            ? '0 2px 10px rgba(0,0,0,0.25)'
            : '0 2px 10px rgba(0,0,0,0.02)',
          position: 'relative',
          transition: 'all 0.22s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 3,
            background: isGirl
              ? 'linear-gradient(90deg, #FB7185, #E11D48)'
              : 'linear-gradient(90deg, #38BDF8, #0284C7)',
            opacity: isFavorite ? 1 : 0.35,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            boxShadow: isDark
              ? '0 8px 24px rgba(0,0,0,0.35)'
              : `0 8px 24px ${alpha(accentColor, 0.08)}`,
            border: `1px solid ${accentColor}`,
            '&::before': { opacity: 1 },
          },
        }}
      >
        {/* Top Header Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.38rem' },
                lineHeight: 1.2,
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </Typography>

            {/* Pronunciation speech button */}
            <Tooltip title={isPlaying ? 'Pronouncing...' : `Listen: pronunciation of "${name}"`}>
              <IconButton
                size="small"
                onClick={handleSpeak}
                sx={{
                  p: 0.4,
                  borderRadius: '3px',
                  color: isPlaying ? accentColor : 'text.secondary',
                  bgcolor: isPlaying ? accentBg : 'transparent',
                  '&:hover': { color: accentColor, bgcolor: accentBg },
                }}
              >
                <VolumeUp sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Tooltip title={copied ? 'Copied!' : 'Copy name'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  p: 0.5,
                  borderRadius: '3px',
                  color: copied ? 'success.main' : 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {copied ? <Check sx={{ fontSize: 17 }} /> : <Share sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>

            <Tooltip title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}>
              <IconButton
                size="small"
                onClick={handleHeartClick}
                sx={{
                  p: 0.5,
                  borderRadius: '3px',
                  color: isFavorite ? '#E11D48' : 'text.secondary',
                  bgcolor: isFavorite ? alpha('#E11D48', 0.08) : 'transparent',
                  '&:hover': {
                    color: '#E11D48',
                    transform: 'scale(1.1)',
                    bgcolor: alpha('#E11D48', 0.12),
                  },
                  transition: 'all 0.18s ease',
                }}
              >
                {isFavorite ? <Favorite sx={{ fontSize: 18 }} /> : <FavoriteBorder sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Meaning */}
        {meaning && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              mb: 2,
              lineHeight: 1.55,
              fontSize: '0.85rem',
              flexGrow: 1,
            }}
          >
            "{meaning}"
          </Typography>
        )}

        {/* Badges / Chips Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 'auto', pt: 1.4, borderTop: `1px solid ${custom.borderLight}` }}>
          {gender && (
            <Chip
              size="small"
              icon={isGirl ? <ChildFriendly sx={{ fontSize: 13 }} /> : <ChildCare sx={{ fontSize: 13 }} />}
              label={gender}
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: accentBg,
                color: accentColor,
                border: `1px solid ${alpha(accentColor, 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}

          {origin && (
            <Chip
              size="small"
              icon={<Public sx={{ fontSize: 12 }} />}
              label={origin}
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha(custom.coral, 0.08),
                color: custom.coral,
                border: `1px solid ${alpha(custom.coral, 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}

          {zodiac && (
            <Chip
              size="small"
              icon={<Star sx={{ fontSize: 12 }} />}
              label={zodiac}
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha('#8B5CF6', 0.08),
                color: '#8B5CF6',
                border: `1px solid ${alpha('#8B5CF6', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}

          {popularity && (
            <Chip
              size="small"
              icon={<TrendingUp sx={{ fontSize: 12 }} />}
              label={popularity}
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha('#10B981', 0.08),
                color: '#10B981',
                border: `1px solid ${alpha('#10B981', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
