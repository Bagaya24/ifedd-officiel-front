import { useState, useEffect } from 'react';
import {

    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
} from '@mui/material';
import { TitleHeader } from '../components/titleHeader';
import { API_BASE } from '../hooks/config';

const PublicationsImages = () => {
    const [image, setImage] = useState(null);
    const [legende, setLegende] = useState('');
    const [preview, setPreview] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !legende) {
            setAlertType('error');
            setAlertMessage("Veuillez remplir tous les champs et ajouter une image.");
            return;
        }

        const formData = new FormData();
        formData.append("legende", legende);
        formData.append("image", image);

        try {
            const response = await fetch(`${API_BASE}/galerie/add`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            const result = await response.json();
            console.log(result)
            setLegende("");
            setPreview(null);
            setImage(null);
            setAlertType('success');
            setAlertMessage("Article publié avec succès !");
        } catch (error) {
            console.error("Erreur d'envoi:", error);
            setAlertType('error');
            setAlertMessage("Erreur lors de la publication de l'article.");
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 10 }}>
            <TitleHeader>
                Publier une image
            </TitleHeader>
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>

                {alertType && (
                    <Alert
                        severity={alertType}
                        onClose={() => setAlertType(null)}
                        sx={{ mb: 3 }}
                    >
                        {alertMessage}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            component="span"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Choisir une image
                        </Button>
                    </label>

                    {preview && (
                        <Box sx={{ mb: 2 }}>
                            <img
                                src={preview}
                                alt="Aperçu"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Box>
                    )}

                    <TextField
                        fullWidth
                        label="legende"
                        multiline
                        rows={4}
                        value={legende}
                        onChange={(e) => setLegende(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Publier
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PublicationsImages;