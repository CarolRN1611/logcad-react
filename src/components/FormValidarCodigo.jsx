import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert2';

function ValidarCodigo() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(digits.includes('')) {
      swal.fire("Erro!", "Por favor, preencha todos os campos do código", "error");
      return;
    }
    
    const digitSequence = digits.join(''); // Junta os dígitos em uma string
    alert(`Sequência digitada: ${digitSequence}`);
    navigate('/alterar-senha');
  };

  const [digits, setDigits] = useState(Array(6).fill(''));
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
     
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
    }
  };
  const styles = {
    app: {
      textAlign: 'center',
      marginTop: '50px',
    },
    digitInputs: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
    },
    digitBox: {
      width: '40px',
      height: '45px',
      fontSize: '20px',
      textAlign: 'center',
      margin: '2px',
      border: '1px solid rgb(0, 0, 0)',
      borderRadius: '10px',
    },
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10vh auto',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit} // Adiciona a lógica de submissão
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Validar Código
      </Typography>

      <Typography variant="body1" 
      sx={{ mb: 3, textAlign: 'center' }}>
      Digite o código de 6 dígitos enviado para o seu telefone.
      </Typography>
      
      <div style={styles.digitInputs}>
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength={1}
            style={styles.digitBox}
          />
        ))}
      </div>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          p: 1.5,
          width: '100%',
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#1565c0' },
        }}
      >
        Enviar
      </Button>

      <Button
        variant="text"
        sx={{
          mt: 2,
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: "#1976d2",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => navigate("/recuperar-senha")}
      >
        Retornar
      </Button>

    </Box>
  );
}

export default ValidarCodigo;
