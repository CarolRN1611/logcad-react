import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class DriverManager:
    """Gerencia a inicialização e o fechamento do WebDriver."""

    @staticmethod
    def get_chrome_driver():
        """
        Inicializa e retorna uma instância do ChromeDriver.
        """
        service = Service(ChromeDriverManager().install())
        options = webdriver.ChromeOptions()
        # Garante que o navegador não feche automaticamente após o teste
        options.add_experimental_option("detach", False)
        driver = webdriver.Chrome(service=service, options=options)
        return driver

    @staticmethod
    def quit_driver(driver):
        """
        Fecha o WebDriver.
        """
        if driver:
            time.sleep(3) # Tempo para visualização do resultado do teste
            driver.quit()