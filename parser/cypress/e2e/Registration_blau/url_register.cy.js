context('Vents', () => {
   before( () => {
   Cypress.session.clearAllSavedSessions();
     let Url = Cypress.env('baseUrl');
    // cy.login(Url);
     cy.visit(Url+'/register')
   })



  it('Auth', () => {
    cy.get('#form-register').should('be.visible');
    cy.get('#form-register').find('h5').should('include.text', 'Registration');
   cy.get('input[name=name]').first().type('User').should('have.value','User');
   cy.get('input[name=surname]').first().type('Test1').should('have.value','Test1');
    cy.get('#country_id').select('804', { force: true });
    cy.get('#city').type('City-test').should('have.value','City-test');
    cy.get('#phone-validation').type('+380123456789').should('have.value','+380123456789');
    cy.get('input[name=email]').first().type('UserTest1@gmail.com').should('have.value','UserTest1@gmail.com');
    cy.get('input[name=password]').first().type('123456').should('have.value','123456');
    cy.get('input[name=password_confirmation]').first().type('123456').should('have.value','123456');

    cy.get('#register-button').should('be.visible').click();

    cy.get('#jGrowl').should('be.visible');
   cy.wait(1000)
  
    cy.get('#navbar-right').should('include.text', ' Dashboard')
    cy.get('li.dropdown-user').click();
  })

})
