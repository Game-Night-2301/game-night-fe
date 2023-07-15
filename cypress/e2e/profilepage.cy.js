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

    cy.visit('https://game-night-fe.vercel.app/');
  });

  it('should navigate to profile page', () => {
    cy.get('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('img.profile-link').click();
    cy.get('.MuiList-root');
    cy.get('.menu-link').contains('Profile').should('be.visible').click();
    cy.url().should('include', '/profile');
  });

  it('should check the content of the profile page', () => {
    cy.get('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('img.profile-link').click();
    cy.get('.MuiList-root');
    cy.get('.menu-link').contains('Profile').should('be.visible').click();
    cy.url().should('include', '/profile');
    cy.get('h5').contains('Personal Info').should('exist');
    cy.get('.profile-text').within(() => {
      cy.contains('.profile-text-key', 'Name').next('.profile-text-value').should('have.text', 'Galdor of the Havens');
      cy.contains('.profile-text-key', 'Games Owned').next('.profile-text-value').should('have.text', '5');
      cy.contains('.profile-text-key', 'Location').next('.profile-text-value').should('have.text', 'Montpelier, Vermont');
    });
    cy.get('h5').contains('Game Collection').should('exist');
    cy.get('.games-grid').within(() => {
      cy.get('.user-game').should('have.length', 5);
      cy.contains('.user-game', 'Welcome to...');
      cy.contains('.user-game', 'Clank! A Deck-Building Adventure');
      cy.contains('.user-game', 'Forbidden Island');
      cy.contains('.user-game', 'Orléans');
      cy.contains('.user-game', 'Five Tribes');
    });
  });
});
