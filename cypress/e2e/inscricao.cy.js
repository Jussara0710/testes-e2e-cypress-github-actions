import homePage from '../pages/homePage'

describe('Newsletter', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('Caso 10: Deve realizar inscrição com sucesso na home', () => {
    homePage.descerAteORodape()
    homePage.inscreverEmail('aluno@pgats.com.br')
    homePage.validarInscricaoComSucesso()
  })
})