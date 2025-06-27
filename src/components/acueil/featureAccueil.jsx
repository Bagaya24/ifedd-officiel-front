import {
  VisibilityOutlined,
  DirectionsRunOutlined,
  FlagOutlined
} from "@mui/icons-material";
import {
  Typography,
  Box,
  Grid,
  Container
} from "@mui/material";

const featureBoxStyle = {
  p: { xs: 2, sm: 3 },
  height: {xs: "80%", md: "100%"},
  backgroundColor: '#f5f5f5',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

export function FeatureAccueil() {
 

  return (
    <Container sx={{ py: { xs: 4, md: 8 } }} maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={featureBoxStyle}>
            <VisibilityOutlined fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Vision
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Notre vision est d'assurer la bonne gestion des ressources naturelles
              en tenant compte du développement des communautés et de la protection de l'environnement.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={featureBoxStyle}>
            <DirectionsRunOutlined fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Notre mission est d'influencer et promouvoir le respect des droits humains,
              l'autonomisation des communautés impactées par les conflits et l’exploitation des ressources naturelles.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={featureBoxStyle}>
            <FlagOutlined fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Objectif
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Contribuer à l'amélioration de la qualité de vie des communautés
              affectées par les conflits et l’exploitation des ressources naturelles.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
