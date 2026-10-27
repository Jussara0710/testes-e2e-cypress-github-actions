class PagamentoPage {
  constructor() {
    this.elements = {
      nomeCartao: () => cy.get('[data-qa="name-on-card"]'),
      numeroCartao: () => cy.get('[data-qa="card-number"]'),
      cvc: () => cy.get('[data-qa="cvc"]'),
      mesValidade: () => cy.get('[data-qa="expiry-month"]'),
      anoValidade: () => cy.get('[data-qa="expiry-year"]'),
      botaoPagar: () => cy.get('[data-qa="pay-button"]'),
      pedidoConfirmado: () => cy.get('[data-qa="order-placed"]')
    }
  }

  preencherDadosDoCartaoEConfirmar(nome, numero, cvc, mes, ano) {
    this.elements.nomeCartao().type(nome)
    this.elements.numeroCartao().type(numero)
    this.elements.cvc().type(cvc)
    this.elements.mesValidade().type(mes)
    this.elements.anoValidade().type(ano)
    this.elements.botaoPagar().click()
  }

  validarPedidoConfirmado() {
    this.elements.pedidoConfirmado().should('be.visible')
  }
}

export default new PagamentoPage()