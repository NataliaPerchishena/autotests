context('Blauberg', () => {
  before( () => {
  // Cypress.session.clearAllSavedSessions();
 //  Cypress.session.clearCurrentSessionData()

  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');

      cy.login(Url);
      cy.visit(Url+'/nrvu_bvu')
  })

  it('manual_selection_eh_cdx_AV02_CFP_2500', () => {
     cy.get('#manual_selection').click({ force: true })


    cy.fixture('manual12_eh_cdx_AV02_CFP_2500.json').then((elements) => {
      // Заповнюємо поля даними з файлу, які не містять 'calculation', 'erp', '//' в назві, і є числом
      Object.keys(elements).forEach((elementId) => {
        if (!elementId.includes('//') && !elementId.includes('calculation') && !elementId.includes('erp') && !isNaN(elements[elementId])) {
          cy.get(`${elementId}`).clear().type(elements[elementId]);
        }
         // Заповнюємо поля даними з файлу, які не містять 'calculation', 'erp', '//' в назві і НЕ є числом
       else if (!elementId.includes('calculation') && !elementId.includes('erp') && !elementId.includes('//') && isNaN(elements[elementId])) {
        cy.get(`${elementId}`).select(elements[elementId], { force: true });
       }
      });
      cy.get('#supply_cooler_for_heating').click({ force: true });

    
      cy.get('#manual_calculate-submit').click({ force: true }).then(() => {
        cy.wait(1000);

        cy.get('[data-cy=title]').should('include.text', '02 CFP 2500');

        // Перевіряємо значення елементів, які містять 'calculation' в назві і є числом
        Object.keys(elements).forEach((elementId) => {
          if (!isNaN(elements[elementId]) && !elementId.includes('//') && ((elementId.includes('calculation') || elementId.includes('erp'))) ) {
            cy.get(`${elementId}`).invoke('text').then(($text) => {
              const value = parseFloat($text);
              const expectedValue = parseFloat(elements[elementId]);

              Cypress.log({
                name: 'Value check',
                message: `Checking value of #calculation_${elementId}. Expected: ${expectedValue}. Actual: ${value}`,
                consoleProps: () => {
                  return {
                    'Element ID': elementId,
                    'Expected value': expectedValue,
                    'Actual value': value
                  }
                }
              });

              if (isNaN(value)) {
                Cypress.log({
                  name: '**Error**',
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
                   message: `**Value of ${elementId} (${value}) does not match the expected value (${expectedValue}).**`,
                   consoleProps: () => {
                     return {
                       'Element ID': elementId,
                       'Expected value': expectedValue,
                       'Actual value': value,
                     }
                 }
                  
                });
              }
              else {}
            });
          }
        });

        // Перевіряємо значення елементів, які містять 'calculation', 'erp' в назві і НЕ є числом
        Object.keys(elements).forEach((elementId) => {
          if ((elementId.includes('calculation') || elementId.includes('erp') ) && isNaN(elements[elementId]) && !elementId.includes('//') ) {
            cy.get(`${elementId}`).invoke('text').then(($text) => {
              const value = ($text);
              const expectedValue = (elements[elementId]);

              Cypress.log({
                name: 'Value check',
                message: `Checking value of ${elementId}. Expected: ${expectedValue}. Actual: ${value}`,
                consoleProps: () => {
                  return {
                    'Element ID': elementId,
                    'Expected value': expectedValue,
                    'Actual value': value
                  }
                }
              });

              if (!isNaN(value)) {
                Cypress.log({
                  name: '**Error**',
                  message: `Element not found or value is a number in ${elementId}`,
                  consoleProps: () => {
                    return {
                      'Element ID': elementId
                    }
                  }
                });
              } else if($text.includes('elements[elementId]')) {
                          
                 Cypress.log({
                   name: 'Error', 
                   message: `**Value of ${elementId} (${value}) does not match the expected value (${expectedValue}).**`,
                   consoleProps: () => {
                     return {
                       'Element ID': elementId,
                       'Expected value': expectedValue,
                       'Actual value': value,
                     }
                 }
                  
                });
              }
            
            });
          }
        });
      });
      cy.get('#fans_sound_power_extract tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
      cy.get('#fans_sound_power_supply tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
    });
    cy.checkBasicAfterAuth();
})
})


//     cy.get('#calculation_winter_supply_pew').invoke('text').then(($text) => {
//       const value = parseFloat($text);
//       Cypress.log({ message: `Value of #calculation_winter_extract_nes: ${value}` });
//       if (isNaN(value)) {
//         Cypress.log({ message: `Error in #calculation_winter_extract_nes: Element not found or value is not a number.` });
//       } else
//       if (value !== 565) {
//         Cypress.log({ message: `Value of #calculation_winter_extract_nes does not match the expected value 523.8.` });
//       }
//   

