import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LinearProgress } from "@mui/material";
import { Stepper, Step, StepLabel } from '@mui/material';
import { Padding } from '@mui/icons-material';

function FormCadastro() {
  const [etapasDoCadastro, setEtapasDoCadastro] = useState(1);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneConfirm, setTelefoneConfirm] = useState('');
  const etapas = ['Nome', 'Email', 'Telefone', 'CPF','Senha'];

  const [helperText, setHelperText] = useState("");  // Para usar com helperText
  const [helperTextConfirm, setHelperTextConfirm] = useState("");  // Para usar com helperText
  // Estados para mensagens de erro
  const [emailErro, setEmailErro] = useState(false);
  const [emailConfirmErro, setEmailConfirmErro] = useState(false);
  const [telefoneErro, setTelefoneErro] = useState(false);
  const [telefoneConfirmErro, setTelefoneConfirmErro] = useState(false);
  const [cpfErro, setCpfErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const [senhaConfirmErro, setSenhaConfirmErro] = useState(false);
  const [dataNascimentoErro, setDataNascimentoErro] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);  // Estado para controlar se o formulário é válido ou não

  const [showPassword, setShowPassword] = useState(false); // Controle de visibilidade da senha
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // Controle de visibilidade da confirmação de senha
  const [strength, setStrength] = useState(0);
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const navigate = useNavigate();

  // Função para validar o telefone em tempo real (11 dígitos no formato (11) 11111-1111)
  const validarTelefone = (value) => {
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;  
    if (!telefoneRegex.test(value)) {
      setTelefoneErro(true);
      setHelperText("O telefone deve ter o formato (XX) XXXXX-XXXX");
      setIsFormValid(false);
      return
    } else {
      setTelefoneErro(false);
      setTelefoneConfirmErro(false);
      setHelperText("");
      setHelperTextConfirm("");
      setIsFormValid(true);
      return
    }
  };

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;

    if (/\d/.test(password)) strength += 25;

    if (/[A-Z]/.test(password)) strength += 25;

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

    return strength;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    const strength = calculateStrength(password);
    setStrength(strength);
    console.log("Força da senha:", strength);
  };

  
  const getProgressColor = () => {
    if (strength < 50) return "error"; 
    if (strength < 75) return "warning"; 
    return "success"; 
  };

  // Função para validar a senha em tempo real
  const validarSenha = () => {

    if(!password) {
      setSenhaErro(true);
      setHelperText("A senha é obrigatória.");
      setIsFormValid(false);
    }
    if(password.length < 8) {
      setSenhaErro(true);
      setHelperText("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.");
      setIsFormValid(false);

    }
    else if(strength < 75) {
      setSenhaErro(true);
      setHelperText("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.");
      setIsFormValid(false);

    }
    else if (passwordConfirm !== "" && password !== passwordConfirm){ 
      setSenhaErro(true);
      setSenhaConfirmErro(true);
      setHelperText("As senhas não coincidem. Por favor, verifique.");
      setHelperTextConfirm("As senhas não coincidem. Por favor, verifique.");
      setIsFormValid(false);
    }
     else {
      setSenhaErro('');
      setHelperText('');
      setSenhaConfirmErro('');
      setHelperTextConfirm('');
      setIsFormValid(true);
    }
  };

  // Função para formatar o CPF no formato XXX.XXX.XXX-XX
  const formatarCpf = (value) => {
    const cpfLimpo = value.replace(/\D/g, '');

    
    if (cpfLimpo.length <= 11) {
      const formattedCpf = cpfLimpo
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})$/, "$1.$2.$3-$4");
      return formattedCpf;
    }
    return cpf; // fallback
    
  };

  // Função para verificar se o CPF tem exatamente 11 dígitos
  const validarCpf = (cpf) => {
    const cpfNumerico = cpf.replace(/\D/g, ""); // Remove não números
    if (cpfNumerico.length !== 11) {
      setCpfErro(true);
      setHelperTextConfirm("O CPF deve ter 11 dígitos.");
      setIsFormValid(false);
    } else {
      setCpfErro(false);
      setHelperTextConfirm("");
    }
  };

  // Função para validar a data de nascimento (minimo 18 anos)
  const validarDataNascimento = (value) => {
    const dataNascimentoFormatada = new Date(value);
    const hoje = new Date();
  
    const ano = hoje.getFullYear() - dataNascimentoFormatada.getFullYear();
    const mes = hoje.getMonth() - dataNascimentoFormatada.getMonth();
    const dia = hoje.getDate() - dataNascimentoFormatada.getDate();
  
    let idade = ano;
    if (mes < 0 || (mes === 0 && dia < 0)) {
      idade--;
    }
  
    if (idade < 18) {
      setDataNascimentoErro(true);
      setHelperText("Você deve ter pelo menos 18 anos.");
      setIsFormValid(false);
    } else {
      setDataNascimentoErro(false);
      setHelperText('');
      setIsFormValid(true);
    }
  };
  

  // Verificar se os campos obrigatórios da etapa estão preenchidos
  const verificarCamposPreenchidos = () => {
    if (etapasDoCadastro === 1) {
      return nome;
    }
    if (etapasDoCadastro === 2) {
      return email && emailConfirm;
    }
    if (etapasDoCadastro === 3) {
      return telefone && telefoneConfirm;
    }
    if (etapasDoCadastro === 4) {
      return dataNascimento && genero && cpf;
    }
    if (etapasDoCadastro === 5) {
      return password && passwordConfirm;
    }
    return false;
  };

  const avancarEtapa = () => {

    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
    let hasError = false;

    if (etapasDoCadastro === 2) {
      if (email === "" || !email.includes("@")) {
        setEmailConfirmErro(true);
        setEmailErro(true);
        setHelperText("O campo de email é obrigatório e deve conter um '@'.");
        hasError = true;
      } else if (email !== emailConfirm) {
        setEmailErro(true);
        setEmailConfirmErro(true);
        setHelperText("Os e-mails não coincidem. Por favor, verifique.");
        hasError = true;
      } else if (usuarioExistente !== undefined) {
        setEmailErro(true);
        setEmailConfirmErro(true);
        setHelperText("Esse e-mail já está cadastrado.");
        hasError = true;
      }
    }


    // Validação do telefone
    if (etapasDoCadastro === 3) {
      let hasError = false;

      if (telefone === '' || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
        setTelefoneErro(true);
        setHelperText("O telefone deve ter o formato (XX) XXXXX-XXXX");
        hasError = true;
      }

      if (telefoneConfirm === '' || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefoneConfirm)) {
        setTelefoneConfirmErro(true);
        setHelperTextConfirm("O telefone deve ter o formato (XX) XXXXX-XXXX");
        hasError = true;
      }

      // Verificar se telefone e confirmar telefone são iguais
      if (telefone !== telefoneConfirm) {
        setTelefoneErro(true);
        setTelefoneConfirmErro(true);
        setHelperText("Os telefones não coincidem. Por favor, verifique.");
        setHelperTextConfirm("Os telefones não coincidem. Por favor, verifique.");
        hasError = true;
      }
      if (hasError) return;
    }

    // Validação de CPF
    if (etapasDoCadastro === 4) {

      const cpfNumeros = cpf.replace(/\D/g, '');
      
      if (cpfNumeros.length !== 11) {
        setCpfErro(true);
        setHelperTextConfirm("O CPF deve conter exatamente 11 dígitos.");
        setIsFormValid(false);
        hasError = true;
      }
    }
    

    // Validação de data de nascimento (mínimo 18 anos)
    if (etapasDoCadastro === 4 && !dataNascimento) {
      if (validarDataNascimento(dataNascimento)) {
      setDataNascimentoErro(true);
      setHelperText("A data de nascimento é obrigatória.");
      hasError = true;
      }
    }

    // Validação de senha
    if (etapasDoCadastro === 5 && password !== passwordConfirm) {
      setSenhaErro(true);
      setSenhaConfirmErro(true);
      setHelperText("As senhas não coincidem. Por favor, verifique.1");
      setHelperTextConfirm("As senhas não coincidem. Por favor, verifique.");
      hasError = true;
    }
    

    if (hasError) return;

    // Limpa mensagens de erro
    setEmailErro(""); // Limpa erro de e-mail
    setTelefoneErro(""); // Limpa erro de telefone
    setCpfErro(""); // Limpa erro de CPF
    setSenhaErro(""); // Limpa erro de senha
    setDataNascimentoErro(""); // Limpa erro de data de nascimento
    setHelperText(""); // Limpa helperText de e-mail


    const formData = {
      id: usuarios.length + 1,
      nome,
      sobrenome,
      email,
      password,
      dataNascimento,
      genero,
      cpf,
      telefone,
    };

    if (etapasDoCadastro < 5) {
      setEtapasDoCadastro(etapasDoCadastro + 1);
    } else {
      usuarios.push(formData);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log(
        "Usuarios no localStorage:",
        localStorage.getItem("usuarios")
      );
      Swal.fire(
        "Cadastrado com sucesso!",
        "Usuário registrado.",
        "success"
      ).then(() => navigate("/"));
    }
  };

  const voltarEtapa = () => {
    if (etapasDoCadastro > 1) {
      setEtapasDoCadastro(etapasDoCadastro - 1);
      setHelperText("");
      setHelperTextConfirm("");
    } else {
      navigate("/"); // 🔹 Redireciona para a página inicial se estiver na primeira etapa
    }
  };

  // Habilitar ou desabilitar o botão "Avançar" com base na verificação de campos preenchidos
  useEffect(() => {
    setIsFormValid(verificarCamposPreenchidos());
  }, [etapasDoCadastro, nome, sobrenome, email, emailConfirm, telefone, telefoneConfirm, dataNascimento, genero, cpf, password, passwordConfirm]);

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, width: '90%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 4, boxShadow: 3, margin: '10vh auto' }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Cadastre-se</Typography>

      <Stepper
      sx={{
        padding: 1,
        "& .MuiStepLabel-label": {
          fontSize: "0.8rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        },
        "& .MuiStepIcon-root": {
          fontSize: "1.2rem",
        },
      }} activeStep={etapasDoCadastro -1}>
        {etapas.map((etapa, index) => (
          <Step key={index}>
            <StepLabel>{etapa}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {etapasDoCadastro === 1 && (
        <>
          <TextField sx={{ m: 1, width: '100%' }} required label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <TextField sx={{ m: 1, width: '100%' }} label="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </>
      )}

      {etapasDoCadastro === 2 && (
        <>
          <TextField sx={{ m: 1, width: '100%' }} required label="Email" value={email}  onChange={(e) => {setEmail(e.target.value);
          setEmailErro(false);
          setHelperText("");
          }}
          error={emailErro}
          helperText={helperText}
           />
          <TextField sx={{ m: 1, width: '100%' }} required label="Confirme o Email" value={emailConfirm} onChange={(e) => {setEmailConfirm(e.target.value);
          setEmailConfirmErro(false);
          setHelperText("");
          }}
          error={emailConfirmErro}
          helperText={helperText} />
        </>
      )}

      {etapasDoCadastro === 3 && (
        <>
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Telefone"
            value={telefone}
            onChange={(e) => {
              const value = e.target.value;
              const formattedTelefone = value
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
              if (formattedTelefone.replace(/\D/g, "").length <= 11) {
                setTelefone(formattedTelefone);
              }
              setTelefoneErro(false);
              setHelperText("");
              }}
              onBlur={() => {validarTelefone(telefone)}}
              error={telefoneErro}
              helperText={helperText}
            inputProps={{ maxLength: 14 }}
          />
          <TextField
            sx={{ m: 1, width: "100%" }}
            required
            label="Confirme o Telefone"
            value={telefoneConfirm}
            onChange={(e) => {
              const value = e.target.value;
              const formattedTelefoneConfirm = value
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
              
              setTelefoneConfirm(formattedTelefoneConfirm);
              setTelefoneConfirmErro(false);
              setHelperTextConfirm("");
              }}
              error={telefoneConfirmErro}
              helperText={helperTextConfirm}
            inputProps={{ maxLength: 14 }}
          />
        </>
      )}

      {etapasDoCadastro === 4 && (
        <>
          <>
          <TextField
            sx={{ m: 1, width: "100%" }}
            required
            label="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            onBlur={() => validarDataNascimento(dataNascimento)}
            error={dataNascimentoErro}
            helperText={helperText}
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().split("T")[0], // impede datas futuras
              },
            }}
          />
        </>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel>Gênero</InputLabel>
            <Select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              label="Gênero"
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="CPF"
            value={cpf}
            onChange={(e) => {
            const formattedCpf = formatarCpf(e.target.value);
            setCpf(formattedCpf);
            setCpfErro(false);
            setHelperTextConfirm("");
            }}
            onBlur={() =>{ validarCpf(cpf)}}
            error={cpfErro}
            helperText={helperTextConfirm}
            inputProps={{ maxLength: 14 }}
          />
        </>
      )}

      {etapasDoCadastro === 5 && (
        <>
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handlePasswordChange(e);
              setSenhaErro(false);
              setHelperText("");
            }}
            onBlur={validarSenha}
            error={senhaErro}
            helperText={helperText}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ position: 'absolute', right: '10px', top: '20%' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Box sx={{ width: '100%' }}>
            {/* Barra de progresso para a força da senha */}
          <LinearProgress
              variant="determinate"
              value={strength}
              color={getProgressColor()}
              sx={{ mt: 1, height: 10, borderRadius: 5 }}
            />

            {/* Texto indicando a força da senha */}
            <Typography variant="caption"  sx={{ mt: 1, textAlign: 'right',fontSize: '0.9rem',
                color: strength === 100 
                  ? '#28a745'  
                  : strength >= 75 
                  ? '#ffc107'  
                  : strength >= 50 
                  ? '#fd7e14'  
                  : '#dc3545'}}
            >
              {strength === 100
                ? "Senha forte"
                : strength >= 75
                ? "Senha boa"
                : strength >= 50
                ? "Senha média"
                : "Senha fraca"}
            </Typography>
          </Box>
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Confirme a Senha"
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setSenhaConfirmErro(false);
              setHelperTextConfirm("");
            }}
            onBlur={validarSenha}
            error={senhaConfirmErro}
            helperText={helperTextConfirm}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  sx={{ position: 'absolute', right: '10px', top: '20%' }}
                >
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
        <Button
          variant="contained"
          onClick={voltarEtapa}
          sx={{ backgroundColor: 'white', color: 'blue', '&:hover': { backgroundColor: '#f5f5f5' } }}  // Cor branca para o botão
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={avancarEtapa}
          disabled={!isFormValid}  // Habilita o botão apenas se o formulário for válido
        >
          {etapasDoCadastro === 5 ? 'Finalizar' : 'Avançar'}
        </Button>
      </Box>
    </Box>
  );
}

export default FormCadastro;
