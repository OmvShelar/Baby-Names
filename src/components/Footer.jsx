import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import BrandLogo from './ui/BrandLogo';
import { FiligreeHeartIcon } from './icons/CustomIcons';

export default function Footer() {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const custom = muiTheme.palette.custom;

  const footerSections = [
    {
      title: 'Curated Collections',
      links: [
        { label: 'Royal Boy Names', path: '/boy-names' },
        { label: 'Graceful Girl Names', path: '/girl-names' },
        { label: 'Sanskrit & Indian Heritage', path: '/indian-names' },
        { label: 'Modern & Contemporary', path: '/modern-names' },
        { label: 'Astrological Rashi Names', path: '/zodiac-names' },
      ],
    },
    {
      title: 'Editorial & Guides',
      links: [
        { label: 'The Naming Atelier Blog', path: '/blogs' },
        { label: 'Trending 2026 Forecast', path: '/blogs/trending-baby-names-2026' },
        { label: 'How to Choose the Perfect Name', path: '/blogs/how-to-choose-perfect-baby-name' },
        { label: 'Sanskrit Spiritual Meanings', path: '/blogs/sanskrit-baby-names-spiritual-meanings' },
        { label: 'Harmonious Twin Pairs', path: '/blogs/twin-baby-names-harmonious-pairs' },
      ],
    },
    {
      title: 'Atelier Concierge',
      links: [
        { icon: <FiPhone />, label: '(+91) 7796196502', href: 'tel:+917796196502' },
        { icon: <FiMail />, label: 'pickbabyname@gmail.com', href: 'mailto:pickbabyname@gmail.com' },
        { icon: <FiMapPin />, label: 'Kolhapur, Maharashtra, India' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 8,
        pb: 5,
        background: isDarkMode ? '#0A0807' : '#FAF8F4',
        borderTop: `1px solid ${custom.borderLight}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #0F4C81 0%, #C59B27 50%, #9F2241 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <BrandLogo size="large" onClick={() => navigate('/')} />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.8,
                fontSize: '0.88rem',
                maxWidth: 340,
              }}
            >
              Curating meaningful nomenclature steeped in Vedic heritage, planetary constellations, and modern global sophistication for the next generation.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.2 }}>
              {[
                { icon: <FaFacebookF size={14} />, href: 'https://facebook.com', color: '#1877F2' },
                { icon: <FaTwitter size={14} />, href: 'https://twitter.com', color: '#1DA1F2' },
                { icon: <FaInstagram size={14} />, href: 'https://instagram.com', color: '#E4405F' },
                { icon: <FaWhatsapp size={14} />, href: 'https://wa.me/+917796196502', color: '#25D366' },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '2px', // Sharp
                    border: `1px solid ${custom.borderLight}`,
                    backgroundColor: alpha(social.color, 0.05),
                    color: social.color,
                    '&:hover': {
                      backgroundColor: social.color,
                      color: '#fff',
                      borderColor: social.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${alpha(social.color, 0.3)}`,
                    },
                    transition: 'all 0.22s ease',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={4} md={2.6} key={section.title}>
              <Typography
                variant="overline"
                sx={{
                  color: custom.gold,
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  mb: 2.2,
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {section.links.map((link, i) => (
                  <Box
                    key={i}
                    component={link.path ? 'button' : 'div'}
                    onClick={link.path ? () => navigate(link.path) : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                      color: 'text.secondary',
                      fontSize: '0.86rem',
                      cursor: link.path ? 'pointer' : 'default',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      p: 0,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      '&:hover': link.path
                        ? { color: custom.coral, transform: 'translateX(3px)' }
                        : {},
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {link.icon && <Box sx={{ color: custom.gold, display: 'flex' }}>{link.icon}</Box>}
                    {link.href ? (
                      <Box
                        component="a"
                        href={link.href}
                        sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: custom.coral } }}
                      >
                        {link.label}
                      </Box>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 7,
            pt: 3.5,
            borderTop: `1px solid ${custom.borderLight}`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', letterSpacing: '0.02em' }}>
            © {new Date().getFullYear()} Sweet Baby Names Atelier. Crafted for discerning parents worldwide.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              Curated with
            </Typography>
            <FiligreeHeartIcon size={14} color="#9F2241" filled />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              for life's greatest blessings
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
