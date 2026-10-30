import carrinhoPage from '../pages/carrinhoPage'
import pagamentoPage from '../pages/pagamentoPage'
import signupPage from '../pages/signupPage'
import loginPage from '../pages/loginPage'

describe('Checkout', () => {

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
    cy.visit('/')
  })

  it('Caso 15: Cadastrar antes do Checkout', () => {
    const timestamp = new Date().getTime()
    const email = `user15_${timestamp}@teste.com`

    signupPage.visitPage()
    signupPage.startSignup('User Caso 15', email)
    signupPage.fillAccountDetails('Senha123')
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.continueButton().click({ force: true })

    cy.visit('/')
    carrinhoPage.adicionarPrimeiroProduto()
    carrinhoPage.prosseguirParaCheckout()

    carrinhoPage.validarDadosDeEntregaECarrinho()
    carrinhoPage.inserirComentarioEFinalizar('Entregar na portaria')

    pagamentoPage.preencherDadosDoCartaoEConfirmar('Teste', '411111111111', '123', '12', '2030')
    pagamentoPage.validarPedidoConfirmado()

    signupPage.deleteAccount()
  })

  it('Caso 16: Login antes do Checkout', () => {
    const timestamp = new Date().getTime()
    const email = `user16_${timestamp}@teste.com`
    const password = 'Senha123'

    signupPage.visitPage()
    signupPage.startSignup('User Caso 16', email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.continueButton().click({ force: true })
    cy.get('a[href="/logout"]').click({ force: true })

    loginPage.visitPage()
    loginPage.login(email, password)

    cy.visit('/')
    carrinhoPage.adicionarPrimeiroProduto()
    carrinhoPage.prosseguirParaCheckout()

    carrinhoPage.validarDadosDeEntregaECarrinho()
    carrinhoPage.inserirComentarioEFinalizar('Sem comentários')

    pagamentoPage.preencherDadosDoCartaoEConfirmar('Teste', '411111111111', '123', '12', '2030')
    pagamentoPage.validarPedidoConfirmado()

    signupPage.deleteAccount()
  })
})