class LoginPage {
  constructor() {
    this.elements = {
      emailInput: () => cy.get('input[data-qa="login-email"]'),
      passwordInput: () => cy.get('input[data-qa="login-password"]'),
      loginButton: () => cy.get('button[data-qa="login-button"]'),
      errorMessage: () => cy.get('.login-form form p')
    }
  }

  visitPage() {
    cy.visit('/login')
  }

  login(email, password) {
    this.elements.emailInput().type(email)
    this.elements.passwordInput().type(password)
    this.elements.loginButton().click()
  }
}

export default new LoginPage()