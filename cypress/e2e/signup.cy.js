import signupPage from '../pages/signupPage'

describe('Cadastro de Usuário', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Deve cadastrar um novo usuário com sucesso e apagar a conta', () => {
    const timestamp = new Date().getTime()
    const email = `usuario_${timestamp}@test.com`

    signupPage.visitPage()
    signupPage.startSignup('Usuario PGATS', email)
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

  it('Caso 5: Deve exibir erro ao tentar cadastrar com e-mail já existente', () => {
    const emailExistente = `duplicado_${new Date().getTime()}@test.com`

    signupPage.visitPage()
    signupPage.startSignup('Usuario Existente', emailExistente)
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

    cy.get('a[href="/logout"]').click()

    cy.clearAllCookies()
    cy.clearAllLocalStorage()

    signupPage.visitPage()
    signupPage.startSignup('Outro Usuario', emailExistente)

    signupPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  })

})