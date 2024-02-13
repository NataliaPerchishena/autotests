context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('zernUrl');
     
      cy.visit(Url+'/heat_exchanger/counterflow')
  })
  
  it('calculate_button', () => {
    cy.get('#model').select('HC-EX6 533', { force: true});
    cy.get('#mode').select('both', { force: true});
    cy.get('#winter_standard_airflow').clear().type('260');
    cy.get('#winter_temperature_in_supply').clear().type('8');
    cy.get('#winter_temperature_in_extract').clear().type('22');
    cy.get('#winter_relative_humidity_in_supply').clear().type('70');
    cy.get('#winter_relative_humidity_in_extract').clear().type('30');
    cy.get('#summer_standard_airflow').clear().type('270');
    cy.get('#summer_temperature_in_supply').clear().type('30');
    cy.get('#summer_temperature_in_extract').clear().type('25');
    cy.get('#summer_relative_humidity_in_supply').clear().type('42');
    cy.get('#summer_relative_humidity_in_extract').clear().type('42');

    cy.get('#submit').click({ force: true });
    cy.wait(1000);

    
    cy.get('#heat_exchanger_title').should('include.text', 'ZERN HC-EX6 533');
    cy.get('[data-cy=title]').should('include.text', 'HC-EX6 533');
    cy.get('#calculation_winter_supply_standard_airflow').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 260);
    cy.get('#calculation_winter_extract_standard_airflow').should('be.visible').invoke('text')
    // tip: use an assertion to print the extracted text
    .should('be.a', 'string')
    // convert text to integer
    .then(parseInt)
    // tip: make sure the conversion is successful
    .should('be.a', 'number')
    // compare the converted number to the expected value
    .and('equal', 260);
    cy.get('#calculation_winter_supply_input_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 8);
    cy.get('#calculation_winter_extract_input_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 22);
    cy.get('#calculation_winter_supply_input_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 70);
    cy.get('#calculation_winter_extract_input_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 30);
    cy.get('#calculation_winter_supply_output_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 20.12);
    cy.get('#calculation_winter_extract_output_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 9.88);
    cy.get('#calculation_winter_supply_output_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',31.32);
    cy.get('#calculation_winter_extract_output_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',64.93);
    cy.get('#calculation_winter_supply_face_air_velocity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',1);
    cy.get('#calculation_winter_extract_face_air_velocity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',1.05);
    cy.get('#calculation_winter_supply_air_pressure_drop').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',72.42);
    cy.get('#calculation_winter_extract_air_pressure_drop').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',77.15);
    cy.get('#calculation_winter_supply_temperature_efficiency_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',86.58);
    cy.get('#calculation_winter_extract_temperature_efficiency_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',86.58);
    cy.get('#calculation_winter_supply_heat_recovery_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',1.06);
    cy.get('#calculation_winter_extract_heat_recovery_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',-1.06);
    cy.get('#calculation_winter_extract_condensation_extract').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal',0);
 

        
    cy.get('#calculation_summer_supply_standard_airflow').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 270);
    cy.get('#calculation_summer_extract_standard_airflow').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 270);
    cy.get('#calculation_summer_supply_input_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 30);
    cy.get('#calculation_summer_extract_input_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 25);
    cy.get('#calculation_summer_supply_input_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 42);
    cy.get('#calculation_summer_extract_input_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal',42);
    cy.get('#calculation_summer_supply_output_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 25.69);
    cy.get('#calculation_summer_extract_output_temperature').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 29.31);
    cy.get('#calculation_summer_supply_output_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 53.17);
    cy.get('#calculation_summer_extract_output_relative_humidity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 31.73);
    cy.get('#calculation_summer_supply_face_air_velocity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.12);
    cy.get('#calculation_summer_extract_face_air_velocity').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.11);
    cy.get('#calculation_summer_supply_air_pressure_drop').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 83.98);
    cy.get('#calculation_summer_extract_air_pressure_drop').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 82.16);
    cy.get('#calculation_summer_supply_temperature_efficiency_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 86.17);
    cy.get('#calculation_summer_extract_temperature_efficiency_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 86.17);
    cy.get('#calculation_summer_supply_heat_recovery_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', -0.35);
    cy.get('#calculation_summer_extract_heat_recovery_dry').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 0.35);
    cy.get('#calculation_summer_extract_condensation_extract').should('be.visible').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 0);
   // cy.get('#calculation_summer_supply_input_temperature_extract').should('have.text', '25');
   // cy.get('#calculation_summer_extract_input_temperature_extract').should('have.text', '30');
   // cy.get('#ccalculation_summer_supply_input_relative_humidity_extract').should('have.text', '42');
   // cy.get('#calculation_summer_extract_input_relative_humidity_extract').should('have.text', '42');

   cy.get('#button_wide').click()
   cy.get('#calculation_winter_supply_input_airflow').should('be.visible').invoke('text').should('be.a', 'string').
   then(parseFloat).should('be.a', 'number').and('equal', 249.34);
   cy.get('#calculation_winter_extract_input_airflow').should('be.visible').invoke('text').should('be.a', 'string').
   then(parseFloat).should('be.a', 'number').and('equal', 261.76);
   
   cy.get('#calculation_summer_supply_input_airflow').should('be.visible').invoke('text').should('be.a', 'string').
   then(parseFloat).should('be.a', 'number').and('equal', 279.2);
   cy.get('#calculation_summer_extract_input_airflow').should('be.visible').invoke('text').should('be.a', 'string').
   then(parseFloat).should('be.a', 'number').and('equal', 274.59);
   
   

    cy.checkBasic();
  })
})
