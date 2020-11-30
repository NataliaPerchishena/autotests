context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heat_exchanger/rotary')
  })

  it('calculate_button', () => {
    cy.get('#winter_standard_airflow_supply').clear().type('1000')
    cy.get('#winter_standard_airflow_extract').clear().type('1000')

    cy.get('#submit').click({ force: true })

    cy.get('div[class="container-fluid"]').find('img').should('be.visible')
    cy.get('.container-fluid .col-md-8').find('h2').should('be.visible')
    cy.get('.row .col-md-8').find('table').should('be.visible')
    cy.get('div[class="col-md-12"]').find('table').should('be.visible')

    cy.get('#save_project_submit').click().get('#modal-auth').should('be.visible')
    cy.checkPdf();
  })
})
