context('Blauberg', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('zernUrl')+'/heat_exchanger/rotary')
    })
  
    it('calculate_button', () => {
    
      cy.get('#mode').select('both', { force: true});
      cy.get('#winter_standard_airflow').clear().type('5000');
      cy.get('#summer_standard_airflow').clear().type('5000');

      cy.get('#submit').click({ force: true });
      cy.wait(1000);

      cy.checkBasic();
    })
  })