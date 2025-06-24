import { Box } from '@mui/material';

export function Image({ src, height = 300, children }) {
    return (
        <Box
            sx={{
                position: 'relative',
                height: `${height}px`, // Ajuste selon tes besoins
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                backgroundImage: `url(${src})`, // Remplace par ton image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': { // Overlay sombre pour améliorer la lisibilité
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }
            }}
        >{children}</Box>
    )
}