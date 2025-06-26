import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';
import { NavLink, useLoaderData } from 'react-router';
import CustomCarousel from './cunstomeCarousel';


export function Realisation() {
    const {articles} = useLoaderData()


    return (
                   
            <CustomCarousel title={"Réalisations"} slide={
                articles.map((article, index) => {
                const paragraphs = article.prelude?.slice(0, 200);
                

                return (
                    <Card key={index} sx={{ maxWidth: 450, minHeight: 500, maxHeight: 500 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={
                                    article.picture_url
                                        ? article.picture_url
                                        : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'
                                }
                            title={article.titre}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="subtitle2" component="div" align='center' sx={{ fontWeight: 'bold' }}>
                                {article.titre}
                            </Typography>
                            
                                    <div dangerouslySetInnerHTML={{__html:paragraphs}}></div>
                        
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
