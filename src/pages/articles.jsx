import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Box,
    Button,
} from '@mui/material';
import { NavLink} from 'react-router-dom';
import { Footer } from '../components/footer';
import { TitleHeader } from '../components/titleHeader';
import UseFetch from '../hooks/useFetch';

export function Articles() {
    const {articles, getArticle} = UseFetch()
   
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getArticle()
    }, [])

    const articlesPerPage = 6;
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = articles.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <TitleHeader>Articles</TitleHeader>
                
                <Grid container spacing={{xs:2, sm:3, md:4}} sx={{ mt: 4 }}>
                    {currentArticles.map((article) => (
                        <Grid key={article.idArticle} size={{xs: 12, sm: 6, md: 4}}>
                            <Card
                                component={NavLink}
                                to={`/articles/${article.idArticle}`}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderRadius: 4,
                                    color: '#121858',
                                    overflow: 'hidden',
                                    boxShadow: 6,
                                    transition: 'transform 0.2s',
                                    textDecoration: 'none',
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
                                        article.picture_url
                                            ? article.picture_url
                                            : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'
                                    }
                                    alt={article.titre}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="caption" color="gray">Actualité</Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ mt: 1 }}
                                    >
                                        {article.titre}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="gray"
                                        dangerouslySetInnerHTML={{
                                            __html: article.prelude?.slice(0, 100),
                                        }}
                                    />
                                </CardContent>
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

                {/* Pagination Controls */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 4,
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? 'contained' : 'outlined'}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </Button>
                </Box>
            </Container>

            <Footer />
        </>
    );
}
