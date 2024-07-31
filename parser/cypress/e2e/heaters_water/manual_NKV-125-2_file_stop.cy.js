context('Blauberg', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    let Url = Cypress.env('baseUrl');
    cy.visit(Url + '/heater_water');
  });

  it('calculate_button', () => {
    cy.fixture('heater_water_NKV-125-2.json').then((elements) => {
      cy.contains('Manual selection').should('not.be.disabled').click({ force: true });
  
      cy.fillForm(elements)
  
      cy.get('#manual_calculate-submit').click({ force: true }).then(() => {
        //cy.wait(1000);
  
        cy.checkReportErrorFail(elements)
      });
      cy.checkBasic();
    });
  });
  });