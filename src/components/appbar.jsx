import { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  useTheme, useMediaQuery, IconButton, Drawer, List, ListItem,
  // Ajouts pour la liste dépliable
  ListItemButton, ListItemText, Collapse, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Icônes pour l'accordéon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { NavLink, Outlet } from 'react-router-dom';
import { HoverButton } from './hoverButton';

import { verifyToken } from '../utils/auth';
import UserSection from './nav/UserSection';
import PublicationsMenu from './nav/PublicationsMenu';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');

  // --- Logique inchangée ---
  useEffect(() => {
    const fetchAuth = async () => {
      const result = await verifyToken();
      setIsConnected(result.isConnected);
      setUsername(result.username);
    };
    fetchAuth();
  }, []);

  // --- Hooks et états pour la responsivité ---
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  // État pour contrôler l'ouverture du sous-menu "Publications" dans le Drawer
  const [publicationsSubMenuOpen, setPublicationsSubMenuOpen] = useState(false);


  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handlePublicationsSubMenuClick = () => {
    setPublicationsSubMenuOpen(!publicationsSubMenuOpen);
  };

  // Menu de navigation pour mobile (dans le Drawer)
  const drawer = (
    <Box sx={{ width: 250, p: 1 }}>
      <List component="nav">
        {/* On utilise ListItemButton pour un meilleur feedback visuel */}
        <ListItemButton component={NavLink} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Accueil" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/photos" onClick={handleDrawerToggle}>
          <ListItemText primary="Photos" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/articles" onClick={handleDrawerToggle}>
          <ListItemText primary="Articles" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/rapports et politiques" onClick={handleDrawerToggle}>
          <ListItemText primary="Rapports et Politique" />
        </ListItemButton>

        {isConnected && (
          <>
            {/* --- Section "Publications" pour le Drawer (maintenant dépliable) --- */}
            <ListItemButton onClick={handlePublicationsSubMenuClick}>
              <ListItemText primary="Publications" />
              {publicationsSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={publicationsSubMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Ces liens sont des exemples, adaptez les à vos routes réelles */}
                <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/publication/articles" onClick={handleDrawerToggle}>
                  <ListItemText primary="Article" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/publication/rapports" onClick={handleDrawerToggle}>
                  <ListItemText primary="Rapports" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/publication/images" onClick={handleDrawerToggle}>
                  <ListItemText primary="Image" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/publication/partenaires" onClick={handleDrawerToggle}>
                  <ListItemText primary="Partenaires" />
                </ListItemButton>
                
              </List>
            </Collapse>

            {/* UserSection pourrait nécessiter une adaptation similaire si c'est aussi un menu */}
            <ListItem disablePadding>
              <UserSection username={username} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <img src="/Logo.png" alt="logo de IFEDD" style={{ width: 120 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}></Typography>

          {isMobile ? (
            // --- VUE MOBILE ---
            <>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
              </Drawer>
            </>
          ) : (
            // --- VUE DESKTOP (utilise le composant original PublicationsMenu) ---
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HoverButton component={NavLink} to="/">Accueil</HoverButton>
              <HoverButton component={NavLink} to="/photos">Photos</HoverButton>
              <HoverButton component={NavLink} to="/articles">Articles</HoverButton>
              <HoverButton component={NavLink} to="/rapports et politiques">Rapports et Politiques</HoverButton>

              {/* Ici, on garde le composant original qui fonctionne sur desktop */}
              {isConnected && <PublicationsMenu />}
              {isConnected && <UserSection username={username} />}

            </Box>
          )}
        </Toolbar>
      </AppBar>

      <main>
        <Toolbar />
        <Outlet />
      </main>
    </>
  );
}