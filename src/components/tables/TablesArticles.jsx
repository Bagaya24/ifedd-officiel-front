import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
    Button,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box
} from '@mui/material';
import { useEffect, useState } from 'react';

import UseFetch from '../../hooks/useFetch';
import { api } from '../../api/Api';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

function TableArticles() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { articles, getArticle, loader } = UseFetch();

    // État pour le modal
    const [openModal, setOpenModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);

    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const editorRef = useRef(null);

    useEffect(() => {
        getArticle();
    }, []);

    const handleOpenModal = (article) => {
        setCurrentArticle(article);
        setEditTitle(article.titre);
        setEditContent(article.texte);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentArticle(null);
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append("title", editTitle);
            formData.append("content", editContent);

            const response = await api.patch(`articles/update/${currentArticle.idArticle}/`,
                {
                    titre: editTitle,
                    texte: editContent
                }
            );

            console.log(response)
            handleCloseModal();
            getArticle(); // Rafraîchir la liste
        } catch (error) {
            console.error("Erreur de modification:", error);
            alert("Erreur lors de la modification.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`articles/delete/${id}`);
            console.log(response)
            getArticle();
        } catch (e) {
            console.error("Erreur lors de la suppression:", e);
            alert("Erreur lors de la suppression.");
        }
    };

    const rows = articles.map((article, index) => ({
        numero: `#${index + 1}`,
        titre: article.titre,
        prelude: article.prelude,
        action: (
            <>
                <Button
                    size="small"
                    onClick={() => handleOpenModal(article)}
                >
                    Modifier
                </Button>
                <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(article.idArticle)}
                >
                    Supprimer
                </Button>
            </>
        )
    }));

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Numéro</TableCell>
                                    <TableCell>Titre</TableCell>
                                    <TableCell>Prelude</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover key={row.numero}>
                                            <TableCell>{row.numero}</TableCell>
                                            <TableCell>{row.titre}</TableCell>
                                            <TableCell>{row.prelude}</TableCell>
                                            <TableCell align="center">{row.action}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(+e.target.value);
                            setPage(0);
                        }}
                    />
                </Paper>
            </Container>

            {/* Modal d'édition */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
                <DialogTitle>Modifier l'article</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Titre"
                        fullWidth
                        margin="normal"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Editor
                            apiKey={`${import.meta.env.VITE_TINY_API_KEY}`}
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            value={editContent}
                            onEditorChange={(newContent) => setEditContent(newContent)}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Annuler</Button>
                    <Button onClick={handleSaveChanges} variant="contained" color="primary">
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TableArticles;
