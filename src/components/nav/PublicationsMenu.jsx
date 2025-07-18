import { Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function PublicationsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        endIcon={<ExpandMoreIcon />}
        sx={{ textTransform: 'none', mx: 1, color: 'inherit' }}
      >
        Publication
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem component={NavLink} to="/publication/articles" onClick={handleMenuClose}>Articles</MenuItem>
        <MenuItem component={NavLink} to="/publication/rapports" onClick={handleMenuClose}>Rapports</MenuItem>
        <MenuItem component={NavLink} to="/publication/images" onClick={handleMenuClose}>Images</MenuItem>
        <MenuItem component={NavLink} to="/publication/partenaires" onClick={handleMenuClose}>Partenaires</MenuItem>
      </Menu>
    </>
  );
}
