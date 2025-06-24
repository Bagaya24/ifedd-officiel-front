
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { TitleHeader } from '../titleHeader';

export default function AddCommentaires({id}) {
    const [auteur, setAuteur] = useState('');
    const [content, setContent] = useState('');

     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auteur || !content) {
            console.error("Veuillez remplir tous les champs.");
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const formData = new FormData();
        formData.append("auteur", auteur);
        formData.append("content", content);

        try {
            const response = await fetch(`http://127.0.0.1:8000/articles/add-commentaire/${id}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            const result = await response.json();
            console.log(result)
            setAuteur("");
            setContent("");
        } catch (error) {
            console.error("Erreur d'envoi:", error);
       
        }
    }

  return (
     <Box
      sx={{
      
        bottom: 20,
        left: 20,
        width: { xs: '90%', sm: 360 },
        zIndex: 1300,
      }}
    >
       
      <Paper elevation={2} sx={{ p: 2 }}>
         <Typography variant="h6" gutterBottom>
            Ajouter un commentaire
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small"
            label="Auteur"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            multiline
            size="small"
            rows={3}
            label="Commentaire"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="small"
          >
            Publier
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
