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
   

    useEffect(() => {
        getArticle()
    }, [])
   

    return (
                   
            <CustomCarousel title={"Nos Réalisations"} slide={
                articles.map((article, index) => {
                const paragraphs = article.prelude?.slice(0, 200);
                

                return (
                    <Card key={index} sx={{ maxWidth: {sm:270, md:330, lg: 350}, height: {sm: 500, lg: 450}}}>
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
                            
                                    <Box dangerouslySetInnerHTML={{__html:paragraphs}} style={{textAlign: "justify", fontSize:{xs: "0.5rem", sm:"0.7rem"}}}></Box>
                   
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
