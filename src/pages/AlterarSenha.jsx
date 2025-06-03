import { Box } from "@mui/material";
import FormAlterarSenha from "../components/FormAlterarSenha";

function AlterarSenha() {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 0,
        backgroundImage: 'url("/wallpaper.jpg")',
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
      <FormAlterarSenha/>
    </Box>
  );
}

export default AlterarSenha;
