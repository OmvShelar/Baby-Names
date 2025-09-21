import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  BabyChangingStation as BabyIcon,
  Star as StarIcon,
  EmojiEmotions as HappyIcon,
  Favorite as HeartIcon,
  ExpandMore as ExpandMoreIcon,
  ChildCare as ChildIcon,
  Face as FaceIcon,
  Brightness6 as SunIcon,
} from '@mui/icons-material';

// Sample baby names data
const babyNamesData = {
  boy: {
    indian: ['Aarav', 'Vihaan', 'Arjun', 'Krishna', 'Rohit', 'Siddharth'],
    god: ['Krishna', 'Shiva', 'Vishnu', 'Ganesh', 'Ram', 'Hanuman'],
    modern: ['Leo', 'Noah', 'Liam', 'Ethan', 'Mason', 'Lucas'],
    zodiac: ['Aries: Advait', 'Taurus: Bodhi', 'Gemini: Chirag', 'Cancer: Chandra', 'Leo: Leo', 'Virgo: Varun'],
  },
  girl: {
    indian: ['Aaradhya', 'Anaya', 'Diya', 'Isha', 'Kiara', 'Myra'],
    goddess: ['Lakshmi', 'Saraswati', 'Durga', 'Kali', 'Parvati', 'Radha'],
    modern: ['Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia'],
    zodiac: ['Aries: Aarini', 'Taurus: Tara', 'Gemini: Gauri', 'Cancer: Chandra', 'Leo: Lavanya', 'Virgo: Veda'],
  },
};

const BabyNamesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('boy');
  const [activeTab, setActiveTab] = useState(0);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveTab(0);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const renderNameCard = (name, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <BabyIcon
              sx={{
                fontSize: 40,
                color: selectedCategory === 'boy' ? '#64B5F6' : '#F48FB1',
                mb: 1
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              color: selectedCategory === 'boy' ? '#1976D2' : '#C2185B',
              mb: 1
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            Meaning: Beautiful & precious
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderSubcategoryContent = (subcategory) => {
    const names = babyNamesData[selectedCategory][subcategory] || [];
    return (
      <Grid container spacing={3}>
        {names.map((name, index) => renderNameCard(name, index))}
      </Grid>
    );
  };

  const subcategories = selectedCategory === 'boy'
    ? [
        { key: 'indian', label: 'Indian Names', icon: <FaceIcon /> },
        { key: 'god', label: 'God Names', icon: <StarIcon /> },
        { key: 'modern', label: 'Modern Names', icon: <SunIcon /> },
        { key: 'zodiac', label: 'Zodiac Names', icon: <HappyIcon /> },
      ]
    : [
        { key: 'indian', label: 'Indian Names', icon: <FaceIcon /> },
        { key: 'goddess', label: 'Goddess Names', icon: <StarIcon /> },
        { key: 'modern', label: 'Modern Names', icon: <SunIcon /> },
        { key: 'zodiac', label: 'Zodiac Names', icon: <HappyIcon /> },
      ];

  const navigationItems = [
    { label: 'Boy Names', category: 'boy' },
    { label: 'Girl Names', category: 'girl' },
    { label: 'Zodiac Names', category: 'zodiac' },
    { label: 'Modern Names', category: 'modern' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          color: '#1976D2'
        }}
      >
        Sweet Baby Names
      </Typography>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.category} disablePadding>
            <ListItemButton
              onClick={() => handleCategoryChange(item.category)}
              sx={{
                backgroundColor: selectedCategory === item.category
                  ? (item.category === 'boy' ? '#E3F2FD' : '#FCE4EC')
                  : 'transparent',
                '&:hover': {
                  backgroundColor: item.category === 'boy' ? '#BBDEFB' : '#F8BBD9',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Bar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #E0E0E0'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              color: '#1976D2',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <BabyIcon sx={{ color: '#1976D2' }} />
            Sweet Baby Names
          </Typography>

          {isMobile ? (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.category}
                  onClick={() => handleCategoryChange(item.category)}
                  sx={{
                    color: selectedCategory === item.category ? '#1976D2' : '#666',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    backgroundColor: selectedCategory === item.category
                      ? (item.category === 'boy' ? '#E3F2FD' : '#FCE4EC')
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: item.category === 'boy' ? '#BBDEFB' : '#F8BBD9',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Category Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              color: selectedCategory === 'boy' ? '#1976D2' : '#C2185B',
              mb: 2
            }}
          >
            {selectedCategory === 'boy' ? '👦 Boy Names' : '👧 Girl Names'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontFamily: '"Poppins", sans-serif',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Discover beautiful and meaningful names for your little one
          </Typography>
        </Box>

        {/* Subcategories */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: selectedCategory === 'boy' ? '#E3F2FD' : '#FCE4EC'
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  minHeight: 64,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: selectedCategory === 'boy' ? '#1976D2' : '#C2185B',
                },
              }}
            >
              {subcategories.map((subcategory, index) => (
                <Tab
                  key={subcategory.key}
                  label={subcategory.label}
                  icon={subcategory.icon}
                  iconPosition="start"
                  sx={{
                    color: activeTab === index ? (selectedCategory === 'boy' ? '#1976D2' : '#C2185B') : '#666',
                    '&.Mui-selected': {
                      color: selectedCategory === 'boy' ? '#1976D2' : '#C2185B',
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <Box sx={{ p: 3 }}>
            {subcategories.map((subcategory, index) => (
              <Box key={subcategory.key} hidden={activeTab !== index}>
                {activeTab === index && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: selectedCategory === 'boy' ? '#1976D2' : '#C2185B',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {subcategory.icon}
                      {subcategory.label}
                    </Typography>
                    {renderSubcategoryContent(subcategory.key)}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#F5F5F5',
          py: 3,
          mt: 'auto',
          borderTop: '1px solid #E0E0E0'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: '#666',
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            © 2025 Sweet Baby Names. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default BabyNamesPage;
