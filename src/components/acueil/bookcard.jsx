import { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Button, Typography, Dialog, DialogTitle, DialogContent,
  IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';
import { supabase } from '../../hooks/config'; // assure-toi que ton client supabase est importé
import Spinner from '../spinners/Spinner';

export function BookCard() {
  const [open, setOpen] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const { rapports, getRapport, loader } = UseFetch();

  useEffect(() => {
    getRapport();
  }, []);

  // const handleReadClick = async (documentUrl) => {
  //   try {
  //     setLoadingPdf(true);
  //     setPdfDataUrl(null);

  //     const { data, error } = await supabase
  //       .storage
  //       .from('rapport')
  //       .download(`documents/${documentUrl}`);

  //     if (error) {
  //       console.error("Erreur téléchargement:", error.message);
  //       alert("Erreur lors du téléchargement");
  //       setLoadingPdf(false);
  //       return;
  //     }

  //     // ✅ Convertir en base64
  //     const blob = data;
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64data = reader.result;
  //       setPdfDataUrl(base64data);
  //       setOpen(true);
  //       setLoadingPdf(false);
  //     };
  //     reader.readAsDataURL(blob);

  //   } catch (e) {
  //     console.error("Exception lors du téléchargement:", e);
  //     alert("Erreur lors du téléchargement");
  //     setLoadingPdf(false);
  //   }
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setPdfDataUrl(null);
  // };

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

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${titre}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Exception lors du téléchargement:", e);
      alert("Erreur lors du téléchargement");
    }
  
  };

  return (
    <>
      {loader ? (
        <Spinner loader={loader} />
      ) : (
        <CustomCarousel
          title={"Nos Rapports"}
          slide={rapports.map((rapport, index) => (
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
                  {/* <Button size="small" onClick={() => handleReadClick(rapport.document_url)}>
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

              {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <DialogTitle>
                  {rapport.titre}
                  <IconButton
                    aria-label="fermer"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ height: '80vh' }}>
                  {loadingPdf ? (
                    <Typography>Chargement...</Typography>
                  ) : pdfDataUrl ? (
                    <iframe
                      src={pdfDataUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      title={`Lecture du rapport`}
                    />
                  ) : (
                    <Typography>Aucun document à afficher</Typography>
                  )}
                </DialogContent>
              </Dialog> */}
            </div>
          ))}
        />
      )}
    </>
  );
}
