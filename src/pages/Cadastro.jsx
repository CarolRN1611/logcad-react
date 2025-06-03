import { Box } from "@mui/material";
import FormCadastro from "../components/FormCadastro";

function Cadastro() {
  return (
    <Box 
      sx={{
        textAlign: "center",
        p: 0,
        backgroundImage: 'url("/wallpaper.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh", // Garante que cubra toda a altura da tela
        width: "100vw", // Garante que cubra toda a largura da tela
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <FormCadastro/>
    </Box>
  );
}

export default Cadastro;
