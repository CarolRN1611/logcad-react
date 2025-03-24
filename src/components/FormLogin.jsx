import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText"; // Para usar com helperText
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import PersonIcon from "@mui/icons-material/Person";
import InstagramIcon from "@mui/icons-material/Instagram";
import Swal from "sweetalert2";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const navigateCad = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;

    if (!email) {
      setEmailError(true);
      setHelperText("O campo de email é obrigatório");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError(true);
      setHelperText("Digite um email válido");
      hasError = true;
    } else {
      setEmailError(false);
      setHelperText("");
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; //vou usar para recuperar os dados do LocalStorage

    const user = usuarios.find((user) => user.email === email);

    if (!user) {
      Swal.fire("Email não encontrado!", "", "error");
    } else if (user.senha !== password) {
      Swal.fire("Senha incorreta!", "", "error");
    } else {
      Swal.fire("Login realizado!", "", "success");
    }
  };

  function Cadastro() {
    navigateCad(`/cadastro`);
  }
  function Recuperarsenha() {
    navigateCad(`/recuperar-senha`);
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        width: "90%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "10vh auto",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 2,
        }}
      >
        Seja Bem-Vindo!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#555",
          mb: 3,
        }}
      >
        Faça login usando email e senha
      </Typography>

      <TextField
        sx={{ m: 1, width: "100%", borderColor: "black" }}
        required
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
          setHelperText("");
        }}
        error={emailError}
        helperText={helperText}
        placeholder="Digite seu email"
        InputProps={{
          sx: {
            "& input::placeholder": { color: "gray", opacity: 1 },
          },
          endAdornment: (
            <InputAdornment position="end" sx={{ mr: -0.5 }}>
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl
        sx={{ m: 1, width: "100%" }}
        variant="outlined"
        required
        error={passwordError}
      >
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          placeholder="Digite sua senha"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
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
          InputProps={{
            sx: {
              "& input::placeholder": { color: "gray", opacity: 1 }, // Ajuste correto para o placeholder
            },
          }}
        />
        {passwordError && (
          <FormHelperText error>
            {" "}
            A senha deve ter pelo menos 8 caracteres.{" "}
          </FormHelperText>
        )}
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          mt: 1,
          px: 1, // Pequeno padding para manter alinhamento em telas menores
        }}
      >
        <Button
          variant="text"
          sx={{
            fontSize: "0.7rem",
            fontWeight: "bold",
            color: "#1976d2",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => Recuperarsenha()}
        >
          Esqueceu a Senha?
        </Button>

        <Button
          variant="text"
          sx={{
            fontSize: "0.7rem",
            fontWeight: "bold",
            color: "#1976d2",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => Cadastro()}
        >
          Novo Aqui? Criar Conta
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          p: 1.5,
          width: "100%",
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Login
      </Button>

      <Typography
        variant="body1"
        sx={{
          mt: 3,
          mb: 3,
          color: "#555",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Ou faça login com uma rede social
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          aria-label="Login com Google"
          sx={{
            p: 1.5,
            minWidth: "55px",
            borderRadius: "8px",
            borderColor: "#ccc",
            color: "#333",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <GoogleIcon />
        </Button>

        <Button
          variant="contained"
          aria-label="Login com Apple"
          sx={{
            p: 1.5,
            minWidth: "55px",
            borderRadius: "8px",
            borderColor: "#ccc",
            color: "#333",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <AppleIcon />
        </Button>

        <Button
          variant="contained"
          aria-label="Login com Instagram"
          sx={{
            p: 1.5,
            minWidth: "55px",
            borderRadius: "8px",
            borderColor: "#ccc",
            color: "#333",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <InstagramIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default FormLogin;
