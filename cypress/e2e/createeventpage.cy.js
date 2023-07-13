describe('Create Event Page', () => {
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

  it('should display the create event page', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.browse-event-container').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Create Event').should('be.visible');
    cy.contains('Create Event').click({ force: true })
    .then(() => {
      cy.url().should('include', '/create');
  });
});
});