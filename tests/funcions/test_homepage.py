from selenium import webdriver
from selenium.webdriver.chrome.service import Service

CHROMEDRIVER_PATH = "./drivers/chromedriver.exe"

def test_open_homepage():
    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service)

    try:
        driver.get("http://localhost:5173")
        # Não chamamos driver.quit(), então o navegador ficará aberto até que você feche manualmente.
        input("Pressione Enter para encerrar o script após fechar o navegador...")  # O script ficará aguardando até você pressionar Enter
    finally:
        # Aqui, não chamamos o driver.quit() automaticamente, o que deixa o navegador aberto
        pass

test_open_homepage()
