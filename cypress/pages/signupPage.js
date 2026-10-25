class SignupPage {
  elements = {
    nameInput: () => cy.get('input[data-qa="signup-name"]'),
    emailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    genderTitle: () => cy.get('#id_gender1'),
    passwordInput: () => cy.get('#password'),
    daySelect: () => cy.get('#days'),
    monthSelect: () => cy.get('#months'),
    yearSelect: () => cy.get('#years'),
    firstNameInput: () => cy.get('#first_name'),
    lastNameInput: () => cy.get('#last_name'),
    companyInput: () => cy.get('#company'),
    addressInput: () => cy.get('#address1'),
    countrySelect: () => cy.get('#country'),
    stateInput: () => cy.get('#state'),
    cityInput: () => cy.get('#city'),
    zipcodeInput: () => cy.get('#zipcode'),
    mobileNumberInput: () => cy.get('#mobile_number'),
    createAccountButton: () => cy.get('button[data-qa="create-account"]'),
    accountCreatedHeader: () => cy.get('b'),
    continueButton: () => cy.get('a[data-qa="continue-button"]'),
    loggedInAs: () => cy.contains('Logged in as'),
    deleteAccountLink: () => cy.get('a[href="/delete_account"]'),
    accountDeletedHeader: () => cy.get('b'),
    errorMessage: () => cy.contains('p', 'Email Address already exist!')
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
    this.elements.genderTitle().click()
    this.elements.passwordInput().type(password)
    this.elements.daySelect().select(day)
    this.elements.monthSelect().select(month)
    this.elements.yearSelect().select(year)
  }

  fillAddressDetails(firstName, lastName, company, address, country, state, city, zipcode, mobileNumber) {
    this.elements.firstNameInput().type(firstName)
    this.elements.lastNameInput().type(lastName)
    this.elements.companyInput().type(company)
    this.elements.addressInput().type(address)
    this.elements.countrySelect().select(country)
    this.elements.stateInput().type(state)
    this.elements.cityInput().type(city)
    this.elements.zipcodeInput().type(zipcode)
    this.elements.mobileNumberInput().type(mobileNumber)
    this.elements.createAccountButton().click()
  }

  deleteAccount() {
    this.elements.deleteAccountLink().click()
  }
}

export default new SignupPage()