import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrandCrestIcon } from '../icons/CustomIcons';

export default function BrandLogo({ size = 'navbar', onClick, sx = {} }) {
  const theme = useTheme();
  const custom = theme.palette.custom;

  const isSmall = size === 'small';
  const isNavbar = size === 'navbar';
  const isLarge = size === 'large';

  const crestSize = isLarge ? 48 : isNavbar ? 38 : isSmall ? 30 : 38;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: { xs: 1.2, sm: 1.5 },
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'transform 0.22s ease',
        '&:hover': onClick ? { transform: 'scale(1.02)' } : {},
        ...sx,
      }}
    >
      {/* Heraldic Gold Crest Emblem */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 2px 6px rgba(197, 155, 39, 0.35))',
        }}
      >
        <BrandCrestIcon size={crestSize} />
      </Box>

      {/* Brand Typographic Lockup */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Cinzel", "Playfair Display", Georgia, serif',
            fontWeight: 800,
            fontSize: isLarge
              ? { xs: '1.25rem', sm: '1.45rem' }
              : isNavbar
              ? { xs: '1.05rem', sm: '1.22rem' }
              : '0.95rem',
            lineHeight: 1.1,
            letterSpacing: '0.07em',
            color: 'text.primary',
            textTransform: 'uppercase',
          }}
        >
          Sweet Baby Names
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            mt: 0.2,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: isLarge ? '0.68rem' : '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: custom.gold,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Curated Heritage
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '0.55rem',
              color: custom.coral,
              lineHeight: 1,
            }}
          >
            ✦
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: isLarge ? '0.68rem' : '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            2026
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
