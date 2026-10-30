import produtosPage from '../pages/produtosPage'

describe('Produtos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Caso 8: Validar detalhes do primeiro produto', () => {
    produtosPage.acessarPaginaProdutos()
    produtosPage.validarPaginaDeProdutos()
    produtosPage.acessarDetalhesDoPrimeiroProduto()
    produtosPage.validarDetalhesDoProduto()
  })
})