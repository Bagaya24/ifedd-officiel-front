import { useState } from 'react'
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Footer } from '../components/footer';
import { TitleHeader } from '../components/titleHeader';
import { apiFormData, urlbase } from '../api/Api';

const PublicationRapports = () => {
    const [title, setTitle] = useState('');
    const [coverPage, setCoverPage] = useState(null);
    const [report, setReport] = useState(null);
    const [type, setType] = useState("")
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [isUpload, setIsUpload] = useState(false)


    const handleCoverPageUpload = (event) => {
        const file = event.target.files[0];
        setCoverPage(file);
    };

    const handleReportUpload = (event) => {
        const file = event.target.files[0];
        setReport(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!coverPage || !title || !report) {
            setAlertType('error');
            setAlertMessage("Veuillez remplir tous les champs et ajouter une logo.");
            return;
        }
        setIsUpload(true)
        const formData = new FormData();
        formData.append('titre', title);
        formData.append('image', coverPage);
        formData.append('document', report);
        formData.append("types", type);

        try {

            const response = await apiFormData.post(`rapport/publication/`, formData)

            if (!response) {
                setIsUpload(false)
                throw new Error("Erreur serveur");
            }
            setIsUpload(false)
            setReport(null)
            setCoverPage(null);
            setType("")
            setTitle("")
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
            <Container maxWidth="md" sx={{ py: 10 }}>
                <TitleHeader>
                    Publier un Rapport
                </TitleHeader>
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    {alertType && (
                        <Alert
                            severity={alertType}
                            onClose={() => setAlertType(null)}
                            sx={{ mb: 3 }}
                        >
                            {alertMessage}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Titre du rapport"
                            variant="outlined"
                            margin="normal"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Type du rapport"
                            variant="outlined"
                            margin="normal"
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />

                        <Stack spacing={3} sx={{ mt: 3 }}>
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Page de garde (Image)
                                </Typography>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mt: 1 }}
                                >
                                    Choisir une image
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleCoverPageUpload}
                                    />
                                </Button>
                                {coverPage && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Fichier sélectionné: {coverPage.name}
                                    </Typography>
                                )}
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Rapport (PDF)
                                </Typography>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mt: 1 }}
                                >
                                    Choisir un PDF
                                    <input
                                        hidden
                                        accept=".pdf"
                                        type="file"
                                        onChange={handleReportUpload}
                                    />
                                </Button>
                                {report && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Fichier sélectionné: {report.name}
                                    </Typography>
                                )}
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={isUpload ? true : false}
                                sx={{ mt: 3 }}
                            >
                                {isUpload ? <CircularProgress size={24} color="inherit" /> : "publier le rapport"}
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </>

    );
};

export default PublicationRapports;