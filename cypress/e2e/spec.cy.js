/// <reference types="cypress" />

describe('Template Spec', () => {
  context('Testing Home/Welcome Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Wyświetlanie dynamiczne treści w zależności od akcji użytkownika', () => {
      const buttonTextToCommand = {
        'New Component': 'ng generate component xyz',
        'Angular Material': 'ng add @angular/material',
        'Add PWA Support': 'ng add @angular/pwa',
        'Add Dependency': 'ng add _____',
        'Run and Watch Tests': 'ng test',
        'Build for Production': 'ng build',
      };

      cy.get('div.terminal').as('terminal');

      for (const buttonText in buttonTextToCommand) {
        const command = buttonTextToCommand[buttonText];

        cy.contains(new RegExp(buttonText, 'i')).click();
        cy.get('@terminal').contains(command);
      }
    });

    it('Przeniesienie użytkownika do innych witryn po wybranych akcjach', () => {
      const testLink = (linkSelector) => {
        cy.get(linkSelector)
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener')
          .then(($link) => {
            cy.request($link.prop('href')).its('status').should('equal', 200);
          });
      };
      const testLinkByText = (content) => {
        cy.contains(content)
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener')
          .then(($link) => {
            cy.request($link.prop('href')).its('status').should('equal', 200);
          });
      };

      testLink('a[aria-label="Angular on twitter"]');
      testLink('a[aria-label="Angular on YouTube"]');

      testLink('.circle-link[title="Animations"]');
      testLink('.circle-link[title="CLI"]');
      testLink('.circle-link[title="Find a Local Meetup"]');
      testLink('.circle-link[title="Join the Conversation on Discord"]');

      testLinkByText(/Learn Angular/i);
      testLinkByText(/CLI Documentation/i);
      testLinkByText(/Angular Blog/i);
      testLinkByText(/Angular DevTools/i);
      testLinkByText(/Give our repo a star/i);
    });

    it('should navigate to the Form page', () => {
      cy.get('#form-view-link').click();
      cy.location('pathname').should('equal', '/form');
    });

    it('should navigate to the Stepper page', () => {
      cy.get('#stepper-view-link').click();
      cy.location('pathname').should('equal', '/stepper');
    });

    it('Podanie nieprawidłowej ścieżki url ma przekierowywać na stronę główną', () => {
      cy.visit('/random-non-existing-path');
      cy.location('pathname').should('not.equal', '/random-non-existing-path');
      cy.location('pathname').should('equal', '/');
    });
  });

  it('Pobieranie danych od użytkownika oraz ich wyświetlanie w podsumowaniu', () => {
    const randomName = 'Harry Potter';
    const randomAlterEgo = 'Something';
    const selectedPower = 'Really Smart';

    cy.visit('/form');

    cy.get('app-form > div > div').first().as('form').should('be.visible');
    cy.get('app-form > div > div.results').as('results').should('not.be.visible');

    // Test user data input and submission
    cy.get('@form').contains(/Submit/i).as('btn-submit');
    cy.get('@form').contains(/New Hero/i).as('btn-new-hero');

    cy.get('@form').find('input[name="name"]').as('input-name');
    cy.get('@form').find('input[name="alterEgo"]').as('input-alterEgo');
    cy.get('@form').find('select[name="power"]').as('input-power');

    cy.get('@input-name').clear().type(randomName);
    cy.get('@input-alterEgo').clear().type(randomAlterEgo);
    cy.get('@input-power').select(selectedPower);

    cy.get('@btn-submit').click();

    // Validate the displayed user data in the summary
    //results.contains(randomName);
    //results.contains(randomAlterEgo);
    //results.contains(selectedPower);

    cy.get('@form').should('not.be.visible');
    cy.get('@results').should('be.visible');
    

    cy.contains(/You submitted the following:/i);
    cy.get('@results').find('div').find('.row').as('rows').should('have.length', 3);
    cy.get('@results').find('button').contains(/Edit/i).as('btn-edit').should('not.be.disabled');

    cy.get('@rows').eq(0).as('row-name');
    cy.get('@rows').eq(1).as('row-alterEgo');
    cy.get('@rows').eq(2).as('row-power');

    cy.get('@row-name').find('div')
      .first().contains(/Name/i)
      .next().contains(randomName);
    
    cy.get('@row-alterEgo').find('div')
      .first().contains(/Alter Ego/i)
      .next().contains(randomAlterEgo);
    
    cy.get('@row-power').find('div')
      .first().contains(/Power/i)
      .next().contains(selectedPower);





    // Test the edit feature
    cy.get('@results').contains(/Edit/i).click();
    cy.location('pathname').should('equal', '/form');
    cy.get('@input-name').should('have.value', randomName);
    cy.get('@input-alterEgo').should('have.value', randomAlterEgo);
    cy.get('@input-power').should('have.value', selectedPower);
  });

  it('Przeprowadzenie użytkownika przez stepper w celu uzyskania określonych informacji', () => {
    const name = 'Jan Kowal';
    const address = 'Kraków, Beskidzka 123A';

    cy.visit('/stepper');

    cy.get('.mat-horizontal-content-container').find('[role="tabpanel"]').as('stepper-content-containers').should('have.length', 3);
    cy.get('@stepper-content-containers').eq(0).as('step-name').should('be.visible');
    cy.get('@stepper-content-containers').eq(1).as('step-address').should('not.be.visible');
    cy.get('@stepper-content-containers').eq(2).as('step-summary').should('not.be.visible');

    // Step 1: Name
    cy.get('@step-name').find('input#mat-input-0').type(name).should('have.attr', 'required');
    cy.get('@step-name').find('[matsteppernext]').click();

    // Step 2: Address
    cy.get('@step-address').find('input#mat-input-1').type(address).should('have.attr', 'required');
    cy.get('@step-address').find('[matsteppernext]').click();

    // Step 3: Done
    cy.contains(/You are now done!/i)
      .next().contains(name)
      .next().contains(address);
  });

  it('Walidacja długości wprowadzonych danych', () => {
    //cy.visit('/form');
    //
    //cy.get('app-form').as('form');
    //cy.get('@form').find('input[name="name"]').as('input-name');
    //cy.get('@form').contains(/Submit/i).as('btn-submit');
    //
    //cy.get('@btn-submit').should('be.enabled');
    //cy.get('@input-name').type(incrediblyLongString);
    //cy.get('@btn-submit').should('be.enabled');
    const stringAbove20Chars = '123456789012345678901';
    const stringBelow20Chars = '123456789012345678';
    const stringAbove30Chars = '1234567890123456789012345678901';

    cy.visit('/stepper');

    cy.get('.mat-horizontal-content-container').find('[role="tabpanel"]').as('stepper-content-containers').should('have.length', 3);
    cy.get('@stepper-content-containers').eq(0).as('step-name').should('be.visible');
    cy.get('@stepper-content-containers').eq(1).as('step-address').should('not.be.visible');

    cy.get('@step-name').find('input#mat-input-0').type(stringAbove20Chars);
    cy.get('@step-name').find('mat-form-field').next().as('step-name-error-msg').should('be.visible').contains(/The maximum length for this field is 20 characters./i);
    cy.get('@step-name').find('input#mat-input-0').clear().type(stringBelow20Chars);
    cy.get('@step-name').find('mat-form-field').should('not.contain.text', 'The maximum length for this field is 20 characters.');
    

    cy.get('@step-name').find('[matsteppernext]').click();
    
    
    cy.get('@step-address').find('input#mat-input-1').type(stringAbove30Chars);
    cy.get('@step-address').find('mat-form-field').next().as('step-address-error-msg').should('be.visible').contains(/The maximum length for this field is 30 characters./i);
    cy.get('@step-address').find('input#mat-input-1').type(stringBelow20Chars);
    cy.get('@step-address').find('mat-form-field').should('not.contain.text', 'The maximum length for this field is 30 characters.');
  });
});
