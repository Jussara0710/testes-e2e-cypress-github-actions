import loginPage from '../pages/loginPage'

describe('Funcionalidade de Login (Automation Exercise)', () => {
  beforeEach(() => {
    loginPage.visitPage()
  })

  // Implementação do Caso 3: Login com credenciais inválidas
  it('Caso 3: Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    loginPage.login('email_invalido@teste.com', 'senha_errada123')
    
    // Valida se a mensagem de erro específica do Caso 3 é exibida no ecrã
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })
})