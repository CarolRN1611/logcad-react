import pytest
from utils.driver_manager import DriverManager

@pytest.fixture
def driver():
    """
    Fixture do Pytest para inicializar e finalizar o WebDriver.
    Abre a URL de cadastro antes de cada teste e fecha o driver no final.
    """
    driver = DriverManager.get_chrome_driver()
    yield driver
    DriverManager.quit_driver(driver)