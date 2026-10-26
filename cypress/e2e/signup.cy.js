import signupPage from '../pages/signupPage'

describe('Automação de Registo - Automation Exercise', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // (Opcional) Podes colocar aqui o teu teste de registo bem-sucedido (Caso 2)
  it('Deve registar um novo utilizador com sucesso e apagar a conta no final', () => {
    const timestamp = new Date().getTime()
    const email = `utilizador_${timestamp}@test.com`

    signupPage.visitPage()
    signupPage.startSignup('Utilizador PGATS', email)
    signupPage.fillAccountDetails('SenhaForte123!')
    signupPage.fillAddressDetails({
      firstName: 'Jussara',
      lastName: 'Sousa',
      address: 'Rua dos Testes, 123',
      country: 'United States',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      zipcode: '30000',
      mobile: '31999999999'
    })

    signupPage.elements.accountCreatedHeader().should('be.visible')
    signupPage.elements.continueButton().click()
    signupPage.elements.loggedInAs().should('be.visible')
    
    signupPage.deleteAccount()
  })

  // --- COLOCA O CASO 5 EXATAMENTE AQUI ---
  it('Caso 5: Deve exibir erro ao tentar registar com um e-mail já existente', () => {
    const emailExistente = `duplicado_${new Date().getTime()}@test.com`

    // 1º Passo: Criar a conta pela primeira vez
    signupPage.visitPage()
    signupPage.startSignup('Utilizador Existente', emailExistente)
    signupPage.fillAccountDetails('Senha123!')
    signupPage.fillAddressDetails({
      firstName: 'Jussara',
      lastName: 'Sousa',
      address: 'Rua dos Testes, 123',
      country: 'United States',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      zipcode: '30000',
      mobile: '31999999999'
    })
    signupPage.elements.accountCreatedHeader().should('be.visible')
    signupPage.elements.continueButton().click()

    // Fazer logout
    cy.get('a[href="/logout"]').click()

    // Limpa totalmente os cookies e dados locais para o site não reencaminhar o utilizador
    cy.clearAllCookies()
    cy.clearAllLocalStorage()

    // 2º Passo: Visita a página de novo e tenta usar o mesmo e-mail
    signupPage.visitPage()
    signupPage.startSignup('Outro Utilizador', emailExistente)

    // 3º Passo: Valida a mensagem de erro de e-mail duplicado
    signupPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  })

})