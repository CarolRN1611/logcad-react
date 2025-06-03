from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=service, options=options)

driver.get("https://www.python.org/")
element_search_field = driver.find_element(By.ID, "id-search-field")
element_search_field.send_keys("test")
element_button_submit_search = driver.find_element(By.ID, "submit")
element_button_submit_search.click()
