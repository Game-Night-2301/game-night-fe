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

  cy.fixture('getUserGames.json').then((getUserGames) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUserGames });
      }
    }).as('getUserGames');
  });
  cy.visit('https://game-night-fe.vercel.app/');
});

it('should display the event page with the correct elements', () => {
  cy.get('.welcome-button-container').find('button').contains('User 1').click();
  cy.get('.browse-event-container')
      .should('be.visible')
      .get('.card')
      .first()
      .click()
      .then(() => {
        cy.url().should('include', '/events/');
      });
  });
});
