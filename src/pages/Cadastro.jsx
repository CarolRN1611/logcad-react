import { Box } from "@mui/material";
import background from '../assets/wallpaper.jpg';
import FormCadastro from "../components/FormCadastro";

function Cadastro() {
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
      <FormCadastro/>
    </Box>
  );
}

export default Cadastro;
