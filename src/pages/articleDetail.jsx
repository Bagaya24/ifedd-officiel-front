
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Box,
    Divider,
    Paper,
} from '@mui/material';
import { NavLink, useLoaderData, useParams } from 'react-router';
import { Footer } from '../components/footer';
import AddCommentaires from '../components/articles/AddCommentaires';
import Commentaires from '../components/articles/commentaires';
import { useEffect } from 'react';


export function ArticleDetail() {
    const {articles} = useLoaderData();
    const { id } = useParams();
    // const [commentaires, setCommentaires] = useState(false);
    const article = articles.find((a) => a.idArticle.toString() === id);
    const autresArticles = articles.filter((a) => a.idArticle.toString() !== id);
    

    if (!article) return <Typography>Article non trouvé</Typography>;

    return (<>
        <Container
            maxWidth="xl"
            sx={{
                height: '100vh',
                overflow: 'hidden',
                pt: 10,

            }}
        >
            <Grid container spacing={2} sx={{ height: '100%' }}>
                {/* Article principal */}
                <Grid

                    size={{ xs: 12, sm: 12, md: 9, lg: 9 }}
                    sx={{
                        height: '100%',
                        overflowY: 'auto',
                        pr: 2,
                        pb: 3
                    }}
                >
                    <Paper elevation={3} sx={{ borderRadius: 4, p: 2 }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={
                                article.picture_url
                                    ? article.picture_url
                                    : '/Logo.png'
                            }
                            alt={article.titre}
                            sx={{ objectFit: 'cover', borderRadius: 2 }}
                        />
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom align='center'>
                                {article.titre}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {article.DatePublication &&
                                    new Date(article.DatePublication).toLocaleDateString()}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                                <Typography variant="body1">
                                    {article.redacteur || 'Auteur inconnu'}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <div dangerouslySetInnerHTML={{ __html: article.texte }} style={{textAlign: "justify"}} >
                            </div>
                        </Box>
                    </Paper>
                </Grid>

                {/* Autres articles */}

                <Grid
                    size={{ xs: 12, sm: 12, md: 3, lg: 3 }}
                    sx={{
                        height: '100%',
                        overflowY: { xs: 'unset', md: 'auto' },
                        overflowX: { xs: 'auto', md: 'hidden' },
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ pl: { xs: 1, md: 0 } }}>
                        Lire aussi
                    </Typography>

                    {/* Conteneur scrollable horizontal sur mobile */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' },
                            gap: 2,
                            overflowX: { xs: 'auto', md: 'unset' },
                            pb: { xs: 2, md: 0 },
                        }}
                    >
                        {autresArticles.map((a) => (
                            <Card
                                key={a.idArticle}
                                sx={{
                                    display: 'flex',
                                    minWidth: { xs: 250, md: '100%' },
                                    maxWidth: { xs: 300, md: '100%' },
                                    flexDirection: 'row',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'scale(1.01)',
                                    },
                                }}
                                component={NavLink}
                                to={`/articles/${a.idArticle}`}     
                            >
                                <CardMedia
                                    component="img"
                                    image={
                                        a.picture_url
                                            ? a.picture_url
                                            : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'
                                    }
                                    alt={a.titre}
                                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {a.titre.length > 50 ? a.titre.slice(0, 47) + '...' : a.titre}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {a.DatePublication &&
                                            new Date(a.DatePublication).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>

        </Container>
        <Grid container spacing={2} sx={{ mt: 4, px: 2, backgroundColor: "#eceff1" }}>
            <Grid size={{ xs: 12, md: 4 }}><AddCommentaires id={id} /></Grid>
            <Grid size={{ xs: 12, md: 8 }}><Commentaires id={id} /></Grid>
        </Grid>

        <Footer />
    </>

    );
}
