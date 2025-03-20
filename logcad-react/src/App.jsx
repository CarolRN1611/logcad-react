import { Button, Container, Typography } from "@mui/material";
import FormLogin from "./components/FormLogin";
function App(){
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <FormLogin></FormLogin>
    </Container>
  );
}

export default App;