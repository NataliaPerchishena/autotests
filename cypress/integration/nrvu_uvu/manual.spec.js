context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/nrvu_uvu')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })
    cy.get('#airflow').clear().type('1000')

    cy.get('#manual_calculate-submit').click({ force: true })

    cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')
    cy.get('div[class="row pb-20"]').find('p').should('be.visible')
    cy.get('div[class="row pb-20"]').find('span').should('be.visible')
    cy.get('div[class="row pb-20"]').find('table').should('be.visible')
    cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12"]').find('img').should('be.visible')

    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})
