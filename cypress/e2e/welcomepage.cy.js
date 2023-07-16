describe('Welcome Page', () => {
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

  it('should display the browse page with the dropdown menu for User 1', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.browse-event-container').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Logout').should('be.visible');
    cy.contains('Logout').click({ force: true });
    cy.get('.welcome-page-container').should('be.visible');
  });

  it('should display the browse page with the dropdown menu for User 2', () => {
    cy.get('.welcome-button-container').find('button').contains('User 2').click();
    cy.get('.browse-event-container').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Logout').should('be.visible');
    cy.contains('Logout').click({ force: true });
    cy.get('.welcome-page-container').should('be.visible');
  });
});

describe('Welcome Page - Error Handling', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.fixture('allEvents.json').then((getAllEvents) => {
        cy.fixture('fullQuery.json').then((fullQuery) => {
          cy.fixture('getUserGames.json').then((getUserGames) => {
            cy.fixture('event.json').then((getEvent) => {
              cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
                if (req.body.operationName === 'getUser') {
                  req.reply({ data: getUser });
                } else if (req.body.operationName === 'getAllEvents') {
                  req.reply({ data: getAllEvents });
                } else if (req.body.operationName === 'fullQuery') {
                  req.reply({ data: fullQuery });
                } else if (req.body.operationName === 'getUser') {
                  req.reply({ data: getUserGames });
                } else if (req.body.operationName === 'getEvent') {
                  req.reply({ data: getEvent });
                }
              }).as('GraphQL');
            });
          });
        });
      });
    });
  });

  it('should display the error page when an error occurs while retrieving event details', () => {
    cy.fixture('sadPath.json').then((sadPath) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getEvent') {
          req.reply({
            statusCode: 500,
            body: { errors: sadPath }
          });
        }
      }).as('sadPath');
    });

    cy.visit('https://game-night-fe.vercel.app');
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.browse-event-container').should('be.visible');

    cy.get('.card').first().click();
    cy.url().should('include', '/error');
    cy.get('.message').should(
      'have.text',
      'Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!'
    );
  });
});
