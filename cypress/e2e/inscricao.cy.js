import homePage from '../pages/homePage'

describe('Funcionalidade de Inscrição - Automation Exercise', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('Caso 10: Deve realizar a inscrição com sucesso na home page', () => {
    homePage.descerAteORodape()
    homePage.inscreverEmail('aluno@pgats.com.br')
    homePage.validarInscricaoComSucesso()
  })
})