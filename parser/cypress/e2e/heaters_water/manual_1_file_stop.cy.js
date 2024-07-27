context('Blauberg', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    let Url = Cypress.env('baubUrl');
    cy.visit(Url + '/heater_water');
  });

  it('calculate_button', () => {
    cy.fixture('heater_water.json').then((elements) => {
      cy.contains('Manual selection').should('not.be.disabled').click({ force: true });
  
      // Заповнюємо поля даними з файлу, які не містять 'calculation' в назві
      Object.keys(elements).forEach((elementId) => {
        if (!elementId.includes('calculation') && elementId !== 'model') {
          cy.get(`#${elementId}`).clear().type(elements[elementId]);
        }
      });
  
      cy.get('#model').select(elements.model, { force: true });
  
      cy.get('#manual_calculate-submit').click({ force: true }).then(() => {
        cy.wait(1000);
  
        // Перевіряємо значення елементів, які містять 'calculation' в назві
        Object.keys(elements).forEach((elementId) => {
          if (elementId.includes('calculation')) {
            cy.get(`${elementId}`).invoke('text').then(($text) => {
              const value = parseFloat($text);
              const expectedValue = parseFloat(elements[elementId]);
  
              if (isNaN(value)) {
                throw new Error(`Element not found or value is not a number in #${elementId}`);
              } else if (value !== expectedValue) {
                throw new Error(`Value of #${elementId} (${value}) does not match the expected value (${expectedValue}).`);
              }
            });
          }
        });
      });
    });
  });
  });