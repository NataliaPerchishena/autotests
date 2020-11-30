context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/fan/')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12 text-center"]').find('img').should('be.visible')
    cy.get('div[class="row"]').find('.chart-block').should('be.visible')
    cy.get('div[class="row pt-15"]').find('table').should('be.visible')
    cy.get('div[class="col-md-12"]').find('.google-chart').should('be.visible')
    cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')

    cy.contains('More result').click().get('.row').contains('Inline centrifugal fans ')
    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})