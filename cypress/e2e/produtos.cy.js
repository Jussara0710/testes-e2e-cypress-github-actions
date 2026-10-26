const produtosPage = require('../pages/produtosPage')

describe('Testes de Produtos', () => {
    beforeEach(() => {
        // O Cypress deve abrir a home antes do caso
        cy.visit('/') 
    })

    it('Caso 8: Acessar a página de produtos e validar os detalhes do primeiro produto', () => {
        // Passos da spec chamando as ações do page object
        produtosPage.acessarPaginaProdutos()
        produtosPage.validarPaginaDeProdutos()
        produtosPage.acessarDetalhesDoPrimeiroProduto()
        produtosPage.validarDetalhesDoProduto()
    })
})