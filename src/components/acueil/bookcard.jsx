import { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Button, Typography, Dialog, DialogTitle, DialogContent,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';
import { supabase } from '../../hooks/config'; // assure-toi que ton client supabase est importé
import Spinner from '../spinners/Spinner';

export function BookCard() {
  const [downloadingStates, setDownloadingStates] = useState({});
  const { rapports, getRapport, loader } = UseFetch();
    const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    getRapport();
  }, []);

    const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleDownload = async (documentUrl, titre, rapportId) => {
    try {
      // Mettre à jour l'état de téléchargement pour ce rapport spécifique
      setDownloadingStates(prev => ({
        ...prev,
        [rapportId]: true
      }));
      
        setSnackbar({
        open: true,
        message: `Téléchargement de "${titre}" en cours...`,
        severity: 'info'
      });

      const { data, error } = await supabase
        .storage
        .from('rapport')
        .download(`documents/${documentUrl}`);

      if (error) {
        setDownloadingStates(prev => ({
          ...prev,
          [rapportId]: false
        }));
        console.error("Erreur téléchargement:", error.message);
            setSnackbar({
          open: true,
          message: "Erreur lors du téléchargement",
          severity: 'error'
        });
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
      
      setDownloadingStates(prev => ({
        ...prev,
        [rapportId]: false
      }));

         setSnackbar({
        open: true,
        message: `"${titre}" téléchargé avec succès !`,
        severity: 'success'
      });
    } catch (e) {
      setDownloadingStates(prev => ({
        ...prev,
        [rapportId]: false
      }));
      console.error("Exception lors du téléchargement:", e);
       setSnackbar({
        open: true,
        message: "Erreur lors du téléchargement",
        severity: 'error'
      });
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
              <Card sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={rapport.image_url
                    ? rapport.image_url
                    : 'https://via.placeholder.com/300x180?text=Pas+de+couverture'}
                  alt={`Couverture du rapport ${rapport.titre}`}
                />
                <Button
                  size="small"
                  onClick={() => handleDownload(rapport.document_url, rapport.titre, rapport.idRapport)}
                  disabled={downloadingStates[rapport.idRapport]}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(18, 24, 88, 0.85)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      backgroundColor: 'rgba(18, 24, 88, 0.95)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    minWidth: 'auto',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    textTransform: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                    Télécharger
                </Button>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {rapport.titre}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        />
      )}
          <Snackbar 
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
