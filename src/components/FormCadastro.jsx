import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  // Estados para mensagens de erro
  const [emailErro, setEmailErro] = useState('');
  const [telefoneErro, setTelefoneErro] = useState('');
  const [cpfErro, setCpfErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const [dataNascimentoErro, setDataNascimentoErro] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);  // Estado para controlar se o formulário é válido ou não

  const [showPassword, setShowPassword] = useState(false); // Controle de visibilidade da senha
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // Controle de visibilidade da confirmação de senha

  const navigate = useNavigate();

  // Função para validar o telefone em tempo real (11 dígitos no formato (11) 11111-1111)
  const validarTelefone = (value) => {
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;  // Expressão regular para o formato (XX) XXXXX-XXXX
    if (!telefoneRegex.test(value)) {
      setTelefoneErro('O telefone deve ter o formato (XX) XXXXX-XXXX');
      setIsFormValid(false);
    } else {
      setTelefoneErro('');
      setIsFormValid(true);
    }
  };

  // Função para verificar se o telefone e a confirmação de telefone são iguais
  const verificarTelefoneConfirmacao = () => {
    if (telefone !== telefoneConfirm) {
      setTelefoneErro('Os telefones não coincidem. Por favor, verifique.');
      setIsFormValid(false);
    } else {
      setTelefoneErro('');
      setIsFormValid(true);
    }
  };

  // Função para validar a senha em tempo real
  const validarSenha = () => {
    if (password !== passwordConfirm) {
      setSenhaErro('As senhas não coincidem. Por favor, verifique.');
      setIsFormValid(false);
    } else {
      setSenhaErro('');
      setIsFormValid(true);
    }
  };

  // Função para formatar o CPF no formato XXX.XXX.XXX-XX
  const formatarCpf = (value) => {
    // Remove qualquer caractere não numérico
    const cpfLimpo = value.replace(/\D/g, '');
    
    // Aplica a formatação: XXX.XXX.XXX-XX
    if (cpfLimpo.length <= 11) {
      const formattedCpf = cpfLimpo
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      setCpf(formattedCpf);
    }
  };

  // Função para verificar se o CPF tem exatamente 11 dígitos
  const validarCpf = (value) => {
    const cpfLimpo = value.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setCpfErro('O CPF deve ter 11 dígitos.');
      setIsFormValid(false);
    } else {
      setCpfErro('');
      setIsFormValid(true);
    }
  };

  // Função para validar a data de nascimento (minimo 18 anos)
  const validarDataNascimento = (value) => {
    const dataNascimentoFormatada = new Date(value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimentoFormatada.getFullYear();
    const mes = hoje.getMonth() - dataNascimentoFormatada.getMonth();

    if (idade < 18 || (idade === 18 && mes < 0)) {
      setDataNascimentoErro('Você precisa ter pelo menos 18 anos para se cadastrar.');
      setIsFormValid(false);
    } else {
      setDataNascimentoErro('');
      setIsFormValid(true);
    }
  };

  // Verificar se os campos obrigatórios da etapa estão preenchidos
  const verificarCamposPreenchidos = () => {
    if (etapasDoCadastro === 1) {
      return nome && sobrenome;
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
    // Validação do e-mail
    if (etapasDoCadastro === 2 && (email === '' || !email.includes('@') || email !== emailConfirm)) {
      setEmailErro('Por favor, verifique os e-mails.');
      return;
    }

    // Validação do telefone
    if (etapasDoCadastro === 3) {
      if (telefone === '' || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
        setTelefoneErro('O telefone deve ter o formato (XX) XXXXX-XXXX');
        return;
      }

      if (telefoneConfirm === '' || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefoneConfirm)) {
        setTelefoneErro('O telefone de confirmação deve ter o formato (XX) XXXXX-XXXX');
        return;
      }

      // Verificar se telefone e confirmar telefone são iguais
      if (telefone !== telefoneConfirm) {
        setTelefoneErro('Os telefones não coincidem. Por favor, verifique.');
        return;
      }
    }

    // Validação de CPF
    if (etapasDoCadastro === 4 && cpf.replace(/\D/g, '').length !== 11) {
      setCpfErro('O CPF deve ter 11 dígitos.');
      return;
    }

    // Validação de data de nascimento (mínimo 18 anos)
    if (etapasDoCadastro === 4 && !dataNascimento) {
      setDataNascimentoErro('A data de nascimento é obrigatória.');
      return;
    }

    // Validação de senha
    if (etapasDoCadastro === 5 && password !== passwordConfirm) {
      setSenhaErro('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    // Limpa mensagens de erro
    setEmailErro('');  // Limpa erro de e-mail
    setTelefoneErro('');  // Limpa erro de telefone
    setCpfErro('');  // Limpa erro de CPF
    setSenhaErro('');  // Limpa erro de senha
    setDataNascimentoErro('');  // Limpa erro de data de nascimento

    if (etapasDoCadastro < 5) {
      setEtapasDoCadastro(etapasDoCadastro + 1);
    } else {
      Swal.fire("Cadastrado com sucesso!", "Usuário registrado.", "success")
        .then(() => navigate("/"));
    }
  };

  const voltarEtapa = () => {
    if (etapasDoCadastro > 1) {
      setEtapasDoCadastro(etapasDoCadastro - 1);
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

      {etapasDoCadastro === 1 && (
        <>
          <TextField sx={{ m: 1, width: '100%' }} required label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <TextField sx={{ m: 1, width: '100%' }} required label="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </>
      )}

      {etapasDoCadastro === 2 && (
        <>
          <TextField sx={{ m: 1, width: '100%' }} required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField sx={{ m: 1, width: '100%' }} required label="Confirme o Email" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} />
          {emailErro && <Typography color="error" sx={{ mt: 1 }}>{emailErro}</Typography>}
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
              const formattedTelefone = value.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
              if (formattedTelefone.replace(/\D/g, '').length <= 11) {
                setTelefone(formattedTelefone);
                validarTelefone(formattedTelefone);
              }
            }}
          />
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Confirme o Telefone"
            value={telefoneConfirm}
            onChange={(e) => {
              const value = e.target.value;
              const formattedTelefoneConfirm = value.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
              if (formattedTelefoneConfirm.replace(/\D/g, '').length <= 11) {
                setTelefoneConfirm(formattedTelefoneConfirm);
                verificarTelefoneConfirmacao();
              }
            }}
          />
          {telefoneErro && <Typography color="error" sx={{ mt: 1 }}>{telefoneErro}</Typography>}
        </>
      )}

      {etapasDoCadastro === 4 && (
        <>
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => {
              const value = e.target.value;
              setDataNascimento(value);
              validarDataNascimento(value);
            }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          {dataNascimentoErro && <Typography color="error" sx={{ mt: 1 }}>{dataNascimentoErro}</Typography>}
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
              const value = e.target.value;
              formatarCpf(value);
              validarCpf(value);
            }}
          />
          {cpfErro && <Typography color="error" sx={{ mt: 1 }}>{cpfErro}</Typography>}
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
              validarSenha();
            }}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{ position: 'absolute', right: '10px', top: '72%' }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <TextField
            sx={{ m: 1, width: '100%' }}
            required
            label="Confirme a Senha"
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              validarSenha();
            }}
          />
          <IconButton
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            sx={{ position: 'absolute', right: '10px', top: '85%' }}
          >
            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          {senhaErro && <Typography color="error" sx={{ mt: 1 }}>{senhaErro}</Typography>}
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
