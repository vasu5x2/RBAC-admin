import React, { createContext, useMemo, useState, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Create the context
const ThemeContext = createContext();

// Custom hook for consuming the context
export const useThemeContext = () => useContext(ThemeContext);

// ThemeProvider component
export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
