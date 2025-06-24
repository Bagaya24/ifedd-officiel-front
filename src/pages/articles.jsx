import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Box,
    CardActions,
    Button,
} from '@mui/material';
import { NavLink, useLoaderData } from 'react-router';
import { Footer } from '../components/footer';
import {TitleHeader} from '../components/titleHeader'
import { useState } from 'react';
import { useEffect } from 'react';

export function Articles() {
    const data = useLoaderData();
    const [gridSize, setGridSize] = useState(4); // valeur par défaut (1/3 de la grille)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setGridSize(12); // pleine largeur sur mobile
      } else if (width < 960) {
        setGridSize(6); // moitié sur tablette
      } else {
        setGridSize(4); // un tiers sur desktop
      }
    };

    // Exécuter une fois au chargement
    handleResize();
    // Réécoute sur redimensionnement
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return (
        <>
        <Container maxWidth="xl" sx={{ py: 10 }}>
            <TitleHeader>Article</TitleHeader>

            <Grid container spacing={4}>
                {data.map((article) => (
                    <Grid item key={article.idArticle} size={gridSize}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                borderRadius: 4,

                                color: '#121858',
                                overflow: 'hidden',
                                boxShadow: 6,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: 10,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={
                                    article.picture
                                        ? `data:image/jpeg;base64,${article.picture}`
                                        : 'https://via.placeholder.com/300x180?text=No+Image'
                                }
                                alt={article.titre}
                                sx={{ objectFit: 'cover' }}
                            />

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="caption" color="gray">
                                    {'Actualité'}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    gutterBottom

                                    sx={{ mt: 1 }}
                                >
                                    {article.titre}
                                </Typography>
                                <Typography variant="body2" color="gray" dangerouslySetInnerHTML={{__html:article.prelude?.slice(0, 100)}}>
                                    
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={NavLink} to={`/articles/${article.idArticle}`}>Lire suite</Button>
                            </CardActions>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    px: 2,
                                    pb: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                                    <Typography variant="body2">
                                        {article.redacteur || 'Auteur inconnu'}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="gray">
                                    {new Date(article.DatePublication).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        <Footer/>
        </>
        
    );
}
