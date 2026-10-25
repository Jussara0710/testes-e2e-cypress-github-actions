import signupPage from '../pages/signupPage'

describe('Testes de Registo (Caso 1 e Caso 5)', () => {
  
  // Caso 1: Registo completo de utilizador e exclusão de conta
  it('Deve registar um novo utilizador com sucesso e apagar a conta no final', () => {
    // Gerar um e-mail dinâmico para garantir que nunca se repete entre execuções
    const timestamp = Date.now()
    const emailDinamico = `teste_pgats_${timestamp}@test.com`

    signupPage.visitPage()
    
    // Iniciar registo
    signupPage.startSignup('Utilizador PGATS', emailDinamico)
    
    // Preencher detalhes da conta
    signupPage.fillAccountDetails('SenhaForte123!', '10', 'January', '1995')
    
    // Preencher morada e dados de contacto
    signupPage.fillAddressDetails(
      'Jussara', 
      'Sousa', 
      'Empresa Teste', 
      'Rua dos Testes, 123', 
      'United States', 
      'California', 
      'Los Angeles', 
      '90001', 
      '31999999999'
    )
    
    // Validar se a conta foi criada com sucesso
    signupPage.elements.accountCreatedHeader().should('be.visible')
    signupPage.elements.continueButton().click()
    
    // Validar sessão iniciada
    signupPage.elements.loggedInAs().should('be.visible')
    
    // Apagar a conta conforme requisitado no final do Caso 1
    signupPage.deleteAccount()
    signupPage.elements.accountDeletedHeader().should('be.visible')
  })

  // Caso 5: Deve exibir erro ao tentar registar com um e-mail já existente
  // Caso 5: Deve exibir erro ao tentar registar com um e-mail já existente
  it('Caso 5: Deve exibir erro ao tentar registar com um e-mail já existente', () => {
    const emailExistente = `duplicado_${Date.now()}@test.com`

    signupPage.visitPage()
    
    // 1º Passo: Registamos e criamos a conta completa para o e-mail existir no sistema
    signupPage.startSignup('Utilizador Existente', emailExistente)
    signupPage.fillAccountDetails('Senha123!', '10', 'January', '1995')
    signupPage.fillAddressDetails(
      'Jussara', 
      'Sousa', 
      'Empresa Teste', 
      'Rua dos Testes, 123', 
      'United States', 
      'California', 
      'Los Angeles', 
      '90001', 
      '31999999999'
    )
    signupPage.elements.accountCreatedHeader().should('be.visible')

    // 2º Passo: Voltamos à página de registo e tentamos usar exatamente o mesmo e-mail
    signupPage.visitPage()
    signupPage.startSignup('Utilizador Existente', emailExistente)
    
    // 3º Passo: Validamos que a mensagem de erro de e-mail existente é exibida
    signupPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  })

})