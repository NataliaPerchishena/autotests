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
  
              // Cypress.log({
              //   name: 'Value check',
              //   message: `Checking value of #calculation_${elementId}. Expected: ${expectedValue}. Actual: ${value}`,
              //   consoleProps: () => {
              //     return {
              //       'Element ID': elementId,
              //       'Expected value': expectedValue,
              //       'Actual value': value
              //     }
              //   }
              // });
  
              if (isNaN(value)) {
                Cypress.log({
                  name: 'Error',
                  message: `Element not found or value is not a number in #calculation_${elementId}`,
                  consoleProps: () => {
                    return {
                      'Element ID': elementId
                    }
                  }
                });
              } else if (value !== expectedValue) {
                Cypress.log({
                  name: 'Error',
                  message: `Value of #calculation_${elementId} (${value}) does not match the expected value (${expectedValue}).`,
                  consoleProps: () => {
                    return {
                      'Element ID': elementId,
                      'Expected value': expectedValue,
                      'Actual value': value
                    }
                  }
                });
              }
            });
          }
        });
      });
    });
  });
  })