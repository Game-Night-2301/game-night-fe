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
    cy.get('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('img.profile-link').click();
    cy.get('.MuiList-root');
    cy.get('.menu-link').contains('Recommendations').should('be.visible').click();
    cy.url().should('include', '/recommendations');
  });

  it('should display three panels for requesting, processing, and results', () => {
    cy.get('.ai-recs-panel').should('have.length', 3);
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .ai-recs-body > .ai-body-text > .ai-recs-header').contains('Request Your Recommendations');
      cy.get('.ai-recs-text').contains('We\'ll use your existing game collection to build a personalized recommendations list informed by what you\'re already drawn to in games and what we think you might enjoy.');
      cy.get('.ai-submit').contains('Go');
    });
  });

  it('should allow the user to submit a request for recommendations', () => {
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-submit').click();
    });
    cy.wait('@getUserRecommendations').its('response.body').should('have.property', 'data');
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-recs-header').contains('Request');
    });
  });

  it('should open the loading panel while the request is being processed', () => {
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-submit').click();
    });
    cy.wait('@getUserRecommendations').its('response.body').should('have.property', 'data');
    cy.get('.process-panel').within(() => {
      cy.get('.ai-recs-header').contains('Processing');
    });
  });

  it('should display the results panel when the request is complete', () => {
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-submit').click();
    });
    cy.wait('@getUserRecommendations').its('response.body').should('have.property', 'data');
    cy.get('.results-panel').within(() => {
      cy.get('.ai-recs-header').contains('Results');
    });
  });


  it('should display a list of recommended games', () => {
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-submit').click();
    });
    cy.wait('@getUserRecommendations').its('response.body').should('have.property', 'data');
    cy.get('.games-grid').within(() => {
      cy.get('.card').should('have.length', 3);
      cy.get(':nth-child(1) > .card > .card-header > .event-card-title').contains('Shakespeare');
      cy.get(':nth-child(3) > .card > .card-header > .event-card-title').contains('Azul: Summer Pavilion');
    });
  })

  it('the recommend games cards should show additional information when show description is clicked', () => {
    cy.get('.recommend-me-panel').within(() => {
      cy.get('.ai-submit').click();
    });
    cy.wait('@getUserRecommendations').its('response.body').should('have.property', 'data');
    cy.get('.games-grid').within(() => {
      cy.get('.card').first().within(() => {
        cy.get('.MuiButtonBase-root').click();
        cy.get('.description-text').should('be.visible');
        cy.get('.description-text').contains('In Shakespeare, the play is the thing!');
      });
    });
  })
});