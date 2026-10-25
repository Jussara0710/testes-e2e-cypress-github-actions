class SignupPage {
  elements = {
    nameInput: () => cy.get('[data-qa="signup-name"]'),
    emailInput: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
    
    // Formulário de detalhes da conta
    titleMr: () => cy.get('#id_gender1'),
    passwordInput: () => cy.get('[data-qa="password"]'),
    daysSelect: () => cy.get('[data-qa="days"]'),
    monthsSelect: () => cy.get('[data-qa="months"]'),
    yearsSelect: () => cy.get('[data-qa="years"]'),
    newsletterCheckbox: () => cy.get('#newsletter'),
    optinCheckbox: () => cy.get('#optin'),
    
    // Endereço e dados pessoais
    firstNameInput: () => cy.get('[data-qa="first_name"]'),
    lastNameInput: () => cy.get('[data-qa="last_name"]'),
    companyInput: () => cy.get('[data-qa="company"]'),
    address1Input: () => cy.get('[data-qa="address"]'),
    countrySelect: () => cy.get('[data-qa="country"]'),
    stateInput: () => cy.get('[data-qa="state"]'),
    cityInput: () => cy.get('[data-qa="city"]'),
    zipcodeInput: () => cy.get('[data-qa="zipcode"]'),
    mobileNumberInput: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),
    
    // Confirmação e exclusão
    accountCreatedHeader: () => cy.get('[data-qa="account-created"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
    loggedInAs: () => cy.contains('Logged in as'),
    deleteAccountButton: () => cy.get('[href*="delete_account"]'),
    accountDeletedHeader: () => cy.get('[data-qa="account-deleted"]')
  }

  visitPage() {
    cy.visit('/login')
  }

  startSignup(name, email) {
    this.elements.nameInput().type(name)
    this.elements.emailInput().type(email)
    this.elements.signupButton().click()
  }

  fillAccountDetails(password, day, month, year) {
    this.elements.titleMr().click()
    this.elements.passwordInput().type(password, { log: false })
    this.elements.daysSelect().select(day)
    this.elements.monthsSelect().select(month)
    this.elements.yearsSelect().select(year)
    this.elements.newsletterCheckbox().check()
    this.elements.optinCheckbox().check()
  }

  fillAddressDetails(firstName, lastName, company, address, country, state, city, zipcode, mobile) {
    this.elements.firstNameInput().type(firstName)
    this.elements.lastNameInput().type(lastName)
    this.elements.companyInput().type(company)
    this.elements.address1Input().type(address)
    this.elements.countrySelect().select(country)
    this.elements.stateInput().type(state)
    this.elements.cityInput().type(city)
    this.elements.zipcodeInput().type(zipcode)
    this.elements.mobileNumberInput().type(mobile)
    this.elements.createAccountButton().click()
  }

  deleteAccount() {
    this.elements.deleteAccountButton().click()
  }
}

export default new SignupPage()