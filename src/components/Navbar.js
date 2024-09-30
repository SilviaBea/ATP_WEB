// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material'; // Ícone de voltar
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Botão de Voltar */}
        {location.pathname !== '/' && (
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBack />
          </IconButton>
        )}

        {/* Título ou Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Minha Aplicação
        </Typography>

        {/* Botões de Navegação */}
        {user ? (
          <>
            {/* Botão de Logout */}
            <Button color="inherit" onClick={handleLogout}>
              Deslogar
            </Button>
          </>
        ) : (
          <>
            {/* Botões de Login e Cadastro */}
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Cadastro
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
