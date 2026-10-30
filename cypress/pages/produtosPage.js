const seletores = {
  botaoProdutos: 'a[href="/products"]',
  tituloProdutos: '.title.text-center',
  listaProdutos: '.features_items',
  primeiroProdutoVerDetalhes: 'a[href="/product_details/1"]',
  nomeProdutoDetalhe: '.product-information h2',
  categoriaProduto: '.product-information p',
  precoProduto: '.product-information span span',
  disponibilidadeProduto: '.product-information p',
  condicaoProduto: '.product-information p',
  marcaProduto: '.product-information p',
  inputBusca: '#search_product',
  botaoBusca: '#submit_search'
}

module.exports = {
  acessarPaginaProdutos() {
    cy.get(seletores.botaoProdutos).click()
  },

  validarPaginaDeProdutos() {
    cy.get(seletores.tituloProdutos).should('be.visible').and('contain', 'All Products')
    cy.get(seletores.listaProdutos).should('be.visible')
  },

  acessarDetalhesDoPrimeiroProduto() {
    cy.get(seletores.primeiroProdutoVerDetalhes).click()
  },

  validarDetalhesDoProduto() {
    cy.url().should('include', '/product_details/1')
    cy.get(seletores.nomeProdutoDetalhe).should('be.visible')
    cy.get(seletores.categoriaProduto).should('contain', 'Category')
    cy.get(seletores.precoProduto).should('be.visible')
    cy.get(seletores.disponibilidadeProduto).should('contain', 'Availability')
    cy.get(seletores.condicaoProduto).should('contain', 'Condition')
    cy.get(seletores.marcaProduto).should('contain', 'Brand')
  },

  buscarProduto(nomeProduto) {
    cy.get(seletores.inputBusca).type(nomeProduto)
    cy.get(seletores.botaoBusca).click()
  },

  validarProdutosBuscados(nomeEsperado) {
    cy.get(seletores.tituloProdutos).should('be.visible').and('contain', 'Searched Products')
    cy.get(seletores.listaProdutos).should('be.visible').and('contain', nomeEsperado)
  }
}