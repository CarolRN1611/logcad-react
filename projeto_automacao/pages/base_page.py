from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class BasePage:
    """Classe base para Page Objects, contendo métodos comuns."""

    def __init__(self, driver, url):
        self.driver = driver
        self.url = url
        self.wait = WebDriverWait(driver, 10) # Tempo de espera padrão

    def open(self):
        """Abre a URL da página."""
        self.driver.get(self.url)

    def find_element(self, by_locator):
        """Encontra um elemento usando um localizador."""
        return self.wait.until(EC.presence_of_element_located(by_locator))

    def click_element(self, by_locator):
        """Clica em um elemento após ele ser clicável."""
        self.wait.until(EC.element_to_be_clickable(by_locator)).click()

    def send_keys_to_element(self, by_locator, text):
        """Envia texto para um elemento."""
        self.find_element(by_locator).send_keys(text)

    def get_text_of_element(self, by_locator):
        """Obtém o texto de um elemento."""
        return self.find_element(by_locator).text

    def wait_for_visibility(self, by_locator):
        """Espera até que um elemento esteja visível."""
        return self.wait.until(EC.visibility_of_element_located(by_locator))

    def wait_for_presence(self, by_locator):
        """Espera até que um elemento esteja presente no DOM."""
        return self.wait.until(EC.presence_of_element_located(by_locator))

    def select_dropdown_option_by_xpath(self, select_locator, option_xpath):
        """
        Clica em um dropdown e seleciona uma opção por XPath.
        Args:
            select_locator (tuple): Localizador do elemento do dropdown.
            option_xpath (str): XPath da opção a ser selecionada.
        """
        self.click_element(select_locator)
        self.click_element((By.XPATH, option_xpath))