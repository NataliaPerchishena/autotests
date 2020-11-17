context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heater_water')
  })

  it('Automatic selection button', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.get('div[class="col-md-6 text-center product-image"]').find('img').should('be.visible')
    cy.get('div[class="product-title"]').find('h2').should('be.visible')
    cy.get('div[class="product-description"]').find('p').should('be.visible')
    cy.get('div[class="row selector-data-tables"]').find('table').should('be.visible')

    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})
