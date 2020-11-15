/// <reference types="Cypress" />

context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heat_exchanger/crossflow')
  })

  // https://on.cypress.io/interacting-with-elements

it('Calculate button', () => {
cy.get('#submit').click({ force: true })

cy.get('div[class="container-fluid"]').find('img').should('be.visible')
cy.get('.container-fluid .col-md-8').find('h2').should('be.visible')
cy.get('.row .col-md-8').find('table').should('be.visible')
cy.get('div[class="col-md-12"]').find('table').should('be.visible')

cy.get('#save_project_submit').click().get('#modal-auth').should('be.visible')
cy.contains('View Pdf').click({force: true})
})
})
