import { Container, Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export function Partenaire() {
  const {partenaires} = useLoaderData()
  const [gridSize, setGridSize] = useState(2); // valeur par défaut (1/3 de la grille)
  
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 600) {
          setGridSize(6); // pleine largeur sur mobile
        } else if (width < 960) {
          setGridSize(4); // moitié sur tablette
        } else {
          setGridSize(2); // un tiers sur desktop
        }
      };
  
      // Exécuter une fois au chargement
      handleResize();
      // Réécoute sur redimensionnement
      window.addEventListener("resize", handleResize);
  
      // Nettoyage de l'écouteur
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return (
    <Container sx={{ py: 4 }}>
        <Typography variant="h3" align="center" color="#1769aa" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Nos Partenaires
        </Typography>
      <Grid container spacing={3} justifyContent="center">
        {partenaires.map((partenaire, index) => (
          <Grid size={gridSize} key={index}>
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 180,
              }}
            >
              <img src={
                            partenaire.logo_url 
                                ? partenaire.logo_url
                                : "https://via.placeholder.com/60?text=Logo"
                        } 
              alt={partenaire.name} 
              style={{ width: 60, height: 60, objectFit: "contain" }}/>
              <Typography sx={{ mt: 2, fontWeight: 500 }}>{partenaire.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
