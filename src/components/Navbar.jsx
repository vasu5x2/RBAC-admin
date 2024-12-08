import * as React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // If using react-router for routing
import HomeIcon from '@mui/icons-material/Home'; // For the Home button icon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext'; // Import the context

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useThemeContext(); // Consume the context

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* Home Button */}
        <Button
          component={Link}
          to="/"
          color="inherit"
          startIcon={<HomeIcon />}
          sx={{ mr: 2 }}
        >
          Home
        </Button>

        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Admin Dashboard
        </Typography>

        <Box>
          <Button component={Link} to="/users" color="inherit" sx={{ mr: 2 }}>
            Users
          </Button>
          <Button component={Link} to="/role-management" color="inherit" sx={{ mr: 2 }}>
            Role Management
          </Button>
        </Box>

        {/* Dark Mode Toggle */}
        <IconButton onClick={toggleDarkMode} color="inherit" sx={{ ml: 2 }}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
