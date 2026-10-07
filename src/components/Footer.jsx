import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  alpha,
  useTheme as useMuiTheme,
  Button,
} from '@mui/material';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Baby, Heart } from 'lucide-react';

export default function Footer() {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const custom = muiTheme.palette.custom;

  const footerSections = [
    {
      title: 'Baby Names',
      links: [
        { label: 'Boy Names', path: '/boy-names' },
        { label: 'Girl Names', path: '/girl-names' },
        { label: 'Indian & Sanskrit', path: '/indian-names' },
        { label: 'Modern & Trendy', path: '/modern-names' },
        { label: 'Zodiac (Rashi) Names', path: '/zodiac-names' },
      ],
    },
    {
      title: 'Guides & Resources',
      links: [
        { label: 'Baby Naming Blog', path: '/blogs' },
        { label: 'Trending 2026 Names', path: '/blogs/trending-baby-names-2026' },
        { label: 'How to Choose Guide', path: '/blogs/how-to-choose-perfect-baby-name' },
        { label: 'Sanskrit Spiritual Meanings', path: '/blogs/sanskrit-baby-names-spiritual-meanings' },
        { label: 'Twin Baby Names', path: '/blogs/twin-baby-names-harmonious-pairs' },
      ],
    },
    {
      title: 'Get in Touch',
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
        pb: 4,
        background: isDarkMode ? '#0B0E14' : '#FFFFFF',
        borderTop: `1px solid ${custom.borderLight}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #0284C7 0%, #FF7E67 50%, #E11D48 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => navigate('/')}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 2, gap: 1.5 }}
            >
              <Box
                sx={{
                  p: 1.1,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF7E67, #F43F5E)',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 14px rgba(255,126,103,0.4)',
                }}
              >
                <Baby size={22} style={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    lineHeight: 1.1,
                  }}
                >
                  Sweet Baby Names
                </Typography>
                <Typography variant="caption" sx={{ color: custom.coral, fontWeight: 700, fontSize: '0.7rem' }}>
                  2026 EDITION
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8, fontSize: '0.88rem' }}>
              Discover the most cherished baby names from across traditions, cultures, and celestial signs. Verified meanings, pronunciation insights, and personalized shortlists.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.2 }}>
              {[
                { icon: <FaFacebookF />, href: 'https://facebook.com', color: '#1877F2' },
                { icon: <FaTwitter />, href: 'https://twitter.com', color: '#1DA1F2' },
                { icon: <FaInstagram />, href: 'https://instagram.com', color: '#E4405F' },
                { icon: <FaWhatsapp />, href: 'https://wa.me/+917796196502', color: '#25D366' },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 50,
                    backgroundColor: alpha(social.color, 0.08),
                    color: social.color,
                    '&:hover': {
                      backgroundColor: social.color,
                      color: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 16px ${alpha(social.color, 0.35)}`,
                    },
                    transition: 'all 0.25s ease',
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
                  color: custom.coral,
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  letterSpacing: '0.14em',
                  mb: 2.5,
                  display: 'block',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
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
                        ? { color: custom.coral, transform: 'translateX(4px)' }
                        : {},
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.icon && <Box sx={{ color: custom.coral, display: 'flex' }}>{link.icon}</Box>}
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
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Sweet Baby Names. Handcrafted for expecting parents. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
              Designed with
            </Typography>
            <Heart size={14} style={{ color: '#E11D48', fill: '#E11D48' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
              for little miracles worldwide
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
