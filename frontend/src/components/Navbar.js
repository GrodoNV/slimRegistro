import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useTheme, useMediaQuery, Avatar, Divider
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { authService } from '../services/authService';
import {
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isAdmin = authService.isAdmin();
  const username = isAdmin ? 'Admin' : 'Usuario';

  if (location.pathname === '/login') {
    return null;
  }

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    authService.logout();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    handleCloseNavMenu();
    navigate(path);
  }

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', admin: false },
    { label: 'Casos', path: '/cases', admin: false },
    { label: 'Usuarios', path: '/admin/users', admin: true },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        {/* --- Vista Móvil --- */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleOpenNavMenu} edge="start">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {navLinks.map(link => 
                (!link.admin || isAdmin) && (
                  <MenuItem key={link.label} onClick={() => handleNavigate(link.path)}>
                    {link.label}
                  </MenuItem>
                )
              )}
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Sistema
            </Typography>
          </>
        ) : (
          /* --- Vista Escritorio --- */
          <>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Sistema de Casos
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {navLinks.map(link => 
                (!link.admin || isAdmin) && (
                  <Button key={link.label} color="inherit" component={Link} to={link.path}>
                    {link.label}
                  </Button>
                )
              )}
            </Box>
          </>
        )}

        {/* --- Menú de Usuario (común en ambas vistas) --- */}
        <Box>
          <IconButton onClick={handleOpenUserMenu} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>
              {isAdmin ? <AdminIcon /> : <PersonIcon />}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">{username}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;