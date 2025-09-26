import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Avatar,
    Paper,
    Container,
    Grid,
    Divider
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import UseFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import Spinner from '../spinners/Spinner';

export function DernierArticle() {
    const { articles, getArticle, loader } = UseFetch();

    useEffect(() => {
        getArticle();
    }, []);

    // Récupérer le dernier article (celui avec l'ID le plus élevé)
    const dernierArticle = articles.length > 0 
        ? articles.reduce((prev, current) => 
            (prev.idArticle > current.idArticle) ? prev : current
          )
        : null;

    if (!dernierArticle) return <Spinner loader={loader} />;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{ 
                    fontWeight: 'bold',
                    mb: 4,
                    color: '#121858',
                    textAlign: 'center'
                }}
            >
                Notre Dernier Article
            </Typography>
            <Paper 
                elevation={3} 
                sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 8,
                    }
                }}
                component={NavLink}
                to={`/articles/${dernierArticle.idArticle}`}
                style={{ textDecoration: 'none' }}
            >
                <Grid container spacing={1}>
                    {/* Image Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%',
                                height: { xs: '300px', md: '100%' },
                                objectFit: 'cover'
                            }}
                            image={
                                dernierArticle.picture_url
                                    ? dernierArticle.picture_url
                                    : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'
                            }
                            alt={dernierArticle.titre}
                        />
                    </Grid>

                    {/* Content Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography 
                                variant="overline" 
                                sx={{ 
                                    color: 'primary.main',
                                    fontWeight: 'bold'
                                }}
                            >
                                Dernière Publication
                            </Typography>
                            <Typography 
                                variant="h5" 
                                component="h3" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: '#121858',
                                    mb: 2
                                }}
                            >
                                {dernierArticle.titre}
                            </Typography>
                            
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                
                                sx={{ 
                                    flex: 1,
                                    textAlign: 'justify'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: dernierArticle.prelude?.slice(0, 300) + '...'
                                }}
                            />

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {dernierArticle.redacteur || 'Auteur inconnu'}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {dernierArticle.DatePublication && 
                                        new Date(dernierArticle.DatePublication).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
