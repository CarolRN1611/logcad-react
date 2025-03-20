import { Button, Box, Typography } from "@mui/material"; // Usando Box em vez de Container
import FormLogin from "./components/FormLogin";
import background from '../src/assets/background.jpg';

function App() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 0, // Remover margem superior
        p: 0,  // Remover padding para o box ocupar toda a tela
        backgroundImage: `url(${background})`, // Definindo a imagem de fundo
        backgroundSize: "cover", // Faz a imagem cobrir toda a tela
        backgroundPosition: "center", // Centraliza a imagem
        height: "100vh", // Garante que o box ocupe 100% da altura da tela
        width: "100vw", // Garante que o box ocupe 100% da largura da tela
        display: "flex", // Usa flexbox para centralizar o conteúdo
        flexDirection: "column", // Organiza os itens verticalmente
        justifyContent: "center", // Centraliza o conteúdo verticalmente
        alignItems: "center", // Centraliza o conteúdo horizontalmente
      }}
    >
      
      <FormLogin />
    </Box>
  );
}

export default App;
