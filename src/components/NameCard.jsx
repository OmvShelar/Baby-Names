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
  Share,
  Check,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CrownPrinceIcon,
  PrincessTiaraIcon,
  AudioChimeIcon,
  FiligreeHeartIcon,
  VedicLotusIcon,
  AstrologyCompassIcon,
  ModernSparkleIcon,
} from './icons/CustomIcons';

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
  const accentColor = isGirl ? '#E91E8E' : '#008CA8'; // Authentic Magenta vs Authentic Cyan
  const accentBg = isGirl ? alpha('#E91E8E', 0.08) : alpha('#008CA8', 0.08);

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
        colors: isGirl ? ['#FF2E93', '#E91E8E', '#00AEEF'] : ['#00AEEF', '#008CA8', '#E91E8E'],
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
          borderRadius: '2px', // Sharp architectural lines
          border: `1px solid ${isFavorite ? alpha(accentColor, 0.45) : custom.borderLight}`,
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.4)'
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
              ? 'linear-gradient(90deg, #FF2E93 0%, #E91E8E 100%)'
              : 'linear-gradient(90deg, #00AEEF 0%, #008CA8 100%)',
            opacity: isFavorite ? 1 : 0.6,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            boxShadow: isDark
              ? '0 8px 24px rgba(0,0,0,0.5)'
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
                fontFamily: '"Philosopher", "Marcellus", Georgia, serif',
                fontWeight: 700,
                fontSize: { xs: '1.28rem', sm: '1.42rem' },
                lineHeight: 1.2,
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </Typography>

            {/* Audio Listen Button with Classy Heraldic Chime */}
            <Tooltip title={isPlaying ? 'Pronouncing...' : `Listen: pronunciation of "${name}"`}>
              <IconButton
                size="small"
                onClick={handleSpeak}
                sx={{
                  p: 0.4,
                  borderRadius: '2px',
                  bgcolor: isPlaying ? accentBg : 'transparent',
                  '&:hover': { bgcolor: accentBg },
                }}
              >
                <AudioChimeIcon size={16} color={isPlaying ? '#00AEEF' : 'var(--text-secondary)'} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={copied ? 'Copied to clipboard' : 'Copy name'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  p: 0.5,
                  borderRadius: '2px',
                  color: copied ? 'success.main' : 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {copied ? <Check sx={{ fontSize: 16 }} /> : <Share sx={{ fontSize: 15 }} />}
              </IconButton>
            </Tooltip>

            {/* Classy Filigree Heart Shortlist Button */}
            <Tooltip title={isFavorite ? 'Remove from shortlist' : 'Add to shortlist'}>
              <IconButton
                size="small"
                onClick={handleHeartClick}
                sx={{
                  p: 0.5,
                  borderRadius: '2px',
                  bgcolor: isFavorite ? alpha('#E91E8E', 0.12) : 'transparent',
                  '&:hover': {
                    bgcolor: alpha('#E91E8E', 0.16),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.18s ease',
                }}
              >
                <FiligreeHeartIcon size={18} color="#E91E8E" filled={Boolean(isFavorite)} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Meaning in Cormorant Garamond Editorial Typography */}
        {meaning && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '0.98rem',
              color: 'text.secondary',
              mb: 2,
              lineHeight: 1.5,
              flexGrow: 1,
            }}
          >
            "{meaning}"
          </Typography>
        )}

        {/* Badges / Chips Row with Classy SVGs */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 'auto', pt: 1.4, borderTop: `1px solid ${custom.borderSubtle}` }}>
          {gender && (
            <Chip
              size="small"
              icon={isGirl ? <PrincessTiaraIcon size={13} color={accentColor} /> : <CrownPrinceIcon size={13} color={accentColor} />}
              label={gender}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: accentBg,
                color: accentColor,
                border: `1px solid ${alpha(accentColor, 0.2)}`,
                '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
              }}
            />
          )}

          {origin && (
            <Chip
              size="small"
              icon={<VedicLotusIcon size={13} color={custom.coral} />}
              label={origin}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha(custom.coral, 0.06),
                color: custom.coral,
                border: `1px solid ${alpha(custom.coral, 0.2)}`,
                '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
              }}
            />
          )}

          {zodiac && (
            <Chip
              size="small"
              icon={<AstrologyCompassIcon size={13} color={custom.gold} />}
              label={zodiac}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha(custom.gold, 0.08),
                color: isDark ? '#E5C158' : '#8F6E13',
                border: `1px solid ${alpha(custom.gold, 0.25)}`,
                '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
              }}
            />
          )}

          {popularity && (
            <Chip
              size="small"
              icon={<ModernSparkleIcon size={13} color="#059669" />}
              label={popularity}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderRadius: '2px',
                bgcolor: alpha('#059669', 0.06),
                color: '#059669',
                border: `1px solid ${alpha('#059669', 0.2)}`,
                '& .MuiChip-icon': { ml: '4px', mr: '-2px' },
              }}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
