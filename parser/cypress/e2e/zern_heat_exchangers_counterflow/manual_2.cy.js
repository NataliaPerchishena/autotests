context('Blauberg', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('zernUrl')+'/heat_exchanger/counterflow/enthalpy')
  })
  
  it('calculate_button', () => {
    cy.get('#model').select('EC-EX6 230', { force: true});
    cy.get('#mode').select('both', { force: true});
    cy.get('#winter_standard_airflow').clear().type('250');
    cy.get('#winter_temperature_in_supply').clear().type('7');
    cy.get('#winter_temperature_in_extract').clear().type('20');
    cy.get('#winter_relative_humidity_in_supply').clear().type('75');
    cy.get('#winter_relative_humidity_in_extract').clear().type('37');
    cy.get('#summer_standard_airflow').clear().type('250');
    cy.get('#summer_temperature_in_supply').clear().type('35');
    cy.get('#summer_temperature_in_extract').clear().type('27');
    cy.get('#summer_relative_humidity_in_supply').clear().type('40');
    cy.get('#summer_relative_humidity_in_extract').clear().type('47');

    cy.get('#submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_winter_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_h_input_temperature').should('have.text', '7');
    cy.get('#calculation_winter_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_winter_h_input_relative_humidity').should('have.text', '75');
    cy.get('#calculation_winter_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_winter_h_output_temperature').should('have.text', '14.59');
    cy.get('#calculation_winter_h_output_relative_humidity').should('have.text', '46.53');
    cy.get('#calculation_winter_h_face_air_velocity').should('have.text', '2.4');
    cy.get('#calculation_winter_h_condensation').should('have.text', '0');
    cy.get('#calculation_winter_h_temperature_efficiency').should('have.text', '58.36');
    cy.get('#calculation_winter_h_humidity_efficiency').should('have.text', '25.13');
    cy.get('#calculation_winter_h_air_pressure_drop').should('have.text', '275.27');    
    cy.get('#calculation_winter_h_heat_recovery').should('have.text', '0.68');

    cy.get('#calculation_summer_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_c_output_temperature').should('have.text', '31.31');
    cy.get('#calculation_summer_c_output_relative_humidity').should('have.text', '45.26');
    cy.get('#calculation_summer_c_face_air_velocity').should('have.text', '2.64');
    cy.get('#calculation_summer_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_c_temperature_efficiency').should('have.text', '46.18');
    cy.get('#calculation_summer_c_humidity_efficiency').should('have.text', '22.38');
    cy.get('#calculation_summer_c_air_pressure_drop').should('have.text', '324.81');
    cy.get('#calculation_summer_c_heat_recovery').should('have.text', '-0.5');
    
    cy.checkBasic();
  })
})