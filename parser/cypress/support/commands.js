// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('checkTitle', () => {
    cy.get('[data-cy=title]').should('be.visible')
})

Cypress.Commands.add('checkDescription', () => {
    cy.get('[data-cy=description]').should('be.visible')
})

Cypress.Commands.add('checkImage', () => {
    cy.get('[data-cy=image]').should('be.visible')
})

Cypress.Commands.add('checkSaveAs', () => {
    cy.get('[data-cy=save_as]').first().click().get('#modal-auth').should('be.visible')
})

Cypress.Commands.add('checkPdf', () => {
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true })
    cy.wait(1000)
    cy.get('embed').should('be.visible')
})
Cypress.Commands.add('checkPdf200', () => {
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true })
    cy.wait(1100)
    cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('checkBasic', () => {

    cy.checkTitle();
    // cy.checkDescription();
    cy.checkImage();
    cy.checkSaveAs();
    cy.checkPdf();
})

Cypress.Commands.add('login', (Url) => {
  // Cypress.session.clearAllSavedSessions();
  // Cypress.session.clearCurrentSessionData()
    cy.session('session2', () =>{      

    cy.visit(Url);
    cy.get('.modal-login-btn').click({force:true})
     cy.wait(1000)
    
    let testUser = Cypress.env('User');
   cy.get('#form-login').find('input[name=email]').type(testUser.email);
    cy.get('#form-login').find('input[name=password]').type(testUser.password);
    cy.get('#form-login').find('.btn-auth-modal').click({ force: true });
    cy.wait(5000)  
},
      { 
         cacheAcrossSpecs: true, 
      }
    )   
})

Cypress.Commands.add('checkSaveAsAfterAuth', () => {
    cy.get('[data-cy=save_as]').first().click().get('#save_project_modal').should('be.visible');
    cy.get('#save_project_form').children('.modal-footer').children('.btn-default').click({force: true})
})
Cypress.Commands.add('checkBasicAfterAuth', () => {

    cy.checkTitle();
    // cy.checkDescription();
    cy.checkImage();
    cy.checkSaveAsAfterAuth();
    cy.checkPdf();
})

Cypress.Commands.add('checkReportErrorLog', (elements) => {
    // Перевіряємо значення елементів, які містять 'calculation' в назві і є числом
    Object.keys(elements).forEach((elementId) => {
        if (!isNaN(elements[elementId]) && elementId.includes('calculation') && !elementId.includes('//')) {
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
          })
        }
        // Перевіряємо значення елементів, які містять 'calculation' в назві і НЕ є числом
        else if (elementId.includes('calculation') && isNaN(elements[elementId]) && !elementId.includes('//')) {
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
            } else if (!$text.includes(expectedValue)) {

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

})

Cypress.Commands.add('fillForm', (elements) => {
 // Заповнюємо поля даними з файлу, які не містять 'calculation', ''// в назві, і є числом
 Object.keys(elements).forEach((elementId) => {
    if (!elementId.includes('calculation') && !elementId.includes('//') && !isNaN(elements[elementId])) {
      cy.get(`${elementId}`).clear().type(elements[elementId]);
    }
    // Заповнюємо поля даними з файлу, які не містять 'calculation', '//' в назві і НЕ є числом
    else if (!elementId.includes('calculation') && !elementId.includes('//') && isNaN(elements[elementId])) {
      cy.get(`${elementId}`).select(elements[elementId], { force: true });
    }
  });
})


Cypress.Commands.add('checkReportErrorFail', (elements) => {
    // Перевіряємо значення елементів, які містять 'calculation' в назві і є числом
    Object.keys(elements).forEach((elementId) => {
        if (!isNaN(elements[elementId]) && elementId.includes('calculation') && !elementId.includes('//')) {
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
                throw new Error(`Element not found or value is not a number in ${elementId}`);
            } else if (value !== expectedValue) {
                throw new Error(`Value of ${elementId} (${value}) does not match the expected value (${expectedValue}).`);
            }
          });
        }
        else if (elementId.includes('calculation') && isNaN(elements[elementId]) && !elementId.includes('//')) {
            cy.get(`${elementId}`).invoke('text').then(($text) => {
              const value = ($text);
              const expectedValue = (elements[elementId]);

              if (!isNaN(value)) {
                throw new Error(`Element not found or value is a number in #${elementId}`);
            } else if (!$text.includes(expectedValue)) {
                throw new Error(`Value of ${elementId} (${value}) does not match the expected value (${expectedValue}).`);
            } else {
              Cypress.log({
                name: 'Value check',
                message: `Value of ${elementId} (${value}) matches the expected value (${expectedValue}).`,
                consoleProps: () => {
                    return {
                        'Element ID': elementId,
                        'Expected value': expectedValue,
                        'Actual value': value
                    }
                }
            });

            }

            })
        }
    })
})
