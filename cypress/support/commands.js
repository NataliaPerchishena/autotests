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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('checkTitle', () => {
    cy.get('[data-cy=title]').should('be.visible')
})

Cypress.Commands.add('checkDescription', () => {
    cy.get('[data-cy=description]').should('be.visible')
})

Cypress.Commands.add('checkImage', () => {
    cy.get('[data-cy=image]').should('be.visible')
})

Cypress.Commands.add('checkSaveAs', () => {
    cy.get('[data-cy=save_as]').first().click().get('#modal-auth').should('be.visible')
})

Cypress.Commands.add('checkPdf', () => {
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true })
    cy.get('embed').should('be.visible')
})

Cypress.Commands.add('checkBasic', () => {

    cy.checkTitle();
    // cy.checkDescription();
    cy.checkImage();
    cy.checkSaveAs();
    cy.checkPdf();
})