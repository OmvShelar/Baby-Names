import React from 'react';
import {
  Box, Container, Typography, IconButton, Grid, alpha, useTheme as useMuiTheme,
} from '@mui/material';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Baby, Heart } from 'lucide-react';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const custom = muiTheme.palette.custom;

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Boy Names', path: '/boy-names' },
        { label: 'Girl Names', path: '/girl-names' },
        { label: 'Indian Names', path: '/indian-names' },
      ],
    },
    {
      title: 'More Names',
      links: [
        { label: 'Modern Names', path: '/modern-names' },
        { label: 'Zodiac Names', path: '/zodiac-names' },
        { label: 'Popular Names', path: '/boy-names' },
      ],
    },
    {
      title: 'Get in Touch',
      links: [
        { icon: <FiPhone />, label: '(+91) 7796196502', href: 'tel:+917796196502' },
        { icon: <FiMail />, label: 'pickbabyname@gmail.com', href: 'mailto:pickbabyname@gmail.com' },
        { icon: <FiMapPin />, label: 'Kolhapur, Maharastra' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 7,
        pb: 3,
        background: custom.cardWhite,
        borderTop: `1px solid ${custom.borderLight}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: '#D08B7B',
          opacity: 0.4,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 2 }}>
              <Box sx={{
                p: 1,
                borderRadius: 0,
                background: 'linear-gradient(135deg, #D08B7B, #E5B7A9)',
                mr: 1.5,
                display: 'flex',
                boxShadow: '0 2px 8px rgba(208,139,123,0.35)',
              }}>
                <Baby size={18} style={{ color: '#fff' }} />
              </Box>
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: '1rem' }}>
                Sweet Baby Names
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8, fontSize: '0.825rem' }}>
              Discover the perfect name for your little one with our curated collection of beautiful baby names from around the world.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[{ icon: <FaFacebookF />, href: '#' }, { icon: <FaTwitter />, href: '#' }, { icon: <FaInstagram />, href: '#' }].map((social, i) => (
                <IconButton key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  sx={{
                    width: 36, height: 36, borderRadius: 0,
                    backgroundColor: alpha(custom.terracotta, 0.08),
                    color: isDarkMode ? '#D9A99B' : '#8A6A5B',
                    '&:hover': { backgroundColor: '#D08B7B', color: '#fff', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(208,139,123,0.35)' },
                    transition: 'all 0.2s ease', fontSize: '0.8rem',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {footerSections.map((section) => (
            <Grid item xs={6} md={3} key={section.title}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', mb: 2, display: 'block' }}>
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {section.links.map((link, i) => (
                  <Box key={i} component={link.path ? 'button' : 'div'}
                    onClick={link.path ? () => navigate(link.path) : undefined}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      color: 'text.secondary', fontSize: '0.825rem',
                      cursor: link.path ? 'pointer' : 'default',
                      background: 'none', border: 'none', textAlign: 'left', p: 0,
                      fontFamily: '"Outfit", sans-serif',
                      '&:hover': link.path ? { color: 'primary.main', transform: 'translateX(4px)' } : {},
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.icon && <Box sx={{ color: 'primary.main', display: 'flex', fontSize: '0.825rem' }}>{link.icon}</Box>}
                    {link.href ? (
                      <Box component="a" href={link.href} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
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

        <Box sx={{
          mt: 5, pt: 3, borderTop: `1px solid ${custom.borderLight}`,
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2,
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem' }}>
            {new Date().getFullYear()} Sweet Baby Names. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem' }}>Made with</Typography>
            <Heart size={12} style={{ color: '#D08B7B' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem' }}>for parents everywhere</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
