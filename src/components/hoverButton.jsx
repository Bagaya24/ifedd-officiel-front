import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';


// Bouton personnalisé avec effets
export const HoverButton = styled(Button)(({ theme }) => ({
  fontWeight: 600, // Semi-bold
  color: 'inherit',
  '&:hover': {
    transform: 'scale(1.05)',
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
    
  },
}));