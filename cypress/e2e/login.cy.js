import loginPage from '../pages/loginPage'

describe('Funcionalidade de Login (Automation Exercise)', () => {
  beforeEach(() => {
    loginPage.visitPage()
  })

  it('Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    loginPage.login('email_invalido@teste.com', 'senha123')
    loginPage.elements.errorMessage().should('be.visible')
  })
})