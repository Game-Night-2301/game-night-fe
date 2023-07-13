beforeEach(() => {
  cy.fixture('getUserById.json').then((getUser) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUser });
      }
    }).as('getUser');
  });

  cy.fixture('AllEvents.json').then((getAllEvents) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getAllEvents });
      }
    }).as('getAllEvents');
  });

  cy.fixture('getUserGames.json').then((getUserGames) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUserGames });
      }
    }).as('getUserGames');
  });
  cy.visit('https://game-night-fe.vercel.app/');
});


it('should display the welcome page with the correct elements', () => {
  cy.get('.welcome-page-container')
    .should('be.visible')
    .within(() => {
      cy.get('.welcome-page-title').should('contain', 'Game Night');
      cy.get('.dice').should('be.visible');
      cy.get('.welcome-page-subtitle').should('contain', 'Define your roll');
      cy.get('.welcome-button-container')
        .should('be.visible')
        .within(() => {
          cy.get('button').contains('User 1').should('be.visible');
          cy.get('button').contains('User 2').should('be.visible');
        });
    });
});

// it('should display the browse page with the dropdown menu', () => {
//   cy.get('.welcome-button-container').find('button').contains('User 1').click();
//   cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
//   cy.get('.browse-event-container').should('be.visible');
//   cy.get('.profile-link').click();
//   cy.get('.dropdown-menu').should('be.visible');
//   cy.get('.dropdown-menu').within(() => {
//     cy.contains('Create Event').should('be.visible');
//     cy.contains('Profile').should('be.visible');
//     cy.contains('Logout').should('be.visible');
//   });
//   cy.contains('Logout').click({ force: true });
//   cy.get('.welcome-page-container').should('be.visible');
// });

// it('should display the browse page with the dropdown menu', () => {
//   cy.get('.welcome-button-container').find('button').contains('User 1').click();
//   cy.get('.browse-event-container').should('be.visible');
//   cy.get('.profile-link').click();
//   cy.get('.dropdown-menu').should('be.visible');
//   cy.get('.dropdown-menu').within(() => {
//     cy.contains('Create Event').should('be.visible');
//     cy.contains('Profile').should('be.visible');
//     cy.contains('Logout').should('be.visible');
//   });
//   cy.contains('Logout').click({ force: true });
//   cy.get('.welcome-page-container').should('be.visible');
// });

