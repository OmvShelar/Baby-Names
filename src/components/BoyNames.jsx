import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NameGrid from './ui/NameGrid';
import NameDetails from './ui/NameDetails';
import { boyNamesData } from '../data/names';

const subcategories = [
  { key: 'indian', label: 'Indian Names' },
  { key: 'god', label: 'God Names' },
  { key: 'modern', label: 'Modern Names' },
  { key: 'zodiac', label: 'Zodiac Names' },
];

const BoyNames = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const currentKey = subcategories[activeTab].key;
  let items = boyNamesData[currentKey] || [];
  // Normalize zodiac entries (they may use label/name)
  items = items.map((it) => {
    if (it.label) return { ...it, name: it.name || it.label.split(': ').pop() };
    return it;
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E3F2FD', pt: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/')} sx={{ backgroundColor: '#3b82f6', color: 'white', '&:hover': { backgroundColor: '#2563eb' } }}>
            <BackIcon />
          </IconButton>

          <Box>
            <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, color: '#075985' }}>
              Boy Names
            </Typography>
            <Typography variant="body1" sx={{ color: '#075985', mt: 1 }}>
              Discover strong and meaningful names for your baby boy
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} variant={isMobile ? 'scrollable' : 'standard'} scrollButtons="auto" sx={{ backgroundColor: 'transparent' }}>
            {subcategories.map((s, i) => (
              <Tab key={s.key} label={s.label} sx={{ color: activeTab === i ? '#075985' : '#07598599', fontWeight: 600 }} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ backgroundColor: 'transparent', borderRadius: 1, p: 0, mb: 4 }}>
          <NameGrid names={items} onOpen={handleOpen} />
        </Box>

        <NameDetails open={open} onClose={handleClose} item={selected} />
      </Container>
    </Box>
  );
};

export default BoyNames;
