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
    cy.wait(1000)
    cy.get('embed').should('be.visible')
})
Cypress.Commands.add('checkPdf200', () => {
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('checkBasic', () => {

    cy.checkTitle();
    // cy.checkDescription();
    cy.checkImage();
    cy.checkSaveAs();
    cy.checkPdf();
})

Cypress.Commands.add('login', (Url) => {
  //  Cypress.session.clearAllSavedSessions();
    cy.session('session', () =>{    
    //let Url = Cypress.env('baubUrl');
    cy.visit(Url+'/login');
    let testUser = Cypress.env('prodUser');
//cy.wait(2000)
    cy.get('input[name=email]').first().type(testUser.email);
    cy.get('input[name=password]').first().type(testUser.password);
    cy.get('button.register_button').first().click({ force: true });
    cy.wait(1000)     
},
      { 
         cacheAcrossSpecs: true, 
      }
    )   
  })

  Cypress.Commands.add('checkSaveAsAfterAuth', () => {
    cy.get('[data-cy=save_as]').first().click().get('#save_project_modal').should('be.visible');
    cy.get('#save_project_form').children('.modal-footer').children('.btn-default').click({force: true})
})
Cypress.Commands.add('checkBasicAfterAuth', () => {

    cy.checkTitle();
    // cy.checkDescription();
    cy.checkImage();
    cy.checkSaveAsAfterAuth();
    cy.checkPdf();
})