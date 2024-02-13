context('Blauberg', () => {
  beforeEach(() => {
    let Url = Cypress.env('ventsUrl');
    
    cy.visit(Url+'/smoke_fan')
})

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_icf').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('5000');
    cy.get('#number_of_speeds').select('1', { force: true });
       
    
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1500);
  
    cy.get('[data-cy=title]').should('includes.text', 'ICF-50N-4-300/2');
    
    cy.checkBasic();
  })
})