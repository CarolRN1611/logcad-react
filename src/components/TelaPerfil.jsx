import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar"; // Importação do Avatar
import IconButton from "@mui/material/IconButton"; // Para o ícone de adicionar
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; // Ícone de adicionar imagem
import { green } from "@mui/material/colors"; // Cor para o ícone
import Grid from "@mui/material/Grid"; // Para organizar as informações lado a lado

function TelaPerfil({ id }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null); // Estado para o avatar
  const navigate = useNavigate();

  const formatDataNascimento = (data) => {
    const [year, month, day] = data.split('-');
  const date = new Date(year, month - 1, day);

  const formattedDay = String(date.getDate()).padStart(2, '0');
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`
  };

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Dados do localStorage:", dados);

    const user = dados.find((user) => user.id == id);
    console.log("Usuário encontrado:", user);

    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  }, [id]);

  function Login() {
    navigate(`/`);
  }

  // Função para lidar com a seleção de arquivo de imagem
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Atualiza o avatar com a imagem selecionada
      };
      reader.readAsDataURL(file); // Lê a imagem como uma URL
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Usuário não encontrado.</div>;
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
        maxWidth: 800, // Aumentei o tamanho do container
        backgroundColor: "#f4f4f4",
        borderRadius: 4,
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        margin: "10vh auto",
      }}
    >
      {/* Avatar com ícone de adicionar */}
      <Box sx={{ position: "relative" }}>
        <Avatar
          sx={{ width: 120, height: 120, marginBottom: 2 }}
          alt="Foto do Usuário"
          src={avatar || "/static/images/avatar/1.jpg"} 
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
          component="label"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
          <AddPhotoAlternateIcon sx={{ color: green[500], fontSize: 32 }} />
        </IconButton>
      </Box>

      {/* Título de boas-vindas */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 3,
          textAlign: "center",
          fontSize: "32px", // Aumentei o tamanho da fonte
        }}
      >
        Bem-vindo, {user.nome}!
      </Typography>

      {/* Informações do usuário */}
      <Box
        sx={{
          width: "90%",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: 5,
          borderColor: "#ddd",
          mb: 4,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          },
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}> 
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px", // Aumentei o tamanho da fonte
              }}
            >
              Nome Completo:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
            {user.nome.charAt(0).toUpperCase() + user.nome.slice(1)}{" "}
            {user.sobrenome ? user.sobrenome.charAt(0).toUpperCase() + user.sobrenome.slice(1) : ""}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px",
              }}
            >
              Email:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px",
              }}
            >
              Telefone:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
              {user.telefone}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px",
              }}
            >
              CPF:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
              {user.cpf}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px",
              }}
            >
              Data de Nascimento:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
            {formatDataNascimento(user.dataNascimento)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#555",
                mb: 1,
                fontSize: "20px",
              }}
            >
              Gênero:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: "20px" }}>
              {user.genero.charAt(0).toUpperCase() + user.genero.slice(1)}
            </Typography>
          </Grid>
        </Grid>
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
            mt: 3,
          }}
          onClick={() => Login()}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default TelaPerfil;
