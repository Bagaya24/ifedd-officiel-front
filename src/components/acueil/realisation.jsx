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
                                    article.picture
                                        ? `data:image/jpeg;base64,${article.picture}`
                                        : 'https://via.placeholder.com/300x180?text=No+Image'
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
