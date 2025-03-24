import { Box } from "@mui/material";
import background from "../assets/wallpaper.jpg";
import TelaPerfil from "../components/TelaPerfil";

function Perfil() {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 0,
        backgroundImage: `url(${background})`,
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
      <TelaPerfil />
    </Box>
  );
}

export default Perfil;