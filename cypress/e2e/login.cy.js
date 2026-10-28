import loginPage from '../pages/loginPage'
import signupPage from '../pages/signupPage'

describe('Funcionalidades Principais - Automation Exercise', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // 1. O teste de Login
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

    // Passo C: Validar que a conta foi criada com sucesso e continuar
    signupPage.elements.accountCreatedHeader().should('be.visible').and('contain', 'Account Created!')
    // O { force: true } ignora anúncios que possam estar a bloquear o botão
    signupPage.elements.continueButton().click({ force: true })

    // Passo D: Fazer logout da sessão criada
    // Aumentamos o tempo de espera pelo elemento e forçamos o clique
    cy.get('a[href="/logout"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    // Passo E: Testar o Login com as credenciais recém-criadas
    // Após o logout, o site já deve estar na página de login, por isso apenas validamos o URL
    cy.url({ timeout: 10000 }).should('include', '/login')
    loginPage.login(email, password)
    
    // Espera pelo processamento lento do login no servidor
    cy.wait(5000) 
    
    // Força uma procura com timeout alargado
    cy.contains('Logged in as', { timeout: 15000 })
      .should('be.visible')
      .and('contain', name)

    // Passo F: Apagar a conta
    signupPage.deleteAccount()
  })

})