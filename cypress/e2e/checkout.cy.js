import carrinhoPage from '../pages/carrinhoPage'
import pagamentoPage from '../pages/pagamentoPage'
import signupPage from '../pages/signupPage'
import loginPage from '../pages/loginPage'

describe('Funcionalidade de Checkout - Automation Exercise', () => {

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

    // 1. Cadastrar utilizador primeiro
    signupPage.visitPage()
    signupPage.startSignup('User Caso 15', email)
    signupPage.fillAccountDetails('Senha123')
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.continueButton().click({ force: true })

    // 2. Voltar à home, adicionar produto e ir para o checkout
    cy.visit('/')
    carrinhoPage.adicionarPrimeiroProduto()
    carrinhoPage.prosseguirParaCheckout()

    // 3. Validar e prosseguir para pagamento
    carrinhoPage.validarDadosDeEntregaECarrinho()
    carrinhoPage.inserirComentarioEFinalizar('Entregar na portaria')

    // 4. Pagar
    pagamentoPage.preencherDadosDoCartaoEConfirmar('Teste', '411111111111', '123', '12', '2030')
    pagamentoPage.validarPedidoConfirmado()

    // 5. Apagar conta no final
    signupPage.deleteAccount()
  })

  it('Caso 16: Login antes do Checkout', () => {
    const timestamp = new Date().getTime()
    const email = `user16_${timestamp}@teste.com`
    const password = 'Senha123'

    // 1. Criar conta e fazer logout
    signupPage.visitPage()
    signupPage.startSignup('User Caso 16', email)
    signupPage.fillAccountDetails(password)
    signupPage.fillAddressDetails(addressData)
    signupPage.elements.continueButton().click({ force: true })
    cy.get('a[href="/logout"]').click({ force: true })

    // 2. Fazer Login
    loginPage.visitPage()
    loginPage.login(email, password)

    // 3. Ir à home, adicionar produto e ir para o checkout
    cy.visit('/')
    carrinhoPage.adicionarPrimeiroProduto()
    carrinhoPage.prosseguirParaCheckout()

    // 4. Validar e prosseguir para pagamento
    carrinhoPage.validarDadosDeEntregaECarrinho()
    carrinhoPage.inserirComentarioEFinalizar('Sem comentários')

    // 5. Pagar
    pagamentoPage.preencherDadosDoCartaoEConfirmar('Teste', '411111111111', '123', '12', '2030')
    pagamentoPage.validarPedidoConfirmado()

    // 6. Apagar conta no final
    signupPage.deleteAccount()
  })
})