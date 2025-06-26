import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { Footer } from '../components/footer';
import { TitleHeader } from '../components/titleHeader';
import { useLoaderData } from 'react-router';

export function Photos() {
  const data = useLoaderData();
  const [page, setPage] = useState(0);
  const photosPerPage = 9;

  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPhoto(null);
  };

  const startIndex = page * photosPerPage;
  const paginatedPhotos = data.slice(startIndex, startIndex + photosPerPage);

  const hasPrev = page > 0;
  const hasNext = startIndex + photosPerPage < data.length;

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
        <TitleHeader>Photos</TitleHeader>

        <Grid container rowSpacing={{xs:1, md:2}} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 4 }}>
          {paginatedPhotos.map((photo, index) => (
            <Grid size={{xs:12, sm:6, md:4}} key={index}>
              <Card sx={{ maxWidth: 460, minWidth: 460 }}>
                <CardMedia
                  component="img"
                  height="250"

                  image={
                    photo.photo_url
                      ? photo.photo_url
                      : 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'
                  }
                  alt={photo.legende}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {photo.legende?.slice(0, 100)} ...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOpenModal(photo)}>
                    <RemoveRedEyeOutlined color="primary" />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={!hasPrev} onClick={() => setPage((prev) => prev - 1)}>
            Précédent
          </Button>
          <Button disabled={!hasNext} onClick={() => setPage((prev) => prev + 1)}>
            Suivant
          </Button>
        </Box>
      </Container>

      {/* Modal for full-size image */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {selectedPhoto && (
          <>
            <DialogTitle>Image en grand</DialogTitle>
            <DialogContent>
              <img
                src={selectedPhoto.photo_url ||' https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww'}
                alt={selectedPhoto.legende}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <div dangerouslySetInnerHTML={{__html:selectedPhoto.legende}}>

                </div>
                
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Footer />
    </>
  );
}
