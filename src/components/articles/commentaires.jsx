import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { API_BASE } from '../../hooks/config'

export default function Commentaires({id}) {
    const [comentaires, setComentaire] = useState()
    useEffect(() => {
        const v = async () => {
            const response = await fetch(`${API_BASE}/articles/commentaire/${id}`,
                {
                    method: "GET",
                }
            )
            if (response.ok) {
                response.json().then((data) => setComentaire(data))
                return
            }
            throw new Error("Une erreur s'est passée lors de la recuperation des commentaires");
            
        }
        v()
    }, [])
    
  return (
    <Container>
        <Typography variant='h4' color='#2a3eb1' sx={{fontWeight: "bold"}}>Commentaires</Typography>
      {comentaires?.map((commentaire, index) => (
        <Box py={2} key={commentaire.content}>
            <Typography variant='subtitle1' color='#455a64' noWrap>
                {commentaire.content}
            </Typography>
            <Typography variant='body2' color='#4fc3f7'>
                {commentaire.auteur}
            </Typography>
        </Box>
      ))}
    </Container>
  )
}
