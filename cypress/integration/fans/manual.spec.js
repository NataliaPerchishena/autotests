context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/fan/')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })

    cy.get('#airflow_at_operating_point').clear().type('100')
    cy.get('#static_pressure_at_operating_point').clear().type('10')
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12 text-center"]').find('img').should('be.visible')
    cy.get('div[class="row"]').find('.chart-block').should('be.visible')
    cy.get('div[class="table-responsive"]').find('table').should('be.visible')
    cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')

    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})