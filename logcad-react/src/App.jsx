import { Button, Box, Typography } from "@mui/material"; // Usando Box em vez de Container
import FormLogin from "./components/FormLogin";
import background from '../src/assets/wallpaper.jpg';

function App() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 0, 
        p: 0, 
        backgroundImage: `url(${background})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
        height: "100vh", 
        width: "100vw", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
      }}
    >
      
      <FormLogin />
    </Box>
  );
}

export default App;
