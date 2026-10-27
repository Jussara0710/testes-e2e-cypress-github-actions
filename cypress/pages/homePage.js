class HomePage {
  constructor() {
    this.elements = {
      rodape: () => cy.get('#footer'),
      textoInscricao: () => cy.get('footer .single-widget h2'),
      inputEmailInscricao: () => cy.get('#susbscribe_email'),
      botaoInscricao: () => cy.get('#subscribe'),
      mensagemSucesso: () => cy.get('#success-subscribe')
    }
  }

  descerAteORodape() {
    this.elements.rodape().scrollIntoView()
    this.elements.textoInscricao().should('contain', 'Subscription')
  }

  inscreverEmail(email) {
    this.elements.inputEmailInscricao().type(email)
    this.elements.botaoInscricao().click()
  }

  validarInscricaoComSucesso() {
    this.elements.mensagemSucesso().should('be.visible').and('contain', 'You have been successfully subscribed!')
  }
}

export default new HomePage()