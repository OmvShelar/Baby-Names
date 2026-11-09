import React from 'react';
import { Box, Typography } from '@mui/material';
import logoImg from '../../assets/logo.png';

export default function BrandLogo({ size = 'navbar', onClick, showSubtitle = true, sx = {} }) {
  const isSmall = size === 'small';
  const isNavbar = size === 'navbar';
  const isLarge = size === 'large';

  const logoDimension = isLarge ? 48 : isNavbar ? 40 : isSmall ? 32 : 40;

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
      {/* Official PickBaby Name Circular Logo Emblem */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: logoDimension,
          height: logoDimension,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={logoImg}
          alt="PickBaby Name Logo"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
            boxShadow: '0 2px 10px rgba(0, 140, 168, 0.22), 0 1px 4px rgba(233, 30, 142, 0.18)',
            border: '1.5px solid rgba(0, 174, 239, 0.4)',
            transition: 'transform 0.25s ease',
            '&:hover': {
              transform: 'rotate(6deg) scale(1.04)',
            },
          }}
        />
      </Box>

      {/* Brand Typographic Lockup Matching Official Logo Typography */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Philosopher", "Marcellus", "Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: isLarge
              ? { xs: '1.35rem', sm: '1.6rem' }
              : isNavbar
              ? { xs: '1.15rem', sm: '1.32rem' }
              : '1.02rem',
            lineHeight: 1.12,
            letterSpacing: '0.015em',
            display: 'inline-flex',
            alignItems: 'baseline',
          }}
        >
          <Box
            component="span"
            sx={{
              color: '#008CA8', // Exact Cyan from Logo "Pick"
              fontWeight: 700,
            }}
          >
            Pick
          </Box>
          <Box
            component="span"
            sx={{
              color: '#E91E8E', // Exact Magenta from Logo "Baby"
              fontWeight: 700,
            }}
          >
            Baby
          </Box>
          <Box
            component="span"
            sx={{
              color: '#008CA8', // Exact Cyan from Logo "Name"
              fontWeight: 700,
              ml: 0.4,
            }}
          >
            Name
          </Box>
        </Typography>

        {showSubtitle && (
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
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#E91E8E',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Vedic &amp; Modern
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: '0.55rem',
                color: '#00AEEF',
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
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              2026
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
