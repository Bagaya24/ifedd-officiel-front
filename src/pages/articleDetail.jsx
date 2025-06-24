
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
import { useLoaderData, useParams } from 'react-router';
import { Footer } from '../components/footer';
import AddCommentaires from '../components/articles/AddCommentaires';
import Commentaires from '../components/articles/commentaires';

export function ArticleDetail() {
    const articles = useLoaderData();
    const { id } = useParams();
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
            <Grid container spacing={2} sx={{ height: '100%'}}>
                {/* Article principal */}
                <Grid
                    
                    size={9}
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
                                article.picture
                                    ? `data:image/jpeg;base64,${article.picture}`
                                    : 'https://via.placeholder.com/800x400?text=No+Image'
                            }
                            alt={article.titre}
                            sx={{ objectFit: 'cover', borderRadius: 2 }}
                        />
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom align='center'>
                                {article.titre}
                            </Typography>
                            {/* <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {article.DatePublication &&
                                    new Date(article.DatePublication).toLocaleDateString()}
                            </Typography> */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                                <Typography variant="body1">
                                    {article.redacteur || 'Auteur inconnu'}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                                <div dangerouslySetInnerHTML={{__html:article.texte}}>

                                </div>
                              
                           
                        </Box>
                    </Paper>
                </Grid>

                {/* Autres articles */}
                <Grid
                    
                    size={3}
                    sx={{
                        height: '100%',
                        overflowY: 'auto',
                        py: 2
                    }}
                >
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Lire aussi
                    </Typography>
                    <Grid container spacing={2}>
                        {autresArticles.map((a) => (
                            <Grid item xs={12} key={a.idArticle}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        '&:hover': {
                                            boxShadow: 6,
                                            transform: 'scale(1.01)',
                                        },
                                    }}
                                    onClick={() => (window.location.href = `/articles/${a.idArticle}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        image={
                                            a.picture
                                                ? `data:image/jpeg;base64,${a.picture}`
                                                : 'https://via.placeholder.com/100x100?text=No+Img'
                                        }
                                        alt={a.titre}
                                        sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {a.titre.length > 50 ? a.titre.slice(0, 47) + '...' : a.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {a.DatePublication &&
                                                new Date(a.DatePublication).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            
        </Container>
        <Grid container spacing={2} sx={{ mt: 4, px: 2, backgroundColor: "#eceff1" }}>
           <Grid size={4}><AddCommentaires id={id} /></Grid>
           <Grid size={8}><Commentaires id={id}/></Grid>
        </Grid>
        
        <Footer />
    </>

    );
}
