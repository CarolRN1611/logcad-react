import pytest
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL = "http://localhost:5173/cadastro" 

@pytest.fixture
def driver():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", False)
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(URL)
    yield driver
    time.sleep(3)
    driver.quit()


# 0. Tamanho mínimo da senha
# Validar o tamanho mínimo da senha.
def test_senha_is_valid(driver):
    #Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-09")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_senha").send_keys("Senha1234@")
    driver.find_element(By.ID, "campo_senha_confirm").send_keys("Senha1234@")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se o alerta de sucesso é exibido
    WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup"))
    )
    alert_text = driver.find_element(By.CLASS_NAME, "swal2-title").text

    # Verifica se o texto do alerta é o de sucesso
    assert alert_text == "Cadastrado com sucesso!"
    body_text = driver.find_element(By.CLASS_NAME, "swal2-html-container").text
    assert "Usuário registrado." in body_text


# Quantidade de caracteres da senha abaixo do mínimo
def test_senha_is_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-09")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_senha").send_keys("1234567")
    driver.find_element(By.ID, "campo_senha_confirm").send_keys("1234567")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais.\")]").text

    # Verifica a mensagem de erro
    assert helper_text == "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais."


# 1. Validação do Telefone
def test_telefone_is_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()

    #verifica se muda de etapa o que confirma que o telefone é válido
    campo_etapa_quatro = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "campo_data_nascimento"))
    )
    assert campo_etapa_quatro.is_displayed()

# Validação do Telefone Inválido
def test_telefone_is_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 1234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 1234-5678")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"O telefone deve ter o formato (XX) XXXXX-XXXX\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"O telefone deve ter o formato (XX) XXXXX-XXXX\")]").text
    assert helper_text == "O telefone deve ter o formato (XX) XXXXX-XXXX"


# 2. Validação do CPF
def test_cpf_is_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-09")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se muda de etapa o que confirma que o CPF é válido
    campo_etapa_quatro = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "campo_senha"))
    )
    assert campo_etapa_quatro.is_displayed()


# Validação do CPF Inválido
def test_cpf_is_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-00")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"CPF inválido.\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"CPF inválido.\")]").text
    assert helper_text == "CPF inválido."


# 3. Validação do Email
def test_email_is_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se muda de etapa o que confirma que o email é válido
    campo_etapa_tres = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "campo_telefone"))
    )
    assert campo_etapa_tres.is_displayed()


# Validação do Email Inválido
def test_email_is_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("testeinvalido")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("testeinvalido")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"O campo de email é obrigatório e deve conter um '@'.\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"O campo de email é obrigatório e deve conter um '@'.\")]").text
    assert helper_text == "O campo de email é obrigatório e deve conter um '@'."


# 4. Double Check do Email e Senha
def test_email_double_check_is_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se muda de etapa o que confirma que os emails coincidem
    campo_etapa_tres = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "campo_telefone"))
    )
    assert campo_etapa_tres.is_displayed()


# Double Check do Email Inválido
def test_email_double_check_is_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("testenaocoincidem@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"Os e-mails não coincidem. Por favor, verifique.\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"Os e-mails não coincidem. Por favor, verifique.\")]").text
    assert helper_text == "Os e-mails não coincidem. Por favor, verifique."


# 4. Double Check da Senha
def test_senha_double_check_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-09")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_senha").send_keys("Senha1234@")
    driver.find_element(By.ID, "campo_senha_confirm").send_keys("Senha1234@")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se aparece o alerta de sucesso de cadastro
    WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup"))
    )
    alert_text = driver.find_element(By.CLASS_NAME, "swal2-title").text
    assert alert_text == "Cadastrado com sucesso!"
    body_text = driver.find_element(By.CLASS_NAME, "swal2-html-container").text
    assert "Usuário registrado." in body_text


# Double Check da Senha Inválida
def test_senha_double_check_invalid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(11) 91234-5678")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("01/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("123.456.789-09")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_senha").send_keys("Senha1234@")
    driver.find_element(By.ID, "campo_senha_confirm").send_keys("Senha12399@")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se a mensagem de erro é exibida
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"As senhas não coincidem. Por favor, verifique.\")]"))
    )
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"As senhas não coincidem. Por favor, verifique.\")]").text
    assert helper_text == "As senhas não coincidem. Por favor, verifique."


# 5. Sucesso
def test_usuario_valid(driver):
    # Massa de teste
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_email").send_keys("teste@teste.com.br")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@teste.com.br")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_telefone").send_keys("(75) 55544-4444")
    driver.find_element(By.ID, "campo_telefone_confirm").send_keys("(75) 55544-4444")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_data_nascimento").send_keys("21/01/2000")
    wait = WebDriverWait(driver, 10)
    select_input = wait.until(EC.element_to_be_clickable((By.ID, "campo_genero")))
    select_input.click()
    opcao = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[text()='Feminino']")))
    opcao.click()
    driver.find_element(By.ID, "campo_cpf").send_keys("210.830.180-19")
    driver.find_element(By.ID, "botao_avancar").click()
    driver.find_element(By.ID, "campo_senha").send_keys("Senha1234@")
    driver.find_element(By.ID, "campo_senha_confirm").send_keys("Senha1234@")
    driver.find_element(By.ID, "botao_avancar").click()

    # Verifica se aparece o alerta de sucesso de cadastro
    WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup"))
    )
    alert_text = driver.find_element(By.CLASS_NAME, "swal2-title").text
    assert alert_text == "Cadastrado com sucesso!"
    body_text = driver.find_element(By.CLASS_NAME, "swal2-html-container").text
    assert "Usuário registrado." in body_text