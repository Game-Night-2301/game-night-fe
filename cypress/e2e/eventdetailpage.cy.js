describe('Event Detail Page', () => {
beforeEach(() => {
  cy.fixture('getUserById.json').then((getUser) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUser });
      }
    }).as('getUser');
  });

  cy.fixture('allEvents.json').then((getAllEvents) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getAllEvents') {
        req.reply({ data: getAllEvents });
      }
    }).as('getAllEvents');
  });

  cy.fixture('fullQuery.json').then((fullQuery) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'fullQuery') {
        req.reply({ data: fullQuery });
      }
    }).as('fullQuery');
  });

  cy.fixture('getUserGames.json').then((getUserGames) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUserGames });
      }
    }).as('getUserGames');
  });

  cy.fixture('event.json').then((getEvent) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getEvent') {
        req.reply({ data: getEvent });
      }
    }).as('getEvent');
  });

  cy.visit('https://game-night-fe.vercel.app/');
  cy.get('.welcome-button-container').find('button').contains('User 1').click();
  cy.get('.browse-event-container').should('be.visible');
  cy.get('.card').first().click();
});

it('should display the event page with the correct elements', () => {
  cy.wait('@getEvent').then(() => {
    cy.url().should('include', '/events/7');
  });
});
});