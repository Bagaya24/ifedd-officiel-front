import { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Button, Typography, Dialog, DialogTitle, DialogContent,
  IconButton
} from '@mui/material';

import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';
import { supabase } from '../../hooks/config'; // assure-toi que ton client supabase est importé
import Spinner from '../spinners/Spinner';




export function BookCard() {
//   const [open, setOpen] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);

  const { rapports, getRapport, loader } = UseFetch();

  useEffect(() => {
    getRapport();
  }, []);

//   const handleReadClick = (rapport) => {
//     setSelectedBook(rapport);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedBook(null);
//   };

  const handleDownload = async (documentUrl, titre) => {
    try {
    
      const { data, error } = await supabase
        .storage
        .from('rapport')
        .download(`documents/${documentUrl}`);

      if (error) {
        console.error("Erreur téléchargement:", error.message);
        alert("Erreur lors du téléchargement");
        return;
      }

      // Créer un URL local temporaire
      const url = URL.createObjectURL(data);

      // Créer un lien temporaire et le déclencher
      const a = document.createElement('a');
      a.href = url;
      a.download = `${titre}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libérer l'URL quand terminé
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Exception lors du téléchargement:", e);
      alert("Erreur lors du téléchargement");
    }
  };

  return (
    <>
    {loader ? 
    
    <Spinner
    loader={loader}
    />
    : 
    <CustomCarousel title={"Nos Rapports"} slide={
      rapports.map((rapport, index) => (
         
    <div key={index}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="180"
              image={rapport.image_url
                ? rapport.image_url
                : 'https://via.placeholder.com/300x180?text=Pas+de+couverture'}
              alt={`Couverture du rapport ${rapport.titre}`}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {rapport.titre}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small" onClick={() => handleReadClick(rapport)}>
                Lire en ligne
              </Button> */}
              <Button
                size="small"
                onClick={() => handleDownload(rapport.document_url, rapport.titre)}
              >
                Télécharger
              </Button>
            </CardActions>
          </Card>
          {/* Modal PDF */}
          {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>
              {selectedBook?.titre}
              <IconButton
                aria-label="fermer"
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ height: '80vh' }}>
              {selectedBook?.document_url ? (
                <iframe
                  src={`data:application/pdf;base64,${selectedBook.document_url}`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={`Lecture de ${selectedBook.titre}`}
                />
              ) : (
                <Typography>Aucun document à afficher</Typography>
              )}
            </DialogContent>
          </Dialog> */}
        </div>
    
        
      ))
    } />
    }
    
    </>
    
  );
}
