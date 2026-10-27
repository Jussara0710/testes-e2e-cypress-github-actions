class CarrinhoPage {
  constructor() {
    this.elements = {
      adicionarAoCarrinhoPrimeiro: () => cy.get('.add-to-cart').first(),
      botaoVerCarrinhoModal: () => cy.get('u').contains('View Cart'),
      botaoCheckout: () => cy.get('.check_out'),
      enderecoEntrega: () => cy.get('#address_delivery'),
      infoCarrinho: () => cy.get('#cart_info'),
      comentarioTextarea: () => cy.get('textarea[name="message"]'),
      botaoPagamento: () => cy.get('a[href="/payment"]')
    }
  }

  adicionarPrimeiroProduto() {
    this.elements.adicionarAoCarrinhoPrimeiro().click()
    cy.get('.modal-content').should('be.visible')
    this.elements.botaoVerCarrinhoModal().click()
  }

  prosseguirParaCheckout() {
    this.elements.botaoCheckout().click()
  }

  validarDadosDeEntregaECarrinho() {
    this.elements.enderecoEntrega().should('be.visible')
    this.elements.infoCarrinho().should('be.visible')
  }

  inserirComentarioEFinalizar(comentario) {
    this.elements.comentarioTextarea().type(comentario)
    this.elements.botaoPagamento().click()
  }
}

export default new CarrinhoPage()