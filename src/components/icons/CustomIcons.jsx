import React from 'react';

// Custom Boy Icon
export const BoyIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M12 11c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" fill="currentColor" />
  </svg>
);

// Custom Girl Icon
export const GirlIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M12 11c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" fill="currentColor" />
    <path d="M9 6c0-1 1-2 2-2s2 1 2 2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

// Custom Indian Flag Icon
export const IndianFlagIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <rect width="24" height="8" y="0" fill="#FF9933" />
    <rect width="24" height="8" y="8" fill="#FFFFFF" />
    <rect width="24" height="8" y="16" fill="#128807" />
    <circle cx="12" cy="12" r="3" fill="#000080" stroke="#FFFFFF" strokeWidth="0.5" />
    <path d="M12 9c1.5 0 2.5 1 2.5 2.5S13.5 14 12 14s-2.5-1-2.5-2.5S10.5 9 12 9z" fill="#000080" />
    <g stroke="#FFFFFF" strokeWidth="0.3" fill="none">
      <path d="M12 9v5" />
      <path d="M9.5 11.5h5" />
      <path d="M10.5 10.5l3 3" />
      <path d="M13.5 10.5l-3 3" />
    </g>
  </svg>
);

// Custom Zodiac Icon
export const ZodiacIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <polygon points="12,2 14,8 20,8 15,12 17,18 12,14 7,18 9,12 4,8 10,8" fill="currentColor" />
  </svg>
);

// Custom Modern Icon
export const ModernIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="9" r="2" fill="currentColor" />
    <path d="M13 7h6" stroke="currentColor" strokeWidth="2" />
    <path d="M13 11h4" stroke="currentColor" strokeWidth="2" />
    <path d="M7 13h10" stroke="currentColor" strokeWidth="2" />
    <path d="M7 17h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Custom God Icon
export const GodIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M12 11c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" fill="currentColor" />
    <path d="M8 6l2-2 2 2 2-2 2 2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

// Custom Goddess Icon
export const GoddessIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M12 11c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" fill="currentColor" />
    <path d="M9 6c0-1 1-2 2-2s2 1 2 2" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M8 6l2-2 2 2 2-2 2 2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

// Custom Baby Icon (for navbar)
export const BabyIcon = ({ sx = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx}
    {...props}
  >
    <circle cx="12" cy="10" r="4" fill="currentColor" />
    <path d="M12 14c-2 0-4 1-4 3v2h8v-2c0-2-2-3-4-3z" fill="currentColor" />
    <circle cx="9" cy="8" r="1" fill="currentColor" />
    <circle cx="15" cy="8" r="1" fill="currentColor" />
  </svg>
);
