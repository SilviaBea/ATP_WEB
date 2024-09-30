// src/components/Home.js
import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Por favor, escolha uma opção:
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/register"
          >
            Cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
