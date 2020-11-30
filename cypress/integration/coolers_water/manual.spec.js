context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/cooler_water')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })

    cy.get('#manual_calculate-submit').click({ force: true })
    cy.get('div[class="col-md-5 text-center product-image"]').find('img').should('be.visible')
    cy.get('div[class="product-title"]').find('h2').should('be.visible')
    // cy.get('div[class="product-description"]').find('p').should('be.visible')
    cy.get('div[class="row selector-data-tables"]').find('table').should('be.visible')

    cy.contains('Save as').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})
