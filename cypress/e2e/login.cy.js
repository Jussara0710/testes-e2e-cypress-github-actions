import loginPage from '../pages/loginPage'
import signupPage from '../pages/signupPage'

describe('Login e Autenticação', () => {

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

  it('Caso 2: Deve logar com credenciais válidas e excluir a conta', () => {
    const timestamp = new Date().getTime()
    const email = `usuario_${timestamp}@teste.com`
    const password = 'senha123'
    const name = 'Usuario Teste'

    signupPage.visitPage()
    signupPage.startSignup(name, email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.accountCreatedHeader().should('be.visible').and('contain', 'Account Created!')
    signupPage.elements.continueButton().click({ force: true })

    cy.get('a[href="/logout"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    cy.url({ timeout: 10000 }).should('include', '/login')
    loginPage.login(email, password)

    cy.contains('Logged in as', { timeout: 15000 })
      .should('be.visible')
      .and('contain', name)

    signupPage.deleteAccount()
  })

  it('Caso 3: Deve exibir erro ao logar com credenciais inválidas', () => {
    loginPage.visitPage()
    loginPage.login('email_invalido@teste.com', 'senha_errada123')
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })

  it('Caso 4: Deve realizar logout com sucesso', () => {
    const timestamp = new Date().getTime()
    const email = `user_logout_${timestamp}@teste.com`
    const password = 'senha123'
    const name = 'Usuario Logout'

    signupPage.visitPage()
    signupPage.startSignup(name, email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.accountCreatedHeader().should('be.visible')
    signupPage.elements.continueButton().click({ force: true })

    cy.contains('Logged in as', { timeout: 15000 })
      .should('be.visible')
      .and('contain', name)

    cy.get('a[href="/logout"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    cy.url({ timeout: 10000 }).should('include', '/login')
    cy.contains('Login to your account').should('be.visible')

    loginPage.login(email, password)
    signupPage.deleteAccount()
  })

})