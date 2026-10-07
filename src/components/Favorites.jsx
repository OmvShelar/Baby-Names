import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  ArrowBack,
  Share,
  DeleteOutline,
  Check,
  Boy,
  Girl,
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './ui/FavoritesProvider';
import { namesDatabase } from '../data/data';
import NameCard from './NameCard';
import SEO from './SEO';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedGender, setSelectedGender] = useState('all');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const custom = theme.palette.custom;

  // Search entire database for favorited names
  const allDatabaseNames = useMemo(() => {
    const map = new Map();
    Object.keys(namesDatabase).forEach((category) => {
      const items = namesDatabase[category] || [];
      items.forEach((item) => {
        if (item.boy && !map.has(item.boy)) {
          map.set(item.boy, {
            name: item.boy,
            meaning: item.boy_meaning,
            gender: 'Boy',
            origin: category,
            zodiac: item.zodiac || 'Leo',
            popularity: item.boy_popularity,
          });
        }
        if (item.girl && !map.has(item.girl)) {
          map.set(item.girl, {
            name: item.girl,
            meaning: item.girl_meaning,
            gender: 'Girl',
            origin: category,
            zodiac: item.zodiac || 'Libra',
            popularity: item.girl_popularity,
          });
        }
      });
    });
    return map;
  }, []);

  const favoriteItems = useMemo(() => {
    const list = favorites.map((name) => {
      if (allDatabaseNames.has(name)) {
        return allDatabaseNames.get(name);
      }
      return {
        name,
        meaning: 'Cherished baby name',
        gender: 'Unisex',
        origin: 'Curated',
      };
    });

    if (selectedGender !== 'all') {
      return list.filter((item) => item.gender.toLowerCase() === selectedGender);
    }
    return list;
  }, [favorites, allDatabaseNames, selectedGender]);

  const handleShareWhatsApp = () => {
    const namesList = favorites.join(', ');
    const message = encodeURIComponent(
      `Hello! Here is our shortlist of favorite baby names from Sweet Baby Names:\n\n✨ ${namesList}\n\nExplore more at https://sweetbabynames.com`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleCopyShortlist = () => {
    navigator.clipboard.writeText(favorites.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <SEO
        title={`My Baby Names Shortlist (${favorites.length} saved)`}
        description="View, organize, and share your personalized baby names shortlist with your partner."
        canonical="https://sweetbabynames.com/favorites"
      />

      {/* Header Banner */}
      <Box
        sx={{
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          background: `linear-gradient(180deg, ${alpha('#E11D48', 0.08)} 0%, transparent 100%)`,
          borderBottom: `1px solid ${custom.borderLight}`,
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
            onClick={() => navigate('/')}
            sx={{ mb: 2, color: 'text.secondary', fontSize: '0.85rem' }}
          >
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha('#E11D48', 0.15), display: 'flex', color: '#E11D48' }}>
                  <Favorite sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h1" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2rem', md: '2.6rem' } }}>
                  Your Favorites Shortlist
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                You have saved {favorites.length} {favorites.length === 1 ? 'name' : 'names'} to your shortlist.
              </Typography>
            </Box>

            {favorites.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<FaWhatsapp />}
                  onClick={handleShareWhatsApp}
                  sx={{
                    bgcolor: '#25D366',
                    '&:hover': { bgcolor: '#20BD5A' },
                    boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                  }}
                >
                  Share with Partner
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCopyShortlist}
                  startIcon={copied ? <Check /> : <Share />}
                >
                  {copied ? 'Copied!' : 'Copy List'}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Filter Tabs */}
      {favorites.length > 0 && (
        <Box sx={{ borderBottom: `1px solid ${custom.borderLight}`, bgcolor: custom.cardWhite, py: 1.5 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { id: 'all', label: `All (${favorites.length})` },
                { id: 'boy', label: 'Boys Only', icon: <Boy sx={{ fontSize: 18 }} /> },
                { id: 'girl', label: 'Girls Only', icon: <Girl sx={{ fontSize: 18 }} /> },
              ].map((tab) => (
                <Chip
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  clickable
                  onClick={() => setSelectedGender(tab.id)}
                  sx={{
                    bgcolor: selectedGender === tab.id ? '#E11D48' : 'transparent',
                    color: selectedGender === tab.id ? '#FFFFFF' : 'text.primary',
                    fontWeight: selectedGender === tab.id ? 700 : 500,
                    border: `1px solid ${selectedGender === tab.id ? '#E11D48' : custom.borderLight}`,
                    '&:hover': { bgcolor: selectedGender === tab.id ? '#BE123C' : alpha('#E11D48', 0.08) },
                  }}
                />
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {favoriteItems.length === 0 ? (
          <Paper sx={{ textAlign: 'center', py: 8, px: 3, borderRadius: 4, bgcolor: custom.cardWhite, maxWidth: 600, mx: 'auto' }}>
            <Favorite sx={{ fontSize: 64, color: alpha('#E11D48', 0.2), mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, mb: 1.5 }}>
              No favorites saved yet
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.6 }}>
              Tap the heart icon on any baby name card while browsing to save it here. You can easily compare and share your top choices.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => navigate('/boy-names')} sx={{ px: 3 }}>
                Browse Boy Names
              </Button>
              <Button variant="contained" onClick={() => navigate('/girl-names')} sx={{ px: 3, background: custom.girlGradient }}>
                Browse Girl Names
              </Button>
            </Box>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {favoriteItems.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.name + i}>
                <NameCard
                  name={item.name}
                  meaning={item.meaning}
                  gender={item.gender}
                  origin={item.origin}
                  zodiac={item.zodiac}
                  popularity={item.popularity}
                  isFavorite={isFavorite(item.name)}
                  onToggleFavorite={toggleFavorite}
                  index={i}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
