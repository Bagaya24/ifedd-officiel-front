import { useEffect, useState } from "react";
import { Typography, Box, Container, Grid } from "@mui/material";

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
  
    >
      <Grid container columnSpacing={{sm:2, md:3}} rowSpacing={2}>
       
        <Grid size={{xs:12, md:6}}>

           <Box
        sx={{
          width: { xs: "90%", md: "90%" },
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: {xs:"blur(5px)", md: "blur(2px)"},
          borderRadius: "20px",
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
            textAlign:"center",
          }}
        >
          Qui sommes-nous ?
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            color:"#3c3c3c"
          }}
        >
         Initiative des Femmes Entrepreneurs pour le Développement Durable (IFEDD) est une organisation non gouvernementale
         de droit congolais, créée en 2016 à Goma. Elle œuvre dans les domaines humanitaire et du développement durable.
        </Typography>
      </Box>
        </Grid>
         <Grid size={{xs:12, md:6}}>

          <Box
        sx={{
          width: { xs: "100%", md: "95%" },
          height: "100%",
          backgroundImage: "url('/image_a_propos.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: {xs: "20px 20px 20px 20px", md:"0px 20px 20px 0px" }
        }}
      />
        </Grid>
      </Grid>
      {/* Image en fond (toujours à droite) */}
      

      {/* Texte superposé à l'image */}
     
    </Container>
  );
}
