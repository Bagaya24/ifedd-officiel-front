import { Box, Container, Typography } from '@mui/material'

export default function Commentaires({ commentaires }) {
  return (
    <Container>
      <Typography variant="h4" color="#2a3eb1" sx={{ fontWeight: "bold" }}>Commentaires</Typography>
      {commentaires?.map((commentaire, index) => (
        <Box py={2} key={index} sx={{ borderLeft: "4px solid #0288d1", pl: 2, mb: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="subtitle1" color="#455a64" noWrap>{commentaire.content}</Typography>
          <Typography variant="body2" sx={{fontWeight: "bold"}} color="#0288d1">{commentaire.auteur}</Typography>
        </Box>
      ))}
    </Container>
  );
}
