import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TelaPerfil() {
  const user = {
    name: "João",
    email: "teste@exemplo.com",
    senha: "senha123",
    sobrenome: "Silva",
    telefone: "(11) 91234-5678",
    cpf: "123.456.789-00",
  };
  const navigate = useNavigate();

  function Login() {
    navigate(`/`);
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        width: "90%",
        maxWidth: 600,
        backgroundColor: "#fff",
        borderRadius: 4,
        margin: "10vh auto",
      }}
    >
      {/* Título de boas-vindas */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 3,
          textAlign: "center",
        }}
      >
        Bem-vindo, {user.name}!
      </Typography>

      {/* Informações do usuário */}
      <Box
        sx={{
          width: "100%",
          padding: 3,
          backgroundColor: "#fafafa",
          borderRadius: 5,
          mb: 4,
          borderColor : "#ddd",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Nome Completo:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.name} {user.sobrenome}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Email:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.email}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Telefone:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.telefone}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          CPF:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.cpf}
        </Typography>
      </Box>

      {/* Botão de Logout */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => Login()}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default TelaPerfil;
