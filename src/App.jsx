import { Button, Box, Typography } from "@mui/material";
import FormLogin from "./components/FormLogin";
import "./css/app.css"; // Importando o CSS

function App() {
  return (
    <Box className="app-container">
      <FormLogin />
    </Box>
  );
}

export default App;
