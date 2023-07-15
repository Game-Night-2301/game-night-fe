describe('Profile Page', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUser });
        }
      }).as('getUserById');
    });

    cy.fixture('getUserGames.json').then((getUserGames) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUserGames });
        }
      }).as('getUserGames');
    });

    cy.fixture('allEvents.json').then((getAllEvents) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getAllEvents') {
          req.reply({ data: getAllEvents });
        }
      }).as('getAllEvents');
    });

    cy.fixture('getUserRecommendations.json').then((getUserRecommendations) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUserRecommendations });
        }
      }).as('getUserRecommendations');
    });

    cy.visit('https://game-night-fe.vercel.app/');
  });

  it('should navigate to profile page', () => {
    cy.get('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('img.profile-link').click();
    cy.get('.MuiList-root');
    cy.get('.menu-link').contains('Recommendations').should('be.visible').click();
    cy.url().should('include', '/recommendations');
  });

  it.skip('should display three panels for requesting, processing, and results', () => {
    cy.get('.ai-recs-panel').should('have.length', 3);
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .ai-recs-body > .ai-body-text > .ai-recs-header').should('')
      cy.get('.ai-recs-text').contains('We\'ll use your existing game collection to build a personalized recommendations list informed by what you\'re already drawn to in games and what we think you might enjoy.');
      cy.get('.ai-submit').contains('Go');
    });
  });
});