import pytest
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
    driver.quit()


#3. Validação do Email
# Testes para o campo de email valido
def test_email_is_valid(driver):
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()

    driver.find_element(By.ID, "campo_email").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("teste@exemplo.com")
    driver.find_element(By.ID, "botao_avancar").click()

    # Aguarda até o campo da etapa três aparecer (exemplo: campo_senha)
    campo_etapa_tres = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "campo_telefone"))
    )
    assert campo_etapa_tres.is_displayed()

# Testes para o campo de email invalido
def test_email_is_invalid(driver):
    driver.find_element(By.ID, "campo_nome").send_keys("nomeTeste")
    driver.find_element(By.ID, "campo_sobrenome").send_keys("sobrenomeTeste")
    driver.find_element(By.ID, "botao_avancar").click()

    driver.find_element(By.ID, "campo_email").send_keys("testeinvalido")
    driver.find_element(By.ID, "campo_email_confirm").send_keys("testeinvalido")
    driver.find_element(By.ID, "botao_avancar").click()

    WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//p[contains(text(), \"O campo de email é obrigatório e deve conter um '@'.\")]"))
)
    helper_text = driver.find_element(By.XPATH, "//p[contains(text(), \"O campo de email é obrigatório e deve conter um '@'.\")]").text
    assert helper_text == "O campo de email é obrigatório e deve conter um '@'."