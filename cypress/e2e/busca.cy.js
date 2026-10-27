const produtosPage = require('../pages/produtosPage')

describe('Testes de Busca', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('/')
    })

    it('Caso 9: Buscar um produto', () => {
        produtosPage.acessarPaginaProdutos()
        produtosPage.validarPaginaDeProdutos()
        
        const produto = 'Shirt'
        produtosPage.buscarProduto(produto)
        produtosPage.validarProdutosBuscados(produto)
    })
})