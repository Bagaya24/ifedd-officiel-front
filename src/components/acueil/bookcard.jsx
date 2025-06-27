import { useEffect, useState } from 'react';
import {
    Card, CardMedia, CardContent, CardActions,
    Button, Typography, Dialog, DialogTitle, DialogContent,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';

export function BookCard() {
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const {rapports, getRapport} = UseFetch()
    
    useEffect(() => {
        getRapport()
    }, [])
    const handleReadClick = (rapport) => {
        setSelectedBook(rapport);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBook(null);
    };

    return (
        <CustomCarousel title={"Nos Rapports"} slide={
            rapports.map((rapport, index) => (
                <div key={index}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            height="180"
                            image={rapport.image
                                ? `data:image/jpeg;base64,${rapport.image}`
                                : 'https://via.placeholder.com/300x180?text=Pas+de+couverture'}
                            alt={`Couverture du rapport ${rapport.titre}`}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {rapport.titre}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleReadClick(rapport)}>
                                Lire en ligne
                            </Button>
                            <Button
                                size="small"
                                href={`data:application/pdf;base64,${rapport.document}`}
                                download={`${rapport.titre}.pdf`}
                                target="_blank"
                            >
                                Télécharger
                            </Button>
                        </CardActions>
                    </Card>
                    {/* Modal PDF */}
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
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
                            {selectedBook?.document ? (
                                <iframe
                                    src={`data:application/pdf;base64,${selectedBook.document}`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                    title={`Lecture de ${selectedBook.titre}`}
                                />
                            ) : (
                                <Typography>Aucun document à afficher</Typography>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            ))
        }


        />


    );
}
