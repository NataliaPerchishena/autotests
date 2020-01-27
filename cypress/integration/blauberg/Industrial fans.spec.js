/// <reference types="Cypress" />

context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/fan/')
  })

  // https://on.cypress.io/interacting-with-elements

it('Automatic selection button', () => {
// cy.contains('Automatic selection').click({ force: true })
cy.get('#automatic_calculate-submit').click({ force: true })

cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12 text-center"]').find('img').should('be.visible')
cy.get('div[class="row"]').find('.chart-block').should('be.visible')
cy.get('div[class="row pt-15"]').find('table').should('be.visible')
cy.get('div[class="col-md-12"]').find('.google-chart').should('be.visible')
cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')

cy.contains('More result').click().get('.row').contains('Inline centrifugal fans ')
cy.contains('Save as').click().get('#modal-auth').should('be.visible')
// cy.contains('View Pdf').click({force: true})
})


it('Manual selection button', () => {
cy.contains('Manual selection').should('not.be.disabled').click({force: true })

cy.get('#airflow_at_operating_point').clear().type('100')
cy.get('#static_pressure_at_operating_point').clear().type('10')
cy.get('#manual_calculate-submit').click({ force: true })

cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12 text-center"]').find('img').should('be.visible')
cy.get('div[class="row"]').find('.chart-block').should('be.visible')
cy.get('div[class="table-responsive"]').find('table').should('be.visible')
cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')

cy.contains('Save as').click().get('#modal-auth').should('be.visible')
cy.contains('View Pdf').click({force: true})
})
})
