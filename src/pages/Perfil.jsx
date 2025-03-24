import { Box } from "@mui/material";
import background from '../assets/wallpaper.jpg';
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
        backgroundColor: "#f0f0f0",
        height: 'auto',
        width: 'auto',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <TelaPerfil/>
    </Box>
  );
}

export default Perfil;
