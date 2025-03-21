import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'; // Para usar com helperText
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function FormCadastro(){
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailConfirmError, setEmailConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !emailConfirm || !password || !passwordConfirm || !nome || !sobrenome || !telefone || !cpf) {
      if (!email) setEmailError(true);
      if (!emailConfirm) setEmailConfirmError(true);
      if (!password) setPasswordError(true);
      if (!passwordConfirm) setPasswordConfirmError(true);
      return;
    }
    if (!email.includes('@')) {
      setEmailError(true);
      return;
    }
    if (email !== emailConfirm) {
      setEmailConfirmError(true);
      return;
    }
    if (password.length < 8 || password !== passwordConfirm) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      return;
    }
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja cadastrar ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, cadastrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cadastrado com sucesso!",
          text: "O usuário foi cadastrado.",
          icon: "success"
        }).then(() => {
          Login(); 
        });
      }
    });    
  };

  function Login() {
    navigate(`/`);
  }

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
        sx={{
          fontWeight: 'bold', color: '#333', mb: 2
        }}
      >
        Cadastre-se
      </Typography>

      <Typography 
        variant="body1" 
        sx={{
          color: '#555', mb: 3 
        }}
      >
        Insira suas informações abaixo.
      </Typography>

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Sobrenome"
        variant="outlined"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
        placeholder="Digite seu sobrenome"
      />

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
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

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Confirme o Email"
        variant="outlined"
        value={emailConfirm}
        onChange={(e) => {
          setEmailConfirm(e.target.value);
          setEmailConfirmError(false);
        }}
        error={emailConfirmError}
        helperText={emailConfirmError ? 'Os emails não coincidem.' : ''}
        placeholder="Confirme seu email"
      />

      <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" required error={passwordError}>
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          placeholder="Digite sua senha"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
        {passwordError && (
          <FormHelperText error> A senha deve ter pelo menos 8 caracteres. </FormHelperText>
        )}
      </FormControl>

      <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" required error={passwordConfirmError}>
        <InputLabel htmlFor="outlined-adornment-password-confirm">Confirme a Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-confirm"
          type={showPassword ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            setPasswordConfirmError(false);
          }}
          placeholder="Confirme sua senha"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirme a Senha"
        />
        {passwordConfirmError && (
          <FormHelperText error> As senhas não coincidem. </FormHelperText>
        )}
      </FormControl>

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="Telefone"
        variant="outlined"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Digite seu telefone"
      />

      <TextField
        sx={{ m: 1, width: '100%' }}
        required
        label="CPF"
        variant="outlined"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF"
      />

      <Button type="submit" variant="contained" sx={{
        mt: 3,
        p: 1.5,
        width: '100%',
        backgroundColor: '#1976d2',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': { backgroundColor: '#1565c0' },
      }}>
        Cadastrar
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

export default FormCadastro;
