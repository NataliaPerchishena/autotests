before(() => {
  let Url = Cypress.env('baubUrl');
  cy.login(Url);
    cy.visit(Url + '/pre_configured_heat_recovery_unit');
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000);
  
  })
  it('Intercept by Url', () => {
    cy.checkTitle();
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    
   /cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
      
   
    
    
  })
