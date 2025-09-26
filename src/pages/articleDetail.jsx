import {
    Container, Grid, Card, CardMedia, CardContent,
    Typography, Avatar, Box, Divider, Paper,
} from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Footer } from '../components/footer';
import AddCommentaires from '../components/articles/AddCommentaires';
import Commentaires from '../components/articles/commentaires';
import UseFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import Spinner from '../components/spinners/Spinner';


export function ArticleDetail() {
        const { articles, getArticle, commentaires, getCommentaires, loader } = UseFetch();
    const { id } = useParams();
    const article = articles.find((a) => a.idArticle.toString() === id);
    const autresArticles = articles.filter((a) => a.idArticle.toString() !== id);

    useEffect(() => {
        getCommentaires(id);
    }, [id]);

    useEffect(() => {
        getArticle();
        getCommentaires(id);
    }, []);

    useEffect(() => {
        if (article) {
            // Mise à jour du titre
            document.title = `${article.titre} - IFEDD`;
            
            // Description extraite du contenu
            const description = getArticleDescription(article.texte) || 'Lire cet article sur IFEDD.';
            const imageUrl = article.picture_url || 'https://ifedd-rdc.org/Logo.png';
            const currentUrl = window.location.href;

            // Mise à jour des métadonnées existantes ou création
            updateMetaTag('og:title', article.titre);
            updateMetaTag('og:description', description);
            updateMetaTag('og:image', imageUrl);
            updateMetaTag('og:url', currentUrl);
            updateMetaTag('og:type', 'article');
            
            updateMetaTag('twitter:title', article.titre);
            updateMetaTag('twitter:description', description);
            updateMetaTag('twitter:image', imageUrl);

            // Ajout de balises spécifiques aux articles
            updateMetaTag('article:published_time', article.DatePublication);
            if (article.redacteur) {
                updateMetaTag('article:author', article.redacteur);
            }

            // Forcer le re-scrap pour certains réseaux sociaux
            forceSocialMediaRescrape(currentUrl);
        }

        return () => {
            document.title = 'IFEDD';
            // On ne supprime pas les métadonnées pour éviter les problèmes avec les robots
        };
    }, [article]);

    const updateMetaTag = (property, content) => {
        if (!content) return;
        
        // Pour les propriétés standard
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.querySelector(`meta[name="${property}"]`);
        }
        
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.setAttribute('property', property);
            } else {
                meta.setAttribute('name', property);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    };

    const getArticleDescription = (html) => {
        if (!html) return null;
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.slice(0, 160).trim() + (text.length > 160 ? '...' : '');
    };

    const forceSocialMediaRescrape = (url) => {
        // Forcer le re-scrap Facebook
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        
        // Informer Twitter
        if (window.twttr) {
            window.twttr.widgets.load();
        }
    };

    if (!article) return <Spinner loader={loader} />;

    // Ajouter des métadonnées structurées JSON-LD (bon pour le SEO)
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.titre,
        description: getArticleDescription(article.texte),
        image: article.picture_url || 'https://ifedd-rdc.org/Logo.png',
        datePublished: article.DatePublication,
        author: {
            '@type': 'Person',
            name: article.redacteur || 'IFEDD'
        },
        publisher: {
            '@type': 'Organization',
            name: 'IFEDD',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ifedd-rdc.org/Logo.png'
            }
        }
    };
    

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
                            <div dangerouslySetInnerHTML={{ __html: article.texte }} style={{ textAlign: "justify" }} >
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
                    }}
                >
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ pl: { xs: 1, md: 0 } }}>
                        Lire aussi
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' },
                            gap: 2,
                            overflowX: { xs: 'auto', md: 'unset' },
                            width: '100%',
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
                                    image={a.picture_url ? a.picture_url : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'}
                                    alt={a.titre}
                                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {a.titre.length > 50 ? a.titre.slice(0, 47) + '...' : a.titre}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {a.DatePublication && new Date(a.DatePublication).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Grid>

            </Grid>

        </Container>
        <Grid container spacing={1} sx={{ mt: 4, px: 2}}>
            <Grid size={{xs: 12, md: 4}} >
                <AddCommentaires id={id} onCommentAdded={getCommentaires} />
            </Grid>
            <Grid size={{xs: 12, md: 8}} >
                <Commentaires commentaires={commentaires} />
            </Grid>
        </Grid>

        <Footer />
    </>

    );
}
