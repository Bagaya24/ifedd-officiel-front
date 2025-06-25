import { useEffect, useState } from "react";
import { Typography, Box, Container } from "@mui/material";

export function Apropos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        position: "relative",
        height: { xs: "auto", md: 600 },
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        px: 0,
      }}
    >
      {/* Image avec overlay semi-transparent */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: "50%" },
          height: { xs: 300, md: "100%" },
          ml: "auto", // pousse l'image à droite
          backgroundImage: "url('/image_a_propos.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          flexShrink: 0,
        
        }}
      />

      {/* Texte placé à gauche (pas couvert par overlay) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 130,
          width: { xs: "100%", md: "60%" },
         
          zIndex: 2,
          p: { xs: 3, sm: 5, md: 8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: { xs: "black", md: "#eceff1" },
          backgroundColor: "rgba(255, 255, 255, 0.15)", // Fond semi-transparent pour le texte
      backdropFilter: "blur(2px)", // Effet de flou pour améliorer la lisibilité
      borderRadius: "20px",
      m: { xs: 2, md: 8 },
          
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2a3eb1" }}	
        >
          Qui sommes-nous ?
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          sx={{
            fontSize: { xs: "1rem", sm: "1.5rem" },
            color: "#557392" 
          }}
        >
          Initiative des Femmes Entrepreneurs pour le Développement Durable « IFEDD »,
          est une organisation locale non gouvernementale des droits congolais créée en 2016 à
          GOMA, dans la province du Nord-Kivu, dans l’Est de la République Démocratique du Congo.
          IFEDD vise à créer un monde où chaque individu est traité avec dignité et a la possibilité
          de réaliser son plein potentiel, surtout les catégories des personnes les plus marginalisées
          et prône ainsi une gestion responsable des ressources naturelles...
        </Typography>
      </Box>
    </Container>
  );
}
