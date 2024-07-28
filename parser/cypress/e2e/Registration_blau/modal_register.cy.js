context('Vents', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
     let Url = Cypress.env('baseUrl');
     // cy.login(Url);
      cy.visit(Url)

  })

   it('Auth', () => {
    cy.get('#navbar-right').children().eq(4).click()
   cy.get('#privacy_policy_modal').should('be.visible');
   cy.get('#privacy_policy_modal').find('h1').should('have.class', 'panel-title');
  cy.get('#privacy_policy_agree').click({ force: true });

   
    cy.get('#modal-auth').should('be.visible');
    cy.get('#modal-auth').find('li').eq(1).should('have.class', 'active').find('h6').should('have.text', 'Registration');

    cy.get('#register-tab').find('input[name=name]').type('User').should('have.value','User');
   cy.get('#register-tab').find('input[name=surname]').type('Test1').should('have.value','Test1');
    cy.get('#country_id').select('804', { force: true });
    cy.get('#city').type('City-test').should('have.value','City-test');
    cy.get('#phone-validation').type('+380123456789').should('have.value','+380123456789');
    cy.get('#register-tab').find('input[name=email]').type('UserTest1@gmail.com').should('have.value','UserTest1@gmail.com');
    cy.get('#register-tab').find('input[name=password]').type('123456').should('have.value','123456');
    cy.get('#register-tab').find('input[name=password_confirmation]').type('123456').should('have.value','123456');

    cy.get('#register-button').should('be.visible').click();

    cy.get('#jGrowl').should('be.visible');
   cy.wait(1000)
 // cy.get('#modal-auth button[data-dismiss=modal]').eq(1).should('include.text', 'Cancel').click()
    cy.get('#navbar-right').should('include.text', ' Dashboard')
    cy.get('li.dropdown-user').click();

  })

})
