class SignupPage {
  constructor() {
    this.elements = {
      nameInput: () => cy.get('input[data-qa="signup-name"]', { timeout: 10000 }),
      emailInput: () => cy.get('input[data-qa="signup-email"]', { timeout: 10000 }),
      signupButton: () => cy.get('button[data-qa="signup-button"]'),
      
      passwordInput: () => cy.get('[data-qa="password"]'),
      firstNameInput: () => cy.get('[data-qa="first_name"]'),
      lastNameInput: () => cy.get('[data-qa="last_name"]'),
      addressInput: () => cy.get('[data-qa="address"]'),
      countrySelect: () => cy.get('[data-qa="country"]'),
      stateInput: () => cy.get('[data-qa="state"]'),
      cityInput: () => cy.get('[data-qa="city"]'),
      zipcodeInput: () => cy.get('[data-qa="zipcode"]'),
      mobileNumberInput: () => cy.get('[data-qa="mobile_number"]'),
      createAccountButton: () => cy.get('[data-qa="create-account"]'),
      
      accountCreatedHeader: () => cy.get('[data-qa="account-created"]'),
      continueButton: () => cy.get('[data-qa="continue-button"]'),
      loggedInAs: () => cy.contains('Logged in as'),
      errorMessage: () => cy.get('.signup-form form p'),
      accountDeletedHeader: () => cy.get('[data-qa="account-deleted"]')
    }
  }

  visitPage() {
    cy.visit('/login')
  }

  startSignup(name, email) {
    this.elements.nameInput().should('be.visible').type(name)
    this.elements.emailInput().should('be.visible').type(email)
    this.elements.signupButton().click()
  }

  fillAccountDetails(password) {
    this.elements.passwordInput().type(password)
  }

  fillAddressDetails(data = {}) {
    this.elements.firstNameInput().type(data.firstName || 'QA')
    this.elements.lastNameInput().type(data.lastName || 'Tester')
    this.elements.addressInput().type(data.address || 'Rua dos Testes, 123')
    this.elements.countrySelect().select(data.country || 'United States')
    this.elements.stateInput().type(data.state || 'California')
    this.elements.cityInput().type(data.city || 'Los Angeles')
    this.elements.zipcodeInput().type(data.zipcode || '90001')
    this.elements.mobileNumberInput().type(data.mobile || '1234567890')
    this.elements.createAccountButton().click()
  }

  deleteAccount() {
    cy.get('a[href="/delete_account"]').click()
    this.elements.accountDeletedHeader().should('be.visible').and('contain', 'Account Deleted!')
  }
}

export default new SignupPage()