import { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Button, Typography, Dialog, DialogTitle, DialogContent,
  IconButton,
  CircularProgress
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';
import { supabase } from '../../hooks/config'; // assure-toi que ton client supabase est importé
import Spinner from '../spinners/Spinner';

export function BookCard() {
  const [isDownload, setIsDownload] = useState(false);
  

  const { rapports, getRapport, loader } = UseFetch();

  useEffect(() => {
    getRapport();
  }, []);



  const handleDownload = async (documentUrl, titre) => {
    try {
      setIsDownload(true)
      const { data, error } = await supabase
        .storage
        .from('rapport')
        .download(`documents/${documentUrl}`);

      if (error) {
        setIsDownload(false)
        console.error("Erreur téléchargement:", error.message);
        alert("Erreur lors du téléchargement");
        return;
      }
      setIsDownload(false)
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
              <Card >
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
                 
                  <Button
                    size="small"
                    onClick={() => handleDownload(rapport.document_url, rapport.titre)}
                  >
                    {isDownload ? <CircularProgress size={24} color="inherit" /> : "Télécharger"}
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        />
      )}
    </>
  );
}
