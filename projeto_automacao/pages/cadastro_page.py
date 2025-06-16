from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class CadastroPage(BasePage):
    """Page Object para a página de Cadastro."""

    URL = "http://localhost:5173/cadastro"

    # Localizadores
    CAMPO_NOME = (By.ID, "campo_nome")
    CAMPO_SOBRENOME = (By.ID, "campo_sobrenome")
    BOTAO_AVANCAR = (By.ID, "botao_avancar")
    CAMPO_EMAIL = (By.ID, "campo_email")
    CAMPO_EMAIL_CONFIRM = (By.ID, "campo_email_confirm")
    CAMPO_TELEFONE = (By.ID, "campo_telefone")
    CAMPO_TELEFONE_CONFIRM = (By.ID, "campo_telefone_confirm")
    CAMPO_DATA_NASCIMENTO = (By.ID, "campo_data_nascimento")
    CAMPO_GENERO = (By.ID, "campo_genero")
    OPCAO_FEMININO = "//li[text()='Feminino']"
    OPCAO_MASCULINO = "//li[text()='Masculino']"
    CAMPO_CPF = (By.ID, "campo_cpf")
    CAMPO_SENHA = (By.ID, "campo_senha")
    CAMPO_SENHA_CONFIRM = (By.ID, "campo_senha_confirm")
    ALERTA_SUCESSO = (By.CLASS_NAME, "swal2-popup")
    TITULO_ALERTA_SUCESSO = (By.CLASS_NAME, "swal2-title")
    CORPO_ALERTA_SUCESSO = (By.CLASS_NAME, "swal2-html-container")
    MENSAGEM_ERRO_SENHA = (By.XPATH, "//p[contains(text(), \"A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.\")]")
    MENSAGEM_ERRO_TELEFONE = (By.XPATH, "//p[contains(text(), \"O telefone deve ter o formato (XX) XXXXX-XXXX\")]")
    MENSAGEM_ERRO_CPF = (By.XPATH, "//p[contains(text(), \"CPF inválido.\")]")
    MENSAGEM_ERRO_EMAIL = (By.XPATH, "//p[contains(text(), \"O campo de email é obrigatório e deve conter um '@'.\")]")
    MENSAGEM_ERRO_EMAIL_NAO_COINCIDEM = (By.XPATH, "//p[contains(text(), \"Os e-mails não coincidem. Por favor, verifique.\")]")
    MENSAGEM_ERRO_SENHA_NAO_COINCIDEM = (By.XPATH, "//p[contains(text(), \"As senhas não coincidem. Por favor, verifique.\")]")

    def __init__(self, driver):
        super().__init__(driver, self.URL)

    def preencher_dados_pessoais(self, nome, sobrenome):
        """Preenche os campos de nome e sobrenome e avança."""
        self.send_keys_to_element(self.CAMPO_NOME, nome)
        self.send_keys_to_element(self.CAMPO_SOBRENOME, sobrenome)
        self.click_element(self.BOTAO_AVANCAR)

    def preencher_emails(self, email, email_confirm):
        """Preenche os campos de e-mail e e-mail de confirmação e avança."""
        self.send_keys_to_element(self.CAMPO_EMAIL, email)
        self.send_keys_to_element(self.CAMPO_EMAIL_CONFIRM, email_confirm)
        self.click_element(self.BOTAO_AVANCAR)

    def preencher_telefones(self, telefone, telefone_confirm):
        """Preenche os campos de telefone e telefone de confirmação e avança."""
        self.send_keys_to_element(self.CAMPO_TELEFONE, telefone)
        self.send_keys_to_element(self.CAMPO_TELEFONE_CONFIRM, telefone_confirm)
        self.click_element(self.BOTAO_AVANCAR)

    def preencher_dados_adicionais(self, data_nascimento, genero, cpf):
        """Preenche data de nascimento, gênero e CPF e avança."""
        self.send_keys_to_element(self.CAMPO_DATA_NASCIMENTO, data_nascimento)
        if genero == "Feminino":
            self.select_dropdown_option_by_xpath(self.CAMPO_GENERO, self.OPCAO_FEMININO)
        elif genero == "Masculino":
            self.select_dropdown_option_by_xpath(self.CAMPO_GENERO, self.OPCAO_MASCULINO)
        self.send_keys_to_element(self.CAMPO_CPF, cpf)
        self.click_element(self.BOTAO_AVANCAR)

    def preencher_senhas(self, senha, senha_confirm):
        """Preenche os campos de senha e senha de confirmação e avança."""
        self.send_keys_to_element(self.CAMPO_SENHA, senha)
        self.send_keys_to_element(self.CAMPO_SENHA_CONFIRM, senha_confirm)
        self.click_element(self.BOTAO_AVANCAR)

    def obter_titulo_alerta_sucesso(self):
        """Obtém o título do alerta de sucesso de cadastro."""
        self.wait_for_visibility(self.ALERTA_SUCESSO)
        return self.get_text_of_element(self.TITULO_ALERTA_SUCESSO)

    def obter_corpo_alerta_sucesso(self):
        """Obtém o corpo do alerta de sucesso de cadastro."""
        self.wait_for_visibility(self.ALERTA_SUCESSO)
        return self.get_text_of_element(self.CORPO_ALERTA_SUCESSO)

    def obter_mensagem_erro(self, error_locator):
        """Obtém o texto de uma mensagem de erro genérica."""
        self.wait_for_presence(error_locator)
        return self.get_text_of_element(error_locator)

    def is_campo_data_nascimento_displayed(self):
        """Verifica se o campo de data de nascimento (etapa 4) está visível."""
        campo = self.wait_for_presence(self.CAMPO_DATA_NASCIMENTO)
        return campo.is_displayed()

    def is_campo_senha_displayed(self):
        """Verifica se o campo de senha (etapa final) está visível."""
        campo = self.wait_for_presence(self.CAMPO_SENHA)
        return campo.is_displayed()

    def is_campo_telefone_displayed(self):
        """Verifica se o campo de telefone (etapa 3) está visível."""
        campo = self.wait_for_presence(self.CAMPO_TELEFONE)
        return campo.is_displayed()