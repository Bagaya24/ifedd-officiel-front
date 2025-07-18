import { Container, Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import UseFetch from "../../hooks/useFetch";
import { Delete } from "@mui/icons-material";
import { api } from "../../api/Api";

export function Partenaire() {
  const {partenaires, getPartenaires} = UseFetch()

  const name = localStorage.getItem('username');

   const handleDelete = async (id) => {
        try {
            const response = await api.delete(`partenaire/delete/${id}/`);
            console.log(response)
            
            getPartenaires();
        } catch (e) {
            console.error("Erreur lors de la suppression:", e);
            alert("Erreur lors de la suppression.");
        }
    };

    useEffect(() => {
      getPartenaires()
    },[])
  return (
    <Container sx={{ py: 4 }}>
        <Typography variant="h3" align="center" color="#1769aa" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Nos Partenaires
        </Typography>
        
      <Grid container spacing={3} justifyContent="center">
        {partenaires.map((partenaire, index) => (
          <Grid size={{xs: 6, sm: 3, md: 2}} key={index}>
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
                height: {xs: 80, sm: 100, md: 120},
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
              {
                name && 
                <Delete
                size="small"
                color="error"
                onClick={() => handleDelete(partenaire.id)}
              />
              }
              
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
