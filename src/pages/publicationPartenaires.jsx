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
import { Footer } from '../components/footer';
import { TitleHeader } from '../components/titleHeader';
import { API_BASE } from '../hooks/config';

const PublicationsPartenaires = () => {
    const [logo, setLogo] = useState(null);
    const [name, setName] = useState('');

    const [preview, setPreview] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!logo || !name) {
            setAlertType('error');
            setAlertMessage("Veuillez remplir tous les champs et ajouter une logo.");
            return;
        }

        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("name", name)

        try {
            const response = await fetch(`${API_BASE}/partenaire/publication`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            const result = await response.json();

            console.log(result)
            setLogo(null);
            setPreview(null);
            setName("")
            setAlertType('success');
            setAlertMessage("Article publié avec succès !");
        } catch (error) {
            console.error("Erreur d'envoi:", error);
            setAlertType('error');
            setAlertMessage("Erreur lors de la publication de l'article.");
        }
    };


    return (
        <>
            <Container maxWidth="sm" mt={8} sx={{ py: 10 }}>
                <TitleHeader>
                    Ajout partenaires
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
                            accept="logo/*"
                            style={{ display: 'none' }}
                            id="logo-upload"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="logo-upload">
                            <Button
                                variant="contained"
                                component="span"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Choisir une logo
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

                        <TextField id="outlined-basic"
                            label="Nom du partenaire"
                            variant="outlined"
                            fullWidth

                            multiline

                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
            <Footer />
        </>

    );
};

export default PublicationsPartenaires;