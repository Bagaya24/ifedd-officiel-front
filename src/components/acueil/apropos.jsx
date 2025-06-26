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
        height: { xs: 400, md: 600 },
        overflow: "hidden",
        display: "flex",
        px: 0,
        py: 0,
      }}
    >
      {/* Image en fond (toujours à droite) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", md: "50%" },
          height: "100%",
          backgroundImage: "url('/image_a_propos.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      />

      {/* Texte superposé à l'image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", md: "50%" },
          left: { xs: "50%", md: "10%" },
          transform: { xs: "translate(-50%, -50%)", md: "translateY(-50%)" },
          width: { xs: "90%", md: "60%" },
          backgroundColor: {xs: "rgba(18, 17, 17, 0.3)", md:"rgba(255, 255, 255, 0.15)"},
          backdropFilter: {xs:"blur(5px)", md: "blur(2px)"},
          borderRadius: "20px",
          zIndex: 2,
          p: { xs: 2, sm: 4, md: 6 },
          color: "white",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2a3eb1",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
            textAlign: {xs: "center", md: "left"},
          }}
        >
          Qui sommes-nous ?
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            color: {xs: "#dedede" , md:"#3c3c3c"}
          }}
        >
          Initiative des Femmes Entrepreneurs pour le Développement Durable « IFEDD »,
          est une organisation locale non gouvernementale des droits congolais créée en 2016 à
          GOMA, dans la province du Nord-Kivu, dans l’Est de la République Démocratique du Congo.
          IFEDD vise à créer un monde où chaque individu est traité avec dignité et a la possibilité
          de réaliser son plein potentiel, surtout les catégories des personnes les plus marginalisées
          et prône ainsi une gestion responsable des ressources naturelles. Tenant compte des besoins
          de developpement des communautes locales ainsi que de la protection de l'environnement,
          IFEDD adopte l'approche holistique et participative.
        </Typography>
      </Box>
    </Container>
  );
}
