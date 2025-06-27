import { Box, Container, Typography } from '@mui/material'

export default function Commentaires({ commentaires }) {
  return (
    <Container>
      <Typography variant="h4" color="#2a3eb1" sx={{ fontWeight: "bold" }}>Commentaires</Typography>
      {commentaires?.map((commentaire, index) => (
        <Box py={2} key={index}>
          <Typography variant="subtitle1" color="#455a64" noWrap>{commentaire.content}</Typography>
          <Typography variant="body2" color="#4fc3f7">{commentaire.auteur}</Typography>
        </Box>
      ))}
    </Container>
  );
}
