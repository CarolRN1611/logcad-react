import { Box } from "@mui/material";
import TelaPerfil from "../components/TelaPerfil";
import { useParams } from "react-router-dom";

function Perfil() {

  const { id } = useParams();
  console.log("ID recebido:", id);

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
      <TelaPerfil id={id}/>
    </Box>
  );
}

export default Perfil;