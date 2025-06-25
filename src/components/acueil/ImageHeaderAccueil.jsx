import {
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import { Image } from '../image';

export function ImageHeaderAccueil() {
  return (
    <Image
      src="/image2.jpg"
      alt="Image d'accueil"
      height={{ xs: 400, sm: 500, md: 600 }}
    >
      <Box
        component={Container}
        sx={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          pt: { xs: 20, sm: 30, md: 40 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: {
              xs: '1.5rem',
              sm: '2.5rem',
              md: '3rem',
              lg: '3.5rem'
            }
          }}
        >
          Initiative des Femmes Entrepreneurs pour le Développement Durable (IFEDD)
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            my: 4,
            fontSize: {
              xs: '0.9rem',
              sm: '1rem',
              md: '1.1rem'
            },
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 1.5 }
          }}
        >
          Télécharger la brochure
        </Button>
      </Box>
    </Image>
  );
}
