import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Container, TextField, Button, Paper, Box, Alert } from '@mui/material';
import { Footer } from '../components/footer';
import { TitleHeader } from '../components/titleHeader';

const PublicationArticles = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const editorRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const redacteur = localStorage.getItem('username');
        if (!editorRef.current || !image || !title) {
            setAlertType('error');
            setAlertMessage("Veuillez remplir tous les champs et ajouter une image.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", editorRef.current.getContent());
        formData.append("image", image);

        try {
            const response = await fetch("http://127.0.0.1:8000/articles/publication", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }
            setTitle("");
            setPreview(null);
            setContent("");
            setImage(null);
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
        
            <Container maxWidth="lg" sx={{ py: 10 }}>
                    <TitleHeader>
                         Publier un article
                    </TitleHeader>
                <Paper elevation={3} sx={{ p: 4 }}>
                    

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
                            label="Titre de l'article"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            required
                        />
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

                        <Box sx={{ mt: 3, mb: 3 }}>
                            <Editor
                                apiKey="i0jabxt3qx35s06pd1bpnqslp7ccb1qgghndca3cpu35r67m"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                value={content}
                                onEditorChange={(newContent) => setContent(newContent)}
                                init={{
                                    height: 400,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                                        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | blocks | bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 4 }}
                        >
                            Publier l'article
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default PublicationArticles;
