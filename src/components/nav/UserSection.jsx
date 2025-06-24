import { Typography } from '@mui/material';
import BadgeAvatars from '../avatar';

export default function UserSection({ username }) {
  return (
    <>
      <BadgeAvatars />
      <Typography variant="body2" sx={{ ml: 1, color: '#455a64' }}>
        {username}
      </Typography>
    </>
  );
}
