// src/components/Login.js
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // Autenticar o usuário com Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar se os dados do usuário existem no Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Os dados do usuário existem, prosseguir para a página principal
        navigate('/main');
      } else {
        // Os dados do usuário não existem no Firestore
        setErrorMsg('Dados do usuário não encontrados no banco de dados.');
        // Opcional: deslogar o usuário
        await auth.signOut();
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMsg('Usuário não registrado ou credenciais incorretas.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Campos de entrada */}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {/* Botão de Login */}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
        {/* Mensagem de Erro */}
        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      </Box>
    </Container>
  );
};

export default Login;
