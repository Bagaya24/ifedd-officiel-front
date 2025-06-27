
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { urlbase } from '../../api/Api';

export default function AddCommentaires({ id, onCommentAdded }) {
  const [auteur, setAuteur] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auteur || !content) return alert("Veuillez remplir tous les champs.");

    const formData = new FormData();
    formData.append("auteur", auteur);
    formData.append("content", content);

    try {
      const response = await fetch(`${urlbase}articles/add-commentaire/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur serveur");

      setAuteur("");
      setContent("");
      if (onCommentAdded) onCommentAdded(id); // Appelle le parent
    } catch (error) {
      console.error("Erreur d'envoi:", error);
    }
  };

  return (
    <Box sx={{ bottom: 20, left: 20, width: { xs: '90%', sm: 360 }, zIndex: 1300 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Ajouter un commentaire</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth size="small" label="Auteur" value={auteur} onChange={(e) => setAuteur(e.target.value)} sx={{ mb: 1 }} />
          <TextField fullWidth multiline size="small" rows={3} label="Commentaire" value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 1 }} />
          <Button type="submit" variant="contained" color="primary" fullWidth size="small">Publier</Button>
        </Box>
      </Paper>
    </Box>
  );
}

