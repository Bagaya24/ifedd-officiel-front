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
                   
            <CustomCarousel title={"Nos Réalisations et Articles"} slide={
                articles.map((article, index) => {
                const paragraphs = article.prelude?.slice(0, 200);
                

                return (
                    <Card 
                        key={index} 
                        component={NavLink}
                        to={`/articles/${article.idArticle}`}
                        sx={{
                            height: {sm: 500, lg: 450},
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                transition: 'transform 0.2s ease-in-out',
                            }
                        }}
                    >
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
                    </Card>
                );
            })}
            />
      
    );
}
