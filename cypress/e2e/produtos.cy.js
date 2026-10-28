import produtosPage from '../pages/produtosPage'

describe('Testes de Produtos', () => {
    beforeEach(() => {
        cy.visit('/') 
    })

    it('Caso 8: Acessar a página de produtos e validar os detalhes do primeiro produto', () => {
        produtosPage.acessarPaginaProdutos()
        produtosPage.validarPaginaDeProdutos()
        produtosPage.acessarDetalhesDoPrimeiroProduto()
        produtosPage.validarDetalhesDoProduto()
    })
})