import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { NavLink, useLoaderData } from 'react-router-dom';
import CustomCarousel from './cunstomeCarousel';
import UseFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';


export function Realisation() {
    const {articles, getArticle} = UseFetch()
    const [textSize, setTextSize] = useState("0.7rem");

    useEffect(() => {
        getArticle()
    }, [])
       useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 600) {
          setTextSize("0.5rem"); // pleine largeur sur mobile
        } else if (width < 960) {
          setTextSize("0.6rem"); // moitié sur tablette
        } else {
          setTextSize("0.7rem"); // un tiers sur desktop
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
                   
            <CustomCarousel title={"Nos Réalisations"} slide={
                articles.map((article, index) => {
                const paragraphs = article.prelude?.slice(0, 200);
                

                return (
                    <Card key={index} sx={{ maxWidth: {xs:300, sm:350, md:400}, height: 450}}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={
                                    article.picture_url
                                        ? article.picture_url
                                        : './Logo.png'
                                }
                            title={article.titre}
                        />
                        <CardContent>
                            <Typography gutterBottom component="div" align='center' sx={{ fontWeight: 'bold', fontSize: {xs:"0.7rem", sm:"0.9rem", md:"1rem"} }}>
                                {article.titre.slice(0, 80)+"..."}
                            </Typography>
                            
                                    <Box dangerouslySetInnerHTML={{__html:paragraphs}} style={{textAlign: "justify", fontSize:{textSize}}}></Box>
                   
                        </CardContent>
                        <CardActions>
                            <CardActions>
                                <Button size="small" component={NavLink} to={`/articles/${article.idArticle}`}>Lire suite</Button>
                            </CardActions>
                        </CardActions>
                    </Card>
                );
            })}
            />
      
    );
}
