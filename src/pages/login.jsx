// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Container, Box, Typography, TextField, Button, CircularProgress, Alert, Paper
} from '@mui/material';
import { useNavigate } from 'react-router';
import { loginUser, validateLoginForm } from '../utils/autheService';


export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm(username, password, setError)) return;

    setIsLoading(true);
    const { success, message } = await loginUser(username, password);
    setIsLoading(false);

    if (success) {
      navigate('/');
    } else {
      setError(message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Connexion
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
