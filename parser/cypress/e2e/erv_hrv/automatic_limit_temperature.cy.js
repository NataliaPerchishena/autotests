context('Blauberg', () => {
  before(() => {
    // Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    //Cypress.session.clearAllSavedSessions();
    let Url = Cypress.env('baubUrl');

    cy.login(Url);
    cy.visit(Url + '/erv_hrv');

  })

  it('temperature_air_main', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_el = ['#summer_temperature_supply', '#summer_temperature_extract', '#winter_temperature_supply', '#winter_temperature_extract']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.get('#supply_heater').select('no', { force: true })
    cy.wrap(id_el).each(($el) => {
          cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
      })
      cy.wrap(id_el).each(($el) => {
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          if($el === '#summer_temperature_supply'|| $el === '#summer_temperature_extract') {
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in')
            .and('contain.text', 'Temperature SUMMER');
          } else {
            cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in')
            .and('contain.text', 'Temperature WINTER');
          }
        })  
        cy.get($el).clear().type('10');    
    })
  })

  it('temperature_air_heater_electric', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_heater_electric_temperature_before', '#supply_heater_electric_temperature_after']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_heater').select('electric', { force: true })
        cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before main heater');
        })
      }
      else {
        cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after heater');
        })
      }
    })
  })

  it('temperature_air_heater_water', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_w = ['#supply_heater_water_temperature_before', '#supply_heater_water_temperature_after']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_heater_water_temperature_before') {
        cy.get('#supply_heater').select('water', { force: true })
        cy.get('select[id=supply_heater_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        })
      }
      else {
        cy.get('select[id=supply_heater_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after heater');
        })
      }
    })
  })
   
  it('temperature_heater_water', () => {
    cy.get('#select2-supply_heater-container').click()

    const true_temp = [
      { int: '44.6', out: '35.6' },
      { int: '266', out: '257' }]

    const false_temp = [
      { int: '43.9', out: '35.6' },
      { int: '226', out: '257.1' },
      { int: '44', out: '35.5' },
      { int: '266.1', out: '257' }]

    const in_out_limit_temp = [
      { int: '44.5', out: '35.6' },
      { int: '265', out: '257' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist').
      and('contain.text', 'temperature must be in');

    })

    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist').
      and('contain.text', 'Out of limit');;
    })
  })

 it('temperature_air_pre_heater_electric', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_pre_heater_electric_temperature_after_nrvu_bvu_pre_heater']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
   //   if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_pre_heater').select('electric', { force: true })
   //     cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        // cy.wrap(temp_true).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
        //   cy.intercept('calculate').as('postcalc');
        //   cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
        //   cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        // })
        // cy.wrap(temp_false).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
        //   cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
        //     and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        // })
   //   }
     // else {
        // cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_pre_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after pre-heater');
        })
   //   }
    })
  })

  it('temperature_air_pre_heater_water', () => {
         // граничні значення дозволені
         const temp_true = ['-76', '140']
         //крок за межі граничних значень
         const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_pre_heater_water_temperature_after_nrvu_bvu_pre_heater']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
   //   if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_pre_heater').select('water', { force: true })
   //     cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        // cy.wrap(temp_true).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
        //   cy.intercept('calculate').as('postcalc');
        //   cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
        //   cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        // })
        // cy.wrap(temp_false).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
        //   cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
        //     and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        // })
   //   }
     // else {
        // cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_pre_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after pre-heater');
        })
   //   }
    })
  })

  it('temperature_pre_heater_water', () => {
   cy.get('#select2-supply_pre_heater-container').click()
      const true_temp = [
      { int: '44.6', out: '35.6' },
      { int: '266', out: '257' }]

    const false_temp = [
      { int: '43.9', out: '35.6' },
      { int: '226', out: '257.1' },
      { int: '44', out: '35.5' },
      { int: '266.1', out: '257' }]

    const in_out_limit_temp = [
      { int: '44.5', out: '35.6' },
      { int: '265', out: '257' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      cy.checkTitle();
    })

    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist').
      and('contain.text', 'temperature must be in');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist').
      and('contain.text', 'Out of limit');
    })

  })

  it('temperature_air_post_heater_electric', () => {
    cy.get('#supply_post_heater').check({ force: true })
    cy.get('select[id="supply_post_heater_on_type"]').select('electric', { force: true })

        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_post_heater_on_temperature_before', '#supply_post_heater_on_temperature_after']

    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_post_heater_on_temperature_before') {
      
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before post-heater');
        })
      }
      else {
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after post-heater');
        })
      }
    })
  })

  it('temperature_air_post_heater_water', () => {
    cy.get('#supply_post_heater').check({ force: true })
    cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })

        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_post_heater_on_temperature_before', '#supply_post_heater_on_temperature_after']

    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_post_heater_on_temperature_before') {
      
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before post-heater');
        })
      }
      else {
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after post-heater');
        })
      }
    })
  })

  it('temperature_post_heater_water', () => {
    cy.get('#supply_post_heater').check({ force: true })

  const true_temp = [
    { int: '44.6', out: '35.6' },
    { int: '266', out: '257' }]

  const false_temp = [
    { int: '43.9', out: '35.6' },
    { int: '226', out: '257.1' },
    { int: '44', out: '35.5' },
    { int: '266.1', out: '257' }]

  const in_out_limit_temp = [
    { int: '44.5', out: '35.6' },
    { int: '265', out: '257' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist').
      and('contain.text', 'temperature must be in');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist').
      and('contain.text', 'Out of limit');
    })

  })

  it('temperature_air_cooler_water', () => {
    // граничні значення дозволені
    const temp_true = ['-76', '140']
 // граничні значення дозволені з урахуванням різниці в 5 С між нижнім граничним значенням supply_cooler_water_temperature_in 
    const temp_true_after = ['45', '140']
    //крок за межі граничних значень
    const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_cooler_water = ['#supply_cooler_water_temperature_before', '#supply_cooler_water_temperature_after']

    cy.get('#supply_heater').select('no', { force: true })
    cy.get('#supply_cooler').select('water', { force: true })
    cy.wrap(id_cooler_water).each(($el) => {
      if ($el === '#supply_cooler_water_temperature_before') {        
        cy.get('select[id=supply_cooler_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before water cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.get('#supply_cooler_water_temperature_in').clear().type('35.6');
        cy.wrap(temp_true_after).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooling');
        })
      }
    })  
  })

  it('temperature_cooler_water', () => {
//граничні значення дозволені
    const true_temp = [
      { int: '35.6', out: '39.2' },
      { int: '59', out: '77' }]
//крок за межі граничних значень
    const false_temp = [
      { int: '35.5', out: '39.1' },
      { int: '59', out: '77.1' },
      { int: '35.5', out: '39.2' },
      { int: '59.1', out: '77' }]
// різниця в 2 С
    const in_out_limit_temp = [
      { int: '59', out: '62.5' },
      { int: '39.2', out: '39.2' },
      { int: '39.2', out: '42.5' }]
//різниця в 5 С
      const in_after_limit_temp = [
        { int: '59', out: '67.9' },
        { int: '35.6', out: '44.5' }]

      // правильні температури перевірка граничних значень
    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    //перевірка блокування кнопки та виводу повідомлень при виході за межі граничних значень
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    //перевірка умови temperature_in менше від temperature_out мінімум на 2 С
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })
    // перевірка умови temperature_in менше від water_temperature_after мінімум на 2 С
    cy.wrap(in_after_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#supply_cooler_water_temperature_after').clear().type($el.out);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })
    //значення за замовчуванням
    cy.get('#supply_cooler_water_temperature_out').clear().type('55');
    cy.get('#supply_cooler_water_temperature_in').clear().type('45');
    cy.get('#supply_cooler_water_temperature_after').clear().type('70');
    cy.get('#block_supply_cooler').click({ force: true })
    cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
    cy.intercept('calculate').as('postcalc');
    cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
    cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
  })

  it('temperature_air_cooler_water_for_heating', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_w = ['#supply_cooler_for_heating_water_temperature_before', '#supply_cooler_for_heating_water_temperature_after']

    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_cooler_for_heating_water_temperature_before') {
        cy.get('select[id=supply_cooler_for_heating_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_for_heating_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooler');
        })
      }
    })
  })

  it('temperature_cooler_water_for_heating', () => {
    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })

    const true_temp = [
      { int: '44.6', out: '35.6' },
      { int: '266', out: '257' }]
  
    const false_temp = [
      { int: '43.9', out: '35.6' },
      { int: '226', out: '257.1' },
      { int: '44', out: '35.5' },
      { int: '266.1', out: '257' }]
  
    const in_out_limit_temp = [
      { int: '44.5', out: '35.6' },
      { int: '265', out: '257' }]
  
    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist').
      and('contain.text', 'temperature must be in');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist').
      and('contain.text', 'Out of limit');
    })

  })

   it('temperature_air_cooler_freon', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_el = ['#supply_cooler_freon_temperature_before', '#supply_cooler_freon_temperature_after']

    cy.get('#supply_heater').select('no', { force: true })
    cy.get('#supply_cooler').select('freon', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_cooler_freon_temperature_before') {        
        cy.get('select[id=supply_cooler_freon_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before DX cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_freon_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after DX cooler');
        })
      }
    })  
  })

  it('temperature_cooler_freon', () => {

    const true_temp = [
      { evaporation: '14', condensation: '59', superheat: '35.6', subcool: '35.6' },
      { evaporation: '59', condensation: '140', superheat: '122', subcool: '122' }]

    const false_temp = [
      { evaporation: '13.9', condensation: '59', superheat: '35.6', subcool: '35.6' },
      { evaporation: '14', condensation: '58.9', superheat: '35.6', subcool: '35.6' },
      { evaporation: '14', condensation: '59', superheat: '35.5', subcool: '35.6' },
      { evaporation: '14', condensation: '59', superheat: '35.6', subcool: '35.5' },
      { evaporation: '59.1', condensation: '140', superheat: '122', subcool: '122' },
      { evaporation: '59', condensation: '140.1', superheat: '122', subcool: '122' },
      { evaporation: '59', condensation: '140', superheat: '122.1', subcool: '122' },
      { evaporation: '59', condensation: '140', superheat: '122', subcool: '122.1' }]

    const in_out_limit_temp = [
      { evaporation: '59', condensation: '59', superheat: '35.6', subcool: '35.6' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

 it('temperature_air_cooler_freon_for_heating', () => {
        // граничні значення дозволені
        const temp_true = ['-76', '140']
      //крок за межі граничних значень
      const temp_false = ['-76.1', '-77', '140.1', '141']

    const id_heater_w = ['#supply_cooler_for_heating_freon_temperature_before', '#supply_cooler_for_heating_freon_temperature_after']

    cy.get('#supply_cooler').select('freon', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_cooler_for_heating_freon_temperature_before') {
        cy.get('select[id=supply_cooler_for_heating_freon_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_for_heating_freon_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooler');
        })
      }
    })
  })

  it('temperature_cooler_freon_for_heating', () => {
    cy.get('#supply_cooler').select('freon', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })

  const true_temp = [
    { evaporation: '14', condensation: '59', superheat: '35.6', subcool: '35.6' },
    { evaporation: '59', condensation: '140', superheat: '122', subcool: '122' }]

  const false_temp = [
    { evaporation: '13.9', condensation: '59', superheat: '35.6', subcool: '35.6' },
    { evaporation: '14', condensation: '58.9', superheat: '35.6', subcool: '35.6' },
    { evaporation: '14', condensation: '59', superheat: '35.5', subcool: '35.6' },
    { evaporation: '14', condensation: '59', superheat: '35.6', subcool: '35.5' },
    { evaporation: '59.1', condensation: '140', superheat: '122', subcool: '122' },
    { evaporation: '59', condensation: '140.1', superheat: '122', subcool: '122' },
    { evaporation: '59', condensation: '140', superheat: '122.1', subcool: '122' },
    { evaporation: '59', condensation: '140', superheat: '122', subcool: '122.1' }]

  const in_out_limit_temp = [
    { evaporation: '59', condensation: '59', superheat: '35.6', subcool: '35.6' }]

    cy.wrap(true_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

  // const pages=[]

  // pages.forEach((page)=>{
  //   cy.visit(page);
  //   ///
  // })




})