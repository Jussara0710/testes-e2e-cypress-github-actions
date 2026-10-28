import loginPage from '../pages/loginPage'
import signupPage from '../pages/signupPage'

describe('Funcionalidades Principais de Login e Autenticação - Automation Exercise', () => {

  const addressData = {
    firstName: 'Jussara',
    lastName: 'Sousa',
    address: 'Rua dos Testes, 123',
    country: 'United States',
    state: 'Minas Gerais',
    city: 'Belo Horizonte',
    zipcode: '30000',
    mobile: '31999999999'
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Caso 2: Deve registar um novo utilizador, fazer login e apagar a conta no final', () => {
    const timestamp = new Date().getTime()
    const email = `usuario_${timestamp}@teste.com`
    const password = 'senha123'
    const name = 'Utilizador Teste'

    // 1. Registo prévio da conta
    signupPage.visitPage()
    signupPage.startSignup(name, email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.accountCreatedHeader().should('be.visible').and('contain', 'Account Created!')
    signupPage.elements.continueButton().click({ force: true })

    // 2. Logout para testar o login
    cy.get('a[href="/logout"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    // 3. Login com credenciais válidas
    cy.url({ timeout: 10000 }).should('include', '/login')
    loginPage.login(email, password)

    // Validação dinâmica sem cy.wait fixo
    cy.contains('Logged in as', { timeout: 15000 })
      .should('be.visible')
      .and('contain', name)

    // 4. Limpeza da conta
    signupPage.deleteAccount()
  })

  it('Caso 3: Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    loginPage.visitPage()
    loginPage.login('email_invalido@teste.com', 'senha_errada123')
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })

  it('Caso 4: Deve realizar o logout com sucesso e redirecionar para a página de login', () => {
    const timestamp = new Date().getTime()
    const email = `user_logout_${timestamp}@teste.com`
    const password = 'senha123'
    const name = 'Usuario Logout'

    // 1. Criar conta para garantir uma sessão ativa
    signupPage.visitPage()
    signupPage.startSignup(name, email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.accountCreatedHeader().should('be.visible')
    signupPage.elements.continueButton().click({ force: true })

    // 2. Validar que a sessão está ativa
    cy.contains('Logged in as', { timeout: 15000 })
      .should('be.visible')
      .and('contain', name)

    // 3. Executar o logout (Foco do Caso 4)
    cy.get('a[href="/logout"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    // 4. Validar redirecionamento para o ecrã de login
    cy.url({ timeout: 10000 }).should('include', '/login')
    cy.contains('Login to your account').should('be.visible')

    // 5. Limpeza: reautenticar para apagar a conta
    loginPage.login(email, password)
    signupPage.deleteAccount()
  })

})