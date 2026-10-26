import loginPage from '../pages/loginPage'
import signupPage from '../pages/signupPage'

describe('Funcionalidades Principais - Automation Exercise', () => {

  beforeEach(() => {
    // Garante que limpamos sempre a sessão e cookies antes de cada teste
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // 1. O teste de Login que acabámos de confirmar que funciona
  it('Caso 3: Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    loginPage.visitPage()
    loginPage.login('email_invalido@teste.com', 'senha_errada123')
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })

  // 2. O Caso 2: Criar conta, fazer login e apagar no final
  it('Caso 2: Deve registar um novo utilizador, fazer login e apagar a conta no final', () => {
    const timestamp = new Date().getTime()
    const email = `usuario_${timestamp}@teste.com`
    const password = 'senha123'
    const name = 'Utilizador Teste'

    // Passo A: Registo inicial
    signupPage.visitPage()
    signupPage.startSignup(name, email)
    
    // Passo B: Preenchimento dos detalhes da conta e morada
    signupPage.fillAccountDetails(password)
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

    // Passo C: Validar que a conta foi criada com sucesso
    signupPage.elements.accountCreatedHeader().should('be.visible').and('contain', 'Account Created!')
    signupPage.elements.continueButton().click()

    // Passo D: Fazer logout da sessão criada
    cy.get('a[href="/logout"]').click()

    // Passo E: Testar o Login com as credenciais recém-criadas
    loginPage.visitPage()
    loginPage.login(email, password)
    signupPage.elements.loggedInAs().should('be.visible').and('contain', name)

    // Passo F: Apagar a conta conforme exigido pelo caso de teste
    signupPage.deleteAccount()
  })

})