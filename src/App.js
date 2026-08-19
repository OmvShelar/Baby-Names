import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppLayout from './AppLayout';
import { useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './themes/theme';
import Home from './components/Home';
import BoyNames from './components/BoyNames';
import GirlNames from './components/GirlNames';
import IndianNames from './components/IndianNames';
import ModernNames from './components/ModernNames';
import ZodiacNames from './components/ZodiacNames';
import Favorites from './components/Favorites';

function App() {
  const { isDarkMode } = useTheme();
  const muiTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </MuiThemeProvider>
  );
}

export default App;
