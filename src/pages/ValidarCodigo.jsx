import { Box } from "@mui/material";
import background from '../assets/wallpaper.jpg';
import FormValidarCodigo from "../components/FormValidarCodigo";

function ValidarCodigo() {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormValidarCodigo/>
    </Box>
  );
}

export default ValidarCodigo;
