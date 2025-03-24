import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!email || !email.includes('@')) {
      setEmailError(true);
      return;
    }
    
    alert('Instruções para redefinição de senha enviadas para o seu email!');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10vh auto',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography 
        variant="h4" 
        sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
      >
        Recuperar Senha
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ color: '#555', mb: 3, textAlign: 'center' }}
      >
        Digite seu email para receber as instruções de redefinição de senha.
      </Typography>

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
        error={emailError}
        helperText={emailError ? 'Por favor, insira um email válido.' : ''}
        placeholder="Digite seu email"
      />

      <Button 
        type="submit" 
        variant="contained" 
        sx={{
          mt: 3,
          p: 1.5,
          width: '100%',
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#1565c0' },
        }}
        onClick={() => navigate('/validar-codigo')}
      >
        Enviar
      </Button>

      <Button
        variant="text"
        sx={{
          mt: 2,
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: '#1976d2',
          '&:hover': { textDecoration: 'underline' },
        }}
        onClick={() => navigate('/')}
      >
        Voltar para Login
      </Button>
    </Box>
  );
}

export default RecuperarSenha;