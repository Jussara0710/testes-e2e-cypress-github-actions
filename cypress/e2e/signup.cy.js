import signupPage from '../pages/signupPage'

describe('Caso 1: Registo completo de utilizador e exclusão de conta', () => {
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
})