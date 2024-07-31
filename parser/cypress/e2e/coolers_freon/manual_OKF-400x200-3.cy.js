context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
     // cy.login(Url);
      cy.visit(Url+'/cooler_freon')
  })


      it('manual_cooler_freon_OKF 400x200-3', () => {
        cy.fixture('cooler_freon_OKF-400x200-3.json').then((elements) => {
          cy.contains('Manual selection').should('not.be.disabled').click({ force: true });

          // cy.get('#seasons').select(elements.seasons, { force: true });
      
          // // Заповнюємо поля даними з файлу, які не містять 'calculation' в назві, не є модель, не є mode
          // Object.keys(elements).forEach((elementId) => {
          //   if (!elementId.includes('calculation') && elementId !== 'model'  && elementId !== 'seasons') {
          //     cy.get(`#${elementId}`).clear().type(elements[elementId]);
          //   }
          // });
      
          // cy.get('#model').select(elements.model, { force: true });
      
          cy.fillForm(elements)
          
          cy.get('#manual_calculate-submit').click({ force: true }).then(() => {
            cy.wait(1000);

            cy.url().then(($url) => {
              if ($url.includes('blauberg')) {
                cy.get('.product-title').contains('KFK 40x20-3'); 
             } 
              else
             {
              cy.get('.product-title').should('include.text', 'OKF 400x200-3');
                }
              })

            // // Перевіряємо значення елементів, які містять 'calculation' в назві
            // Object.keys(elements).forEach((elementId) => {
            //   if (elementId.includes('calculation')) {
            //     cy.get(`#${elementId}`).invoke('text').then(($text) => {
            //       const value = parseFloat($text);
            //       const expectedValue = parseFloat(elements[elementId]);
      
            //       if (isNaN(value)) {
            //         throw new Error(`Element not found or value is not a number in #${elementId}`);
            //       } else if (value !== expectedValue) {
            //         throw new Error(`Value of #${elementId} (${value}) does not match the expected value (${expectedValue}).`);
            //       }
            //     });
            //   }
            // });

            cy.checkReportErrorFail(elements)
          });
          cy.checkBasic();
        });
      });
      });