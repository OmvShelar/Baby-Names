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
  const accentColor = isGirl ? '#BE123C' : '#0369A1';
  const accentBg = isGirl ? alpha('#BE123C', 0.06) : alpha('#0369A1', 0.06);

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
        colors: isGirl ? ['#BE123C', '#E11D48', '#C59B27'] : ['#0369A1', '#0284C7', '#C59B27'],
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: delay + (index % 12) * 0.03, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          p: { xs: 2.4, sm: 2.8 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: custom.cardWhite,
          borderRadius: '2px',
          border: `1px solid ${isFavorite ? alpha(accentColor, 0.5) : custom.borderLight}`,
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.02)',
          position: 'relative',
          transition: 'all 0.22s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 2.5,
            background: isGirl
              ? 'linear-gradient(90deg, #E11D48, #BE123C)'
              : 'linear-gradient(90deg, #0284C7, #0369A1)',
            opacity: isFavorite ? 1 : 0.4,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            boxShadow: isDark
              ? '0 8px 24px rgba(0,0,0,0.45)'
              : '0 8px 24px rgba(0,0,0,0.06)',
            borderColor: accentColor,
            '&::before': { opacity: 1 },
          },
        }}
      >
        {/* Top Header Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.2 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: { xs: '1.28rem', sm: '1.42rem' },
                lineHeight: 1.2,
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </Typography>

            {/* Audio Listen Button */}
            <Tooltip title={isPlaying ? 'Playing pronunciation...' : `Listen: how to pronounce "${name}"`}>
              <IconButton
                size="small"
                onClick={handleSpeak}
                sx={{
                  p: 0.4,
                  borderRadius: '2px',
                  color: isPlaying ? accentColor : 'text.tertiary',
                  bgcolor: isPlaying ? accentBg : 'transparent',
                  '&:hover': { color: accentColor, bgcolor: accentBg },
                }}
              >
                <VolumeUp sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Tooltip title={copied ? 'Copied to clipboard' : 'Copy name'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  p: 0.5,
                  borderRadius: '2px',
                  color: copied ? 'success.main' : 'text.tertiary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {copied ? <Check sx={{ fontSize: 16 }} /> : <Share sx={{ fontSize: 15 }} />}
              </IconButton>
            </Tooltip>

            <Tooltip title={isFavorite ? 'Remove from shortlist' : 'Add to shortlist'}>
              <IconButton
                size="small"
                onClick={handleHeartClick}
                sx={{
                  p: 0.5,
                  borderRadius: '2px',
                  color: isFavorite ? '#BE123C' : 'text.tertiary',
                  bgcolor: isFavorite ? alpha('#BE123C', 0.08) : 'transparent',
                  '&:hover': {
                    color: '#BE123C',
                    bgcolor: alpha('#BE123C', 0.12),
                    transform: 'scale(1.1)',
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
              fontSize: '0.86rem',
              flexGrow: 1,
            }}
          >
            "{meaning}"
          </Typography>
        )}

        {/* Badges / Chips Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 'auto', pt: 1.4, borderTop: `1px solid ${custom.borderSubtle}` }}>
          {gender && (
            <Chip
              size="small"
              icon={isGirl ? <ChildFriendly sx={{ fontSize: 12 }} /> : <ChildCare sx={{ fontSize: 12 }} />}
              label={gender}
              sx={{
                height: 22,
                fontSize: '0.68rem',
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
              icon={<Public sx={{ fontSize: 11 }} />}
              label={origin}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha(custom.coral, 0.06),
                color: custom.coral,
                border: `1px solid ${alpha(custom.coral, 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}

          {zodiac && (
            <Chip
              size="small"
              icon={<Star sx={{ fontSize: 11 }} />}
              label={zodiac}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha('#8B5CF6', 0.06),
                color: '#7C3AED',
                border: `1px solid ${alpha('#8B5CF6', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}

          {popularity && (
            <Chip
              size="small"
              icon={<TrendingUp sx={{ fontSize: 11 }} />}
              label={popularity}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha('#059669', 0.06),
                color: '#059669',
                border: `1px solid ${alpha('#059669', 0.2)}`,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
