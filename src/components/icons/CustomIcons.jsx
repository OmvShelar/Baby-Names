import React from 'react';

/**
 * PickBaby Name Official Logo Crest Icon
 * Features the concentric Magenta & Cyan rings, sacred baby footprint
 * with Om (ॐ) vibration, and sacred pink lotus.
 */
export const BrandCrestIcon = ({ size = 36, sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <defs>
      <linearGradient id="logoFootprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00AEEF" />
        <stop offset="100%" stopColor="#E91E8E" />
      </linearGradient>
      <linearGradient id="logoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00AEEF" />
        <stop offset="100%" stopColor="#008CA8" />
      </linearGradient>
    </defs>

    {/* Outer Magenta Ring */}
    <circle cx="22" cy="22" r="20" stroke="#E91E8E" strokeWidth="2" fill="#FFFFFF" />

    {/* Inner Cyan Ring */}
    <circle cx="22" cy="22" r="17" stroke="#00AEEF" strokeWidth="1.5" fill="none" />

    {/* Sacred Baby Footprint (Heel + Palm) */}
    <ellipse cx="22" cy="23" rx="7" ry="6" fill="url(#logoFootprintGrad)" />

    {/* Baby Toes */}
    <circle cx="15.5" cy="14" r="1.8" fill="#00AEEF" />
    <circle cx="18.5" cy="12" r="1.8" fill="#00AEEF" />
    <circle cx="22" cy="11.5" r="2" fill="#00AEEF" />
    <circle cx="25.5" cy="12" r="1.8" fill="#E91E8E" />
    <circle cx="28.5" cy="14" r="1.8" fill="#E91E8E" />

    {/* Sacred Om Symbol in White */}
    <text
      x="22"
      y="25.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="7.5"
      fontWeight="bold"
      fontFamily="'Philosopher', 'Cinzel', serif"
    >
      ॐ
    </text>

    {/* Sacred Lotus Base Petals */}
    <path
      d="M17 33 C19 30 22 29 22 29 C22 29 25 30 27 33 C24 34 20 34 17 33 Z"
      fill="#E91E8E"
      opacity="0.85"
    />
    <circle cx="22" cy="31" r="1.2" fill="#00AEEF" />
  </svg>
);

/**
 * Royal Crown Prince Icon (Vibrant Cyan & Gold)
 */
export const CrownPrinceIcon = ({ size = 22, color = '#008CA8', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <defs>
      <linearGradient id="princeGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00AEEF" />
        <stop offset="100%" stopColor="#008CA8" />
      </linearGradient>
    </defs>
    {/* Crown Base */}
    <path d="M4 19H20V20.5H4V19Z" fill="url(#princeGold)" />
    <path d="M5 16.5H19V18H5V16.5Z" fill={color} />
    {/* Crown Peaks */}
    <path
      d="M4 16.5L6 8L10 13L12 6L14 13L18 8L20 16.5H4Z"
      stroke="url(#princeGold)"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Jewels */}
    <circle cx="12" cy="5" r="1.3" fill="url(#princeGold)" />
    <circle cx="6" cy="7" r="1.1" fill="url(#princeGold)" />
    <circle cx="18" cy="7" r="1.1" fill="url(#princeGold)" />
    <circle cx="12" cy="14" r="1.2" fill={color} />
  </svg>
);

/**
 * Imperial Princess Tiara Icon (Lotus Magenta & Cyan)
 */
export const PrincessTiaraIcon = ({ size = 22, color = '#E91E8E', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <defs>
      <linearGradient id="tiaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D77F" />
        <stop offset="100%" stopColor="#C59B27" />
      </linearGradient>
    </defs>
    {/* Diadem Arch */}
    <path
      d="M3 18C7 16 17 16 21 18"
      stroke="url(#tiaraGold)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Floral Filigree Arches */}
    <path
      d="M12 5C10 9 7 13 4 17"
      stroke="url(#tiaraGold)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M12 5C14 9 17 13 20 17"
      stroke="url(#tiaraGold)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M12 7C9.5 11 8.5 14 8 17"
      stroke="url(#tiaraGold)"
      strokeWidth="1"
    />
    <path
      d="M12 7C14.5 11 15.5 14 16 17"
      stroke="url(#tiaraGold)"
      strokeWidth="1"
    />
    {/* Central Ruby Gem */}
    <polygon points="12,3.5 13.5,5.5 12,7.5 10.5,5.5" fill={color} />
    <circle cx="6" cy="11" r="1" fill={color} />
    <circle cx="18" cy="11" r="1" fill={color} />
  </svg>
);

/**
 * Twin Constellation Stars Icon
 */
export const TwinConstellationIcon = ({ size = 22, color = '#C59B27', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    {/* Star 1 (Left Top) */}
    <path
      d="M9 3L9.8 6.2L13 7L9.8 7.8L9 11L8.2 7.8L5 7L8.2 6.2Z"
      fill={color}
    />
    {/* Star 2 (Right Bottom) */}
    <path
      d="M16 12L16.7 14.8L19.5 15.5L16.7 16.2L16 19L15.3 16.2L12.5 15.5L15.3 14.8Z"
      fill={color}
    />
    {/* Celestial Orbit Ring */}
    <ellipse
      cx="12.5"
      cy="11.5"
      rx="9"
      ry="5"
      transform="rotate(-25 12.5 11.5)"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.6"
    />
  </svg>
);

/**
 * Vedic Sanskrit Lotus Icon
 */
export const VedicLotusIcon = ({ size = 22, color = '#B65A3F', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    {/* Central Bloom Petal */}
    <path
      d="M12 4C10.5 7 10 11 12 16C14 11 13.5 7 12 4Z"
      fill={color}
      opacity="0.85"
    />
    {/* Left Petal */}
    <path
      d="M12 16C9 13.5 5 11 5 7C7.5 8.5 10.5 12 12 16Z"
      fill={color}
      opacity="0.6"
    />
    {/* Right Petal */}
    <path
      d="M12 16C15 13.5 19 11 19 7C16.5 8.5 13.5 12 12 16Z"
      fill={color}
      opacity="0.6"
    />
    {/* Outer Wings */}
    <path
      d="M12 17C7.5 16 3 13 2 11C4.5 12 9 14.5 12 17Z"
      fill={color}
      opacity="0.4"
    />
    <path
      d="M12 17C16.5 16 21 13 22 11C19.5 12 15 14.5 12 17Z"
      fill={color}
      opacity="0.4"
    />
    {/* Lotus Pond Base */}
    <path
      d="M6 19.5C9 20.5 15 20.5 18 19.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Astrological Compass / Zodiac Wheel Icon
 */
export const AstrologyCompassIcon = ({ size = 22, color = '#C59B27', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    {/* 8-Point Compass Rays */}
    <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1" />
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" stroke={color} strokeWidth="0.8" />
    <line x1="5.6" y1="18.4" x2="18.4" y2="5.6" stroke={color} strokeWidth="0.8" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

/**
 * Feather Quill & Scroll Icon for Editorial Blogs
 */
export const FeatherQuillIcon = ({ size = 22, color = '#C59B27', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M20 4C17 4 11 7 8 13L6 19L9 18C12 15 17 9 20 4Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M14 9L11 12" stroke={color} strokeWidth="1.1" />
    <path d="M12 11L9 14" stroke={color} strokeWidth="1.1" />
    <path d="M4 21C6 20.5 8 20.5 10 21" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/**
 * Heraldic Audio Chime Icon
 */
export const AudioChimeIcon = ({ size = 20, color = '#C59B27', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M11 5L6 9H2V15H6L11 19V5Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M15.5 8.5C16.8 9.8 17.5 11 17.5 12C17.5 13 16.8 14.2 15.5 15.5"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M18.5 5.5C20.8 7.8 22 9.8 22 12C22 14.2 20.8 16.2 18.5 18.5"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Verified Heraldic Shield Icon
 */
export const VerifiedShieldIcon = ({ size = 20, color = '#059669', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M12 2L4 5.5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5.5L12 2Z"
      stroke={color}
      strokeWidth="1.3"
      fill="none"
    />
    <path
      d="M8.5 11.5L10.8 13.8L15.5 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Filigree Heart Bookmark Icon
 */
export const FiligreeHeartIcon = ({ size = 20, color = '#9F2241', filled = false, sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {!filled && (
      <path
        d="M12 7.5C12 9 10.5 10 9 10"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    )}
  </svg>
);

/**
 * Modern Geometric Sparkle Icon
 */
export const ModernSparkleIcon = ({ size = 20, color = '#B65A3F', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
      fill={color}
    />
    <path
      d="M19 16L19.8 18.2L22 19L19.8 19.8L19 22L18.2 19.8L16 19L18.2 18.2L19 16Z"
      fill={color}
      opacity="0.8"
    />
  </svg>
);

/**
 * Architectural Manor / Home Icon
 */
export const ManorHomeIcon = ({ size = 20, color = 'currentColor', sx = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    {...props}
  >
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V10.5Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M9 21V13H15V21" stroke={color} strokeWidth="1.3" />
    <line x1="12" y1="7" x2="12" y2="9.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
