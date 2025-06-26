import { Box, Container, Grid, Link, Typography, IconButton, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { EmailOutlined, LanguageOutlined, PhoneEnabled, RoomOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { verifyToken } from '../utils/auth';

export function Footer() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
      const fetchAuth = async () => {
        const result = await verifyToken();
        setIsConnected(result.isConnected);
        setUsername(result.username);
      };
      fetchAuth();
    }, []);
  return (
    <Box sx={{ backgroundColor: '#121858', py: 4, mt: 8}}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Colonne 1 : Titre / description */}
          <Grid  size={{ xs:12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" color='#eceff1' gutterBottom>
              IFEDD
            </Typography>
            <Typography variant="body2" color="#eceff1">
              Initiative des Femmes Entrepreneurs pour le Développement Durable.
            </Typography>
          </Grid>

          {/* Colonne 2 : Liens utiles */}
          <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color='#eceff1'>
              Nos adresses
            </Typography>
            <Link href="https://maps.app.goo.gl/KjuT43mASjtUDT1G7" underline="none" color="#eceff1" display="block" sx={{ mb: 1, ":hover": {color: "blue" } }}>
              <RoomOutlined/> Localisation
            </Link>
            <Link href="#" underline="none" color="#eceff1" display="block" sx={{ mb: 1 }}>
              <PhoneEnabled/> +243 823 938 632
            </Link>
            <Link href="https://ifedd-rdc.org/" underline="none" color="#eceff1" display="block" sx={{ mb: 1, ":hover": {color: "blue" } }}>
              <LanguageOutlined/> ifedd@ifedd-rdc.org
            </Link>
            <Link href="#" underline="none" color="#eceff1" display="block" sx={{ mb: 1 , ":hover": {color: "blue" }}}>
              <EmailOutlined/>  ifeddrdc@gmail.com
            </Link>
          </Grid>
          <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Typography color='#eceff1' variant="h6" fontWeight="bold" gutterBottom>
              Heures de travail
            </Typography>
            <Typography variant="body2" color="#eceff1">
              Lundi - Vendredi: 8h00 - 17h00
            </Typography>
            <Typography variant="body2" color="#eceff1">
              Samedi: fermé 
            </Typography>
            <Typography variant="body2" color="#eceff1">
              Dimanche: fermé
            </Typography>
          </Grid>
           <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Button
                color="primary"
                variant="contained"
                sx={{ ml: 2 }}
                component={NavLink}
                to={isConnected ? "/deconnexion" : "/connexion"}
              >
                {isConnected ? 'Déconnexion' : 'Connexion'}
              </Button>
            </Grid>
          {/* Colonne 3 : Réseaux sociaux */}
          <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color='#eceff1'>
              Suivez-nous
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{color:'#eceff1'}}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter" sx={{color:'#eceff1'}}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{color:'#eceff1'}}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn" sx={{color:'#eceff1'}}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
         
        </Grid>

        {/* Ligne de bas de page */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="#eceff1">
            © {new Date().getFullYear()} IFEDD — Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
