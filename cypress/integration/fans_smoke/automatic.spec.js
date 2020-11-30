context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/smoke_fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.get('div[class="col-md-6 text-center product-image"]').find('img').should('be.visible')
    cy.get('div[class="col-md-6 text-center"]').find('div').should('be.visible')
    cy.get('div[class="row"]').find('.chart-block').should('be.visible')
    cy.get('div[class="product-calculations"]').find('table').should('be.visible')
    cy.get('div[class="col-md-12"]').find('.google-chart').should('be.visible')
    cy.get('div[class="row pt-15"]').find('ul').should('be.visible')
    cy.get('div[class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-xs-12 text-center"]').find('img').should('be.visible')

    cy.get('#minimize_all').click().get('#results').should('be.visible')
    cy.get('#save_project_submit').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})