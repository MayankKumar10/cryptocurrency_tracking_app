// src/App.js
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CryptoConverter from './components/CryptoConverter/CryptoConverter';
import Header from './components/common/Header';

const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#3f51b5',       
      },
      secondary: {
        main: '#f50057',       
      },
    },
  });

  return (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header theme={themeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/converter" element={<CryptoConverter />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
    </ThemeProvider>
    </>
  );
};

export default App;
