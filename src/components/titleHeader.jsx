import { Typography } from '@mui/material'


export function TitleHeader({children}) {
  return (
    <Typography variant="h2" align="center" color='#2a3eb1' gutterBottom fontWeight={700} p={3}>
                {children}
    </Typography>
  )
}


