context('Blauberg', () => {
    before( () => {
    //  Cypress.session.clearAllSavedSessions();
    })
      beforeEach(() => {
        let Url = Cypress.env('baubUrl');
        cy.login(Url);
        cy.visit(Url+'/nrvu_bvu')
    })
  
    it.only('getJsonDate', ()=>{
      cy.get('#manual_selection').click({ force: true })
      cy.get('#seasons').select('both', { force: true });
      cy.get('#model').select('AV02 RP 2500', { force: true });
      cy.get('#airflow_supply').clear().type('2000');
      cy.get('#airflow_extract').clear().type('2000');
      cy.get('#pressure_static_supply').clear().type('200');
      cy.get('#pressure_static_extract').clear().type('200');
      cy.get('#supply_heater').select('water', { force: true });
      cy.get('#supply_cooler').select('water', { force: true });
      cy.get('#supply_heater_water_temperature_after').clear().type('22');
      cy.get('#supply_heater_water_temperature_in').clear().type('80');
      cy.get('#supply_heater_water_temperature_out').clear().type('60');
  
      cy.get('#manual_calculate-submit').click({ force: true })
      cy.wait(1000);
  
      cy.get('[data-cy=title]').should('include.text', 'BL02 RP 2500-HW-CW-S31');
      var data = {};
       
      cy.get('#pdf_form > div:nth-child(3) > div > div.panel-body > div > div:nth-child(2) > div > table > tbody > tr').each(($row) => {     
            
            const $cells = $row.find('td');
            const key = $cells.eq(2).attr('id');
            cy.log(key)
            const value = $cells.eq(2).text();
            cy.log(value)
            
            // Формування об'єкта
            data[key] = parseFloat(value);
            cy.log(JSON.stringify(data))
            });
           
        // Вивід отриманих даних у форматі JSON
        //cy.log(JSON.stringify(data));
  
    })
})


// Cypress.Commands.add('getTableData', (tableSelector) => {
//   const data = {};

//   cy.get(tableSelector).find('tbody tr').each(($row) => {
//     const $cells = $row.find('td');
//     const key = $cells.eq(2).attr('id');
//     const value = $cells.eq(2).text();
// Формування об'єкта
//     data[key] = parseFloat(value);
//   });
//   return data;
// });
//cy.getTableData('.table.table-sm').then((jsonData) => {
//cy.writeFile('data.json', JSON.stringify(jsonData));
//})
//Збережіть цей JSON файл у папці cypress/fixtures вашого проекту.
// it('Перевірка JSON даних', () => {
//   cy.visit('ваша_сторінка_url');
//cy.fixture('data.json').as('jsonData');
// Ітеруємось через ключі та значення об'єкта JSON
//cy.get('@jsonData').then((jsonData) => {
//  cy.wrap(jsonData).each((value, key) => {
//  cy.get(`#${key}`).invoke('text').should('be.a', 'string')
//  .then(parseFloat).should('be.a', 'number').and('equal', parseFloat(value));
//});
//});
// });