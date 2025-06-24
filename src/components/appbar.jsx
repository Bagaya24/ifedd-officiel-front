import { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box
} from '@mui/material';
import { NavLink, Outlet } from 'react-router';
import { HoverButton } from './hoverButton';

import { verifyToken } from '../utils/auth';
import UserSection from './nav/UserSection';
import PublicationsMenu from './nav/PublicationsMenu';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await verifyToken();
      setIsConnected(result.isConnected);
      setUsername(result.username);
    };
    fetchAuth();
  }, []);

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>IFEDD</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HoverButton component={NavLink} to="/">Accueil</HoverButton>
            <HoverButton component={NavLink} to="/photos">Photos</HoverButton>
            <HoverButton component={NavLink} to="/articles">Articles</HoverButton>
            <HoverButton component={NavLink} to="/rapports et politiques">Rapports et Politiques</HoverButton>

            {isConnected && <PublicationsMenu />}
            {isConnected && <UserSection username={username} />}

            <Button
              color="primary"
              variant="contained"
              sx={{ ml: 2 }}
              component={NavLink}
              to={isConnected ? "/deconnexion" : "/connexion"}
            >
              {isConnected ? 'Déconnexion' : 'Connexion'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>
    </>
  );
}
