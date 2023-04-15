// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'
import 'cypress-commands'
import 'cypress-iframe'

// 封装登录公共方法
Cypress.Commands.add('login', (name, pwd) => {
  cy.intercept({
    url: '**/v1.0.0/users/authorization',
    method: 'POST'
  }).as('loginSuccess')
  cy.visit('/' + '/login').then(() => {
    cy.wait(1000)
    cy.get('#login_email').type(name)
    cy.get('#login_password').type(`${pwd}{enter}`)
  })
  cy.wait('@loginSuccess').then((res) => {
    console.log('res', res)
    expect(res.response.body.error_code).to.be.eq(0)
    expect(res.response.body.error_message).to.be.eq('success')
  })
})

// 页面路径封装成cypress内置命令
Cypress.Commands.add('visitRegister', () => {
  cy.visit('/register')
})
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/login')
})
