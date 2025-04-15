

# Função para preencher um campo de texto
def fill_form(driver, field_id, value):
    email_field = driver.find_element(By.ID, email )
    field.send_keys(value)
    print(f"Preenchido o campo {email_field} com o valor {value}")
