class MassaDadosCadastro:
    """Massa de dados para os testes da página de cadastro."""

    # Dados de usuário válido para cadastro completo
    USUARIO_VALIDO = {
        "nome": "NomeTeste",
        "sobrenome": "SobrenomeTeste",
        "email": "teste@teste.com.br",
        "email_confirm": "teste@teste.com.br",
        "telefone": "(75) 55544-4444",
        "telefone_confirm": "(75) 55544-4444",
        "data_nascimento": "21/01/2000",
        "genero": "Feminino",
        "cpf": "210.830.180-19",
        "senha": "Senha1234@",
        "senha_confirm": "Senha1234@"
    }

    # Dados para testes de senha
    SENHA_INVALIDA_CURTA = "1234567"
    SENHA_VALIDA = "Senha1234@"
    SENHA_CONFIRM_DIFERENTE = "Senha12399@"

    # Dados para testes de telefone
    TELEFONE_VALIDO = "(11) 91234-5678"
    TELEFONE_INVALIDO = "(11) 1234-5678" # Formato inválido

    # Dados para testes de CPF
    CPF_VALIDO = "123.456.789-09"
    CPF_INVALIDO = "123.456.789-00" # CPF inválido, último dígito

    # Dados para testes de Email
    EMAIL_VALIDO = "teste@exemplo.com"
    EMAIL_INVALIDO_FORMATO = "testeinvalido"
    EMAIL_CONFIRM_DIFERENTE = "testenaocoincidem@exemplo.com"