context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/nrvu_bvu')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12 text-center"]').find('img').should('be.visible')
    cy.get('div[class="row pb-20"]').find('p').should('be.visible')
    cy.get('div[class="row pb-20"]').find('table').should('be.visible')
    cy.get('div[class="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12"]').find('img').should('be.visible')

    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})
