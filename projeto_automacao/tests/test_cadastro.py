import pytest
from pages.cadastro_page import CadastroPage
from data.massa_dados_cadastro import MassaDadosCadastro

class TestCadastroUsuario:
    """Classe de testes para a funcionalidade de cadastro de usuário."""

    def test_senha_is_valid(self, driver):
        """
        Testa o cadastro de usuário com uma senha válida e verifica o sucesso.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], data["cpf"])
        cadastro_page.preencher_senhas(data["senha"], data["senha_confirm"])

        assert cadastro_page.obter_titulo_alerta_sucesso() == "Cadastrado com sucesso!"
        assert "Usuário registrado." in cadastro_page.obter_corpo_alerta_sucesso()

    def test_senha_is_invalid(self, driver):
        """
        Testa a validação de senha com menos caracteres que o mínimo.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], data["cpf"])
        cadastro_page.preencher_senhas(MassaDadosCadastro.SENHA_INVALIDA_CURTA, MassaDadosCadastro.SENHA_INVALIDA_CURTA)

        expected_error = "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais."
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_SENHA) == expected_error

    def test_telefone_is_valid(self, driver):
        """
        Testa a validação de um telefone válido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(MassaDadosCadastro.TELEFONE_VALIDO, MassaDadosCadastro.TELEFONE_VALIDO)

        assert cadastro_page.is_campo_data_nascimento_displayed()

    def test_telefone_is_invalid(self, driver):
        """
        Testa a validação de um telefone inválido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(MassaDadosCadastro.TELEFONE_INVALIDO, MassaDadosCadastro.TELEFONE_INVALIDO)

        expected_error = "O telefone deve ter o formato (XX) XXXXX-XXXX"
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_TELEFONE) == expected_error

    def test_cpf_is_valid(self, driver):
        """
        Testa a validação de um CPF válido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], MassaDadosCadastro.CPF_VALIDO)

        assert cadastro_page.is_campo_senha_displayed()

    def test_cpf_is_invalid(self, driver):
        """
        Testa a validação de um CPF inválido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], MassaDadosCadastro.CPF_INVALIDO)

        expected_error = "CPF inválido."
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_CPF) == expected_error

    def test_email_is_valid(self, driver):
        """
        Testa a validação de um e-mail válido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(MassaDadosCadastro.EMAIL_VALIDO, MassaDadosCadastro.EMAIL_VALIDO)

        assert cadastro_page.is_campo_telefone_displayed()

    def test_email_is_invalid(self, driver):
        """
        Testa a validação de um e-mail com formato inválido.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(MassaDadosCadastro.EMAIL_INVALIDO_FORMATO, MassaDadosCadastro.EMAIL_INVALIDO_FORMATO)

        expected_error = "O campo de email é obrigatório e deve conter um '@'."
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_EMAIL) == expected_error

    def test_email_double_check_is_valid(self, driver):
        """
        Testa se os campos de e-mail e confirmação de e-mail coincidem.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(MassaDadosCadastro.EMAIL_VALIDO, MassaDadosCadastro.EMAIL_VALIDO)

        assert cadastro_page.is_campo_telefone_displayed()

    def test_email_double_check_is_invalid(self, driver):
        """
        Testa quando os campos de e-mail e confirmação de e-mail não coincidem.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(MassaDadosCadastro.EMAIL_VALIDO, MassaDadosCadastro.EMAIL_CONFIRM_DIFERENTE)

        expected_error = "Os e-mails não coincidem. Por favor, verifique."
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_EMAIL_NAO_COINCIDEM) == expected_error

    def test_senha_double_check_valid(self, driver):
        """
        Testa se os campos de senha e confirmação de senha coincidem.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], data["cpf"])
        cadastro_page.preencher_senhas(MassaDadosCadastro.SENHA_VALIDA, MassaDadosCadastro.SENHA_VALIDA)

        assert cadastro_page.obter_titulo_alerta_sucesso() == "Cadastrado com sucesso!"
        assert "Usuário registrado." in cadastro_page.obter_corpo_alerta_sucesso()

    def test_senha_double_check_invalid(self, driver):
        """
        Testa quando os campos de senha e confirmação de senha não coincidem.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], data["cpf"])
        cadastro_page.preencher_senhas(MassaDadosCadastro.SENHA_VALIDA, MassaDadosCadastro.SENHA_CONFIRM_DIFERENTE)

        expected_error = "As senhas não coincidem. Por favor, verifique."
        assert cadastro_page.obter_mensagem_erro(cadastro_page.MENSAGEM_ERRO_SENHA_NAO_COINCIDEM) == expected_error

    def test_usuario_valid(self, driver):
        """
        Testa o cadastro completo de um usuário com todos os dados válidos.
        """
        cadastro_page = CadastroPage(driver)
        cadastro_page.open()

        data = MassaDadosCadastro.USUARIO_VALIDO

        cadastro_page.preencher_dados_pessoais(data["nome"], data["sobrenome"])
        cadastro_page.preencher_emails(data["email"], data["email_confirm"])
        cadastro_page.preencher_telefones(data["telefone"], data["telefone_confirm"])
        cadastro_page.preencher_dados_adicionais(data["data_nascimento"], data["genero"], data["cpf"])
        cadastro_page.preencher_senhas(data["senha"], data["senha_confirm"])

        assert cadastro_page.obter_titulo_alerta_sucesso() == "Cadastrado com sucesso!"
        assert "Usuário registrado." in cadastro_page.obter_corpo_alerta_sucesso()