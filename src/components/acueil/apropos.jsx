import { useState, useEffect } from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import { Image } from "../image";

export function Apropos() {
  const [leftGrid, setLeftGrid] = useState(8);
  const [rightGrid, setRightGrid] = useState(4);

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        // Mobile : image en dessous, texte pleine largeur
        setLeftGrid(12);
        setRightGrid(12);
      } else if (width < 960) {
        // Tablette : 2/3 texte, 1/3 image
        setLeftGrid(8);
        setRightGrid(4);
      } else {
        // Desktop : 2/3 texte, 1/3 image
        setLeftGrid(8);
        setRightGrid(4);
      }
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {/* Texte */}
        <Grid size={leftGrid}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h3"
              color="info.main"
              gutterBottom
              textAlign="center"
            >
              Qui sommes-nous ?
            </Typography>
            <Typography variant="h6" color="text.secondary" align="justify" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Initiative des Femmes Entrepreneurs pour le Développement Durable « IFEDD »,
              est une organisation locale non gouvernementale des droits congolais créée en 2016 à
              GOMA, dans la province du Nord-Kivu, dans l’Est de la République Démocratique du Congo.
              IFEDD vise à créer un monde où chaque individu est traité avec dignité et a la possibilité
              de réaliser son plein potentiel, surtout les catégories des personnes les plus marginalisées
              et prône ainsi une gestion responsable des ressources naturelles. Tenant compte des besoins de
              développement des communautés locales ainsi que de la protection de l’environnement, IFEDD adopte
              l’approche holistique et participative.
            </Typography>
          </Box>
        </Grid>

        {/* Image */}
        <Grid size={rightGrid}>
          <Image
            src="/kelli-mcclintock-dJ0MxSIasGs-unsplash.jpg"
            height={400}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
