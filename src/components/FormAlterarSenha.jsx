import * as React from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material'; // Verifique se o TextField está importado aqui
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function AlterarSenha() {

  const navigate = useNavigate();

  // Definindo os estados necessários
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [senhaErro, setSenhaErro] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  // Função para validar a senha
  const validarSenha = () => {
    if (password !== passwordConfirm) {
      setSenhaErro('As senhas não coincidem. Por favor, verifique.');
      setIsFormValid(false);
    } else {
      setSenhaErro('');
      setIsFormValid(true);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o envio do formulário e o recarregamento da página
    if (isFormValid) {
      navigate('/'); // Navega para a página inicial, ou qualquer outra página que você queira
    } else {
      console.log('Formulário inválido');
    }
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
        sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
      >
        Recuperar Senha
      </Typography>

      {/* Campo de Senha */}
      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Nova senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={validarSenha}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{ position: 'absolute', right: '10px', top: '20%' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />

      {/* Campo de Confirmar Senha */}
      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Digite a senha novamente"
        type={showPassword ? "text" : "password"}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        onBlur={validarSenha}
        error={!!senhaErro} // Exibe erro caso as senhas não coincidam
        helperText={senhaErro}
      />

      {/* Botão para Submeter o Formulário */}
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
        disabled={!isFormValid} // Desabilita o botão se o formulário for inválido
      >
        Alterar
      </Button>

      {/* Botão para Retornar */}
      <Button
        variant="text"
        sx={{
          mt: 2,
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: "#1976d2",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => navigate("/recuperar-senha")}
      >
        Retornar
      </Button>

    </Box>
  );
}

export default AlterarSenha;
