// src/components/Main.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
} from '@mui/material';

const Main = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('Documento não encontrado!');
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        console.log('Usuário não está autenticado');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!userData)
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Carregando...
          </Typography>
        </Box>
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        {/* Avatar e Saudação */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
            {userData.firstName.charAt(0)}
          </Avatar>
          <Typography variant="h4" component="h1">
            Bem-vindo, {userData.firstName}!
          </Typography>
        </Box>

        {/* Cartão com Informações do Usuário */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Suas Informações:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Nome:</strong> {userData.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Sobrenome:</strong> {userData.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Data de Nascimento:</strong> {userData.birthDate}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => alert('Funcionalidade em desenvolvimento')}
          >
            Editar Perfil
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => alert('Funcionalidade em desenvolvimento')}
          >
            Configurações
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Main;
