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
                            <Typography gutterBottom component="div" align='center' sx={{ fontWeight: 'bold', fontSize: {xs:"0.8rem", sm:"0.9rem", md:"1rem"} }}>
                                {article.titre.slice(0, 80)+"..."}
                            </Typography>
                            
                                    <div dangerouslySetInnerHTML={{__html:paragraphs}} style={{textAlign: "justify", fontSize:{xs:"0.1rem", sm:"0.6rem", md:"0.7rem"}}}></div>
                        
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
